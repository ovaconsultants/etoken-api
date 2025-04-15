const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//const { protect } = require("../middlewares/authMiddleware");

const generateToken = (doctor) => {
  return jwt.sign(
    {
      doctor_id: doctor.doctor_id,
      doctor_name: doctor.doctor_name,
      clinic_id: doctor.clinic_id,
      clinic_name: doctor.clinic_name,
    },
    process.env.JWT_SECRET, // Secret Key
    { expiresIn: "9999 years" } // Extremely long expiration (practically a lifetime token)
  );
};

const insertDoctor = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    specialization_id,
    mobile_number,
    phone_number = null,
    email,
    created_by,
    gender = null,
    date_of_birth = null,
    qualification = null,
    experience_years = null,
    consultation_fee = null,
    biography = null,
    address = null,
    registration_number = null,
    specialization = null
  } = req.body;

  // Validate required fields
  if (
    !first_name ||
    !last_name ||
    !specialization_id ||
    !mobile_number ||
    !email ||
    !created_by
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Missing required fields. Ensure first_name, last_name, specialization_id, mobile_number, email, and created_by are provided.",
      error: "Validation Error",
    });
  }

  // Execute the function and capture return
  const result = await db.query(
    `SELECT * FROM etoken.sp_insert_doctor(
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12, $13, $14, $15, $16
    );`,
    [
      first_name,
      last_name,
      specialization_id,
      mobile_number,
      phone_number,
      email,
      created_by,
      gender,
      date_of_birth,
      qualification,
      experience_years,
      consultation_fee,
      biography,
      address,
      registration_number,
      specialization
    ]
  );

  const { doctor_id, doctor_name, message } = result.rows[0];

  res.status(201).json({
    success: true,
    message,
    doctor_id,
    doctor_name,
    error: null,
  });
}, "Error inserting doctor:");

const updateDoctor = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    doctor_id,
    mobile_number,
    phone_number,
    email,
    gender,
    date_of_birth,
    qualification,
    experience_years,
    consultation_fee,
    biography,
    address,
    registration_number,
    specialization,
    profile_picture_url,
    modified_by
  } = req.body;

  if (!doctor_id) {
    return res.status(400).json({
      success: false,
      message: "doctor_id is required.",
      error: "Missing required field: doctor_id"
    });
  }

  const result = await db.query(
    `SELECT etoken.sp_update_doctor_profile(
      $1, $2, $3, $4, $5, $6, $7, $8,
      $9, $10, $11, $12, $13, $14, $15
    ) AS message;`,
    [
      doctor_id,
      mobile_number || null,
      phone_number || null,
      email || null,
      gender || null,
      date_of_birth || null,
      qualification || null,
      experience_years || null,
      consultation_fee || null,
      biography || null,
      address || null,
      registration_number || null,
      specialization || null,
      profile_picture_url || null,
      modified_by || null
    ]
  );

  const message = result.rows[0].message;

  res.status(200).json({
    success: true,
    message,
    error: null
  });
}, "Error updating doctor");


/*
URL: POST /doctor/uploadDoctorProfilePicture
Request Body form-data: {
    "doctor_id": 2    ,
    profile_picture: File
}
    Bearer Token: JWT Token
*/
const uploadDoctorProfilePicture = asyncHandler(async (req, res) => {
  const { doctor_id } = req.body;
  console.log("res.body", req.body);
  if (!doctor_id) {
    return res.status(400).json({
      success: false,
      message: "Doctor ID is required.",
      error: "Missing required fields.",
    });
  }
   // Check if file is uploaded
   if (!req.file) {
    return res.status(400).json({
        success: false,
        message: "No file uploaded.",
        error: "Please provide an image file."
    });
}
 // Get uploaded file path
 const profile_picture_url = `/uploads/doctorProfile/${doctor_id}/${req.file.filename}`;
  await db.query("CALL etoken.sp_update_doctor_profile_picture($1, $2);", [
    doctor_id,
    profile_picture_url,
  ]);

  res.status(200).json({
    success: true,
    message: "Profile picture updated successfully.",
    doctor_id,
    profile_picture_url,
    error: null,
  });
}, "Error updating doctor profile picture:");

const insertClinic = asyncHandler(async (req, res) => {
  const {
    clinic_name,
    address,
    city,
    state,
    zip_code,
    doctor_id,
    created_by,
  } = req.body;

  // Validate required fields
  if (
    !clinic_name ||
    !address ||
    !city ||
    !state ||
    !zip_code ||
    !doctor_id ||
    !created_by
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
      error: "All fields are required.",
    });
  }

  // Call the procedure using SELECT to capture OUT parameters
  const result = await db.query(
    `SELECT * FROM etoken.sp_insert_clinic($1, $2, $3, $4, $5, $6, $7);`,
    [
      clinic_name,
      address,
      city,
      state,
      zip_code,
      doctor_id,
      created_by,
    ]
  );

  const { out_doctor_id, out_clinic_id, out_clinic_name } = result.rows[0];

  res.status(201).json({
    success: true,
    message: "Clinic inserted successfully.",
    clinic: {
      clinic_id: out_clinic_id,
      clinic_name: out_clinic_name,
      doctor_id: out_doctor_id,
    },
    error: null,
  });
}, "Error inserting clinic:");

