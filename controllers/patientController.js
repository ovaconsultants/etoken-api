const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");
const { protect } = require("../middlewares/authMiddleware");

/*
URL: http://localhost:3001/patient/insertPatient
Method: POST
{
    "patient_name": "Alice Johnson",
    "mobile_number": "9876543210",
    "email": "alice.j@example.com",
    "patient_profile_picture_url": "/uploads/patientProfile/123/profile_pic_123.jpg",
    "clinic_id": 2,
    "created_by": "AdminUser"
}
    */

const insertPatient = asyncHandler(async (req, res) => {
    const {
        patient_name, mobile_number, email, patient_profile_picture_url,
        clinic_id, created_by
    } = req.body;

    if (!patient_name || !clinic_id || !created_by) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields.",
            error: "Patient name, clinic ID, and created_by are required."
        });
    }
        const result = await db.query(
            "CALL etoken.sp_insert_patient($1, $2, $3, $4, $5, $6, $7, $8, $9);",
            [patient_name, mobile_number, email, patient_profile_picture_url, clinic_id, created_by, null, null, null]
        );

        // Extract returned patient_id, patient_name, and message
        const inserted_patient_id = result.rows[0]?.patient_id;
        const inserted_patient_name = result.rows[0]?.inserted_patient_name;
        const message = result.rows[0]?.message;

        res.status(201).json({
            success: true,
            message: message || "Patient inserted successfully.",
            patient_id: inserted_patient_id,
            patient_name: inserted_patient_name,            
            error: null
        });

   
},"Error inserting patient:");


// URL: http://localhost:3001/patient/fetchAllPatients
const fetchAllPatients = asyncHandler(async (req, res) => {
        const result = await db.query("SELECT * FROM etoken.fn_fetch_all_patients();");
        res.status(200).json({
            success: true,
            message: result.rows.length > 0 ? "Patients retrieved successfully." : "No active patients found.",
            patients: result.rows || [],
            error: null
        });
   
}, "Error fetching patients:");

/*
http://localhost:3001/patient/updatePatient
Method: PUT
{
    "patient_id": 1,
    "patient_name": "Alice Johnson",
    "mobile_number": "9876543210",
    "email": "alice.j@example.com",
    "modified_by": "AdminUser"
}
*/
const updatePatient = asyncHandler(async (req, res) => {
    const { patient_id, patient_name, mobile_number, email, modified_by } = req.body;

    // Validate input
    if (!patient_id || !modified_by) {
        return res.status(400).json({
            success: false,
            message: "Patient ID and Updated By are required.",
            error: "Missing required fields."
        });
    }


        const result = await db.query(
            "SELECT etoken.fn_update_patient($1, $2, $3, $4, $5) AS response_message;",
            [patient_id, patient_name, mobile_number, email, modified_by]
        );

        res.status(200).json({
            success: true,
            message: result.rows[0]?.response_message || "Update operation completed.",
            error: null
        });
  
}, "Error updating patient:");

module.exports = { insertPatient, fetchAllPatients:[protect, fetchAllPatients],updatePatient:[protect, updatePatient] };
