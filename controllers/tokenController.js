const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");
const { protect } = require("../middlewares/authMiddleware");

/*{
    "patient_id": 1,
    "clinic_id": 2,
    "doctor_id": 3,
    "schedule_id": null,
    "emergency": "N",
    "fee_amount": 500.00,
    "fee_status": "Not Paid",
    "status": "Waiting",
    "created_by": "AdminUser"
}*/
const insertToken = asyncHandler(async (req, res) => {
    const {
        patient_id, clinic_id, doctor_id, schedule_id, emergency,
        fee_amount, fee_status, status, created_by
    } = req.body;

    if (!patient_id || !clinic_id || !doctor_id || !emergency || !fee_amount || !fee_status || !status || !created_by) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields.",
            error: "Patient ID, clinic ID, doctor ID, emergency, fee amount, fee status, status, and created_by are required."
        });
    }
    await db.query(
        "CALL etoken.sp_insert_token($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [patient_id, clinic_id, doctor_id, schedule_id, emergency, fee_amount, fee_status, status, created_by]
    );

    res.status(201).json({
        success: true,
        message: "Token inserted successfully.",
        token: {
            patient_id, clinic_id, doctor_id, schedule_id, emergency, fee_amount, fee_status, status, created_by
        },
        error: null
    });
}, "Error inserting token:");

// URL:api/token/fetchTokensForPatients?doctor_id=2&clinic_id=1
const fetchTokensForPatients = asyncHandler(async (req, res) => {
    const { doctor_id, clinic_id } = req.query;
    if (!doctor_id || !clinic_id) {
        return res.status(400).json({
            success: false,
            message: "Doctor ID and Clinic ID are required.",
            error: "Missing required parameters."
        });
    }
    const result = await db.query(
        "SELECT * FROM etoken.fn_fetch_tokens_for_patients($1, $2);",
        [doctor_id, clinic_id]
    );

    res.status(200).json({
        success: true,
        message: result.rows.length > 0 ? "Tokens retrieved successfully." : "No active tokens found.",
        tokens: result.rows || [],
        error: null
    });

}, "Error fetching tokens for patients");

module.exports = { insertToken: [protect, insertToken], fetchTokensForPatients: [protect, fetchTokensForPatients] };