const insertDoctorClinicSchedule = asyncHandler(async (req, res) => {
  const {
    doctor_id,
    clinic_id,
    day_of_week,
    start_time,
    end_time,
    created_by,
  } = req.body;

  if (
    !doctor_id ||
    !clinic_id ||
    !day_of_week ||
    !start_time ||
    !end_time ||
    !created_by
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
      error: "All fields are required.",
    });
  }

  await db.query(
    "CALL etoken.sp_insert_doctor_clinic_schedule($1, $2, $3, $4, $5, $6)",
    [doctor_id, clinic_id, day_of_week, start_time, end_time, created_by]
  );

  res.status(201).json({
    success: true,
    message: "Doctor clinic schedule inserted successfully.",
    schedule: {
      doctor_id,
      clinic_id,
      day_of_week,
      start_time,
      end_time,
      created_by,
    },
    error: null,
  });
}, "Error inserting schedule:");

/* Method: POST
URL: api/doctor/signin
Request Body: {
    "email_or_mobile": "johndoe@example.com",
    "password": "1234"
}*/
const doctorSignIn = asyncHandler(async (req, res) => {
  const { email_or_mobile, password } = req.body;

  // Validate input
  if (!email_or_mobile || !password) {
    return res.status(400).json({
      success: false,
      message: "Email or mobile number and password are required.",
      error: "Missing required fields.",
    });
  }

  // Call the function
  const result = await db.query(
    `SELECT * FROM etoken.fn_doctor_signin($1, $2);`,
    [email_or_mobile, password]
  );

  const rows = result.rows;

  // Check for failed login
  if (!rows.length || !rows.some((r) => r.success)) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
      doctor: null,
      clinics: [],
      error: "Authentication failed.",
    });
  }

  // Extract doctor profile from first matching row
  const {
    doctor_id,
    doctor_name,
    profile_picture_url,
    specialization_name,
    specialization_description,
    gender,
    date_of_birth,
    qualification,
    experience_years,
    consultation_fee,
    biography,
    address,
    registration_number,
    specialization
  } = rows[0];

  // Collect clinics from all matched rows
  const clinics = rows.map((row) => ({
    clinic_id: row.clinic_id,
    clinic_name: row.clinic_name,
    clinic_address: row.clinic_address,
    clinic_city: row.clinic_city,
    clinic_state: row.clinic_state,
    clinic_zipcode: row.clinic_zipcode,
  }));

  // Generate token
  const token = generateToken({ doctor_id });

  // Respond with full profile
  res.status(200).json({
    success: true,
    message: "Authentication successful",
    token,
    doctor: {
      doctor_id,
      doctor_name,
      profile_picture_url,
      gender,
      date_of_birth,
      qualification,
      experience_years,
      consultation_fee,
      biography,
      address,
      registration_number,
      specialization,
      specialization_name,
      specialization_description,
    },
    clinics,
    error: null,
  });
},"Error signing in doctor:");


/* Method: PUT
URL: doctor/accountToggle
Request Body: {
    "doctor_id": 2
}
*/
const doctorAccountToggle = asyncHandler(async (req, res) => {
  const { doctor_id } = req.body;

  // Validate required fields
  if (!doctor_id) {
      return res.status(400).json({
          success: false,
          message: "Missing required field.",
          error: "Doctor ID is required."
      });
  }

  // Call stored procedure and get response
  const result = await db.query(
      "CALL etoken.sp_doctor_account_toggle($1, $2, $3);",
      [parseInt(doctor_id), null, null]
  );

  // Extract returned values
  const updated_status = result.rows[0]?.updated_status;
  const message = result.rows[0]?.message;

  // If no status update, return an error
  if (!updated_status) {
      return res.status(404).json({
          success: false,
          message: message || "Doctor not found.",
          error: "Invalid Doctor ID."
      });
  }

  res.status(200).json({
      success: true,
      message: message,
      doctor_status: updated_status,
      error: null
  });
}, "Error toggling doctor account status");

// URL: /doctor/fetchAllDoctors
// Method: GET

const fetchAllDoctors = asyncHandler(async (req, res) => {
  const { doctor_id } = req.body;
  console.log("doctor_id", doctor_id);

  const sql = "SELECT * FROM etoken.fn_fetch_all_doctors($1);";
  const param = doctor_id ?? null; // Send null if doctor_id is undefined

  const result = await db.query(sql, [param]);

  if (!result.rows.length) {
    return res.status(404).json({
      success: false,
      message: doctor_id ? "Doctor not found." : "No doctors found.",
      doctors: [],
      error: "No records found."
    });
  }

  res.status(200).json({
    success: true,
    message: doctor_id ? "Doctor fetched successfully." : "Doctors fetched successfully.",
    doctors: result.rows,
    error: null
  });
}, "Error fetching doctors");


const fetchClinicsByDoctorId = asyncHandler(async (req, res) => {
  const { doctor_id } = req.query;

  // Validate required fields
  if (!doctor_id || isNaN(doctor_id)) {
      return res.status(400).json({
          success: false,
          message: "Invalid doctor ID.",
          error: "Doctor ID must be a valid number."
      });
  }

  // Call stored function and get response
  const result = await db.query(
      "SELECT * FROM etoken.fn_fetch_clinics_by_doctor_id($1);",
      [parseInt(doctor_id)]
  );

  // If no clinics found
  if (!result.rows.length) {
      return res.status(404).json({
          success: false,
          message: `No clinics found for doctor ID ${doctor_id}.`,
          clinics: [],
          error: "No records found."
      });
  }

  res.status(200).json({
      success: true,
      message: "Clinics fetched successfully.",
      clinics: result.rows,
      error: null
  });
}, "Error fetching clinics for doctor");

module.exports = {
  insertDoctor,
  updateDoctor,
  insertClinic,
  insertDoctorClinicSchedule,
  doctorSignIn,
  uploadDoctorProfilePicture,
  doctorAccountToggle,
  fetchAllDoctors,
  fetchClinicsByDoctorId
};
