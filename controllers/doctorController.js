const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

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

    try {
        // Call the stored procedure to insert doctor details
        await db.query(
            "CALL etoken.sp_insert_doctor($1, $2, $3, $4, $5, $6, $7, $8);",
            [first_name, last_name, specialization_id, mobile_number, phone_number, email, profile_picture_url, created_by]
        );

        res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            error: null
        });
    } catch (error) {
        console.error("Error inserting doctor:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

const insertClinic = asyncHandler(async (req, res) => {
    const {
        clinic_name, address, city, state, zip_code,
        doctor_id, created_by
    } = req.body;

    // Validate required fields
    if (!clinic_name || !address || !city || !state || !zip_code || !doctor_id || !created_by) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields.",
            error: "All fields are required."
        });
    }

    try {
        // Call the stored procedure
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

    } catch (error) {
        console.error("Error inserting clinic:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            clinic: null,
            error: error.message
        });
    }
});

const insertDoctorClinicSchedule = asyncHandler(async (req, res) => {
    const { doctor_id, clinic_id, day_of_week, start_time, end_time, created_by } = req.body;

    // Validate required fields
    if (!doctor_id || !clinic_id || !day_of_week || !start_time || !end_time || !created_by) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields.",
            error: "All fields are required."
        });
    }

    try {
        // Call the stored procedure
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

    } catch (error) {
        console.error("Error inserting schedule:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            schedule: null,
            error: error.message
        });
    }
});

const doctorSignIn = asyncHandler(async (req, res) => {
    const { email_or_mobile, password } = req.body;

    // Validate input fields
    if (!email_or_mobile || !password) {
        return res.status(400).json({
            success: false,
            message: "Email or mobile number and password are required.",
            error: "Missing required fields."
        });
    }

    try {
        // Call the stored procedure
        const result = await db.query(
            "CALL etoken.sp_doctor_signin($1, $2, NULL, NULL, NULL, NULL, NULL, NULL);",
            [email_or_mobile, password]
        );

        // Extract data from the response
        const doctor = result.rows[0];

        if (!doctor.success) {
            return res.status(401).json({
                success: false,
                message: doctor.message,
                doctor: null,
                error: "Invalid credentials"
            });
        }

        // Return successful authentication response
        res.status(200).json({
            success: true,
            message: doctor.message,
            doctor: {
                doctor_id: doctor.doctor_id,
                doctor_name: doctor.doctor_name,
                clinic_id: doctor.clinic_id,
                clinic_name: doctor.clinic_name
            },
            error: null
        });

    } catch (error) {
        console.error("Error during doctor sign-in:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            doctor: null,
            error: error.message
        });
    }
});

module.exports = { insertDoctor, insertClinic, insertDoctorClinicSchedule, doctorSignIn };
