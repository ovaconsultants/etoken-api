const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (doctor) => {
    return jwt.sign(
        {
            doctor_id: doctor.doctor_id,
            doctor_name: doctor.doctor_name,
            clinic_id: doctor.clinic_id,
            clinic_name: doctor.clinic_name
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
        phone_number,
        email,
        profile_picture_url,
        created_by
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !specialization_id || !mobile_number || !email || !created_by) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields. Ensure first_name, last_name, specialization_id, mobile_number, email, and created_by are provided.",
            error: "Validation Error"
        });
    }
    await db.query(
        "CALL etoken.sp_insert_doctor($1, $2, $3, $4, $5, $6, $7, $8);",
        [first_name, last_name, specialization_id, mobile_number, phone_number, email, profile_picture_url, created_by]
    );

    res.status(201).json({
        success: true,
        message: "Doctor added successfully",
        error: null
    });
}, "Error inserting doctor:");

const insertClinic = asyncHandler(async (req, res) => {
    const {
        clinic_name, address, city, state, zip_code,
        doctor_id, created_by
    } = req.body;

    if (!clinic_name || !address || !city || !state || !zip_code || !doctor_id || !created_by) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields.",
            error: "All fields are required."
        });
    }

    await db.query(
        "CALL etoken.sp_insert_clinic($1, $2, $3, $4, $5, $6, $7)",
        [clinic_name, address, city, state, zip_code, doctor_id, created_by]
    );

    res.status(201).json({
        success: true,
        message: "Clinic inserted successfully.",
        clinic: {
            clinic_name, address, city, state, zip_code, doctor_id, created_by
        },
        error: null
    });

}, "Error inserting clinic:");

const insertDoctorClinicSchedule = asyncHandler(async (req, res) => {
    const { doctor_id, clinic_id, day_of_week, start_time, end_time, created_by } = req.body;

    if (!doctor_id || !clinic_id || !day_of_week || !start_time || !end_time || !created_by) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields.",
            error: "All fields are required."
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
            doctor_id, clinic_id, day_of_week, start_time, end_time, created_by
        },
        error: null
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
    if (!email_or_mobile || !password) {
        return res.status(400).json({
            success: false,
            message: "Email or mobile number and password are required.",
            error: "Missing required fields."
        });
    }

    const result = await db.query(
        "CALL etoken.sp_doctor_signin($1, $2, NULL, NULL, NULL, NULL, NULL, NULL);",
        [email_or_mobile, password]
    );

    const doctor = result.rows[0];

    if (!doctor || !doctor.success) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
            doctor: null,
            error: "Authentication failed."
        });
    }

    // Generate Lifetime JWT Token
    const token = generateToken(doctor);

    res.status(200).json({
        success: true,
        message: "Authentication successful",
        doctor: {
            doctor_id: doctor.doctor_id,
            doctor_name: doctor.doctor_name,
            clinic_id: doctor.clinic_id,
            clinic_name: doctor.clinic_name
        },
        token, // Lifetime token
        error: null
    });

}, "Error during doctor sign-in");


module.exports = { insertDoctor, insertClinic, insertDoctorClinicSchedule, doctorSignIn };
