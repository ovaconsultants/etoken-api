const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

const insertPatient = asyncHandler(async (req, res) => {
    const {
        patient_name, mobile_number, email, patient_profile_picture_url,
        clinic_id, created_by
    } = req.body;

    // Validate required fields
    if (!patient_name || !clinic_id || !created_by) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields.",
            error: "Patient name, clinic ID, and created_by are required."
        });
    }

        await db.query(
            "CALL etoken.sp_insert_patient($1, $2, $3, $4, $5, $6)",
            [patient_name, mobile_number, email, patient_profile_picture_url, clinic_id, created_by]
        );

        res.status(201).json({
            success: true,
            message: "Patient inserted successfully.",
            patient: {
                patient_name, mobile_number, email, patient_profile_picture_url, clinic_id, created_by
            },
            error: null
        });

}, "Error inserting patient:");

module.exports = { insertPatient };
