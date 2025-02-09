const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

const insertToken = asyncHandler(async (req, res) => {
    const {
        patient_id, clinic_id, schedule_id, emergency,
        fee_amount, fee_status, status, created_by
    } = req.body;

    // Validate required fields
    if (!patient_id || !clinic_id || !emergency || !fee_amount || !fee_status || !status || !created_by) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields.",
            error: "Patient ID, clinic ID, emergency, fee amount, fee status, status, and created_by are required."
        });
    }

    try {
        // Call the stored procedure (token_no is auto-generated)
        await db.query(
            "CALL etoken.sp_insert_token($1, $2, $3, $4, $5, $6, $7, $8)",
            [patient_id, clinic_id, schedule_id, emergency, fee_amount, fee_status, status, created_by]
        );

        res.status(201).json({
            success: true,
            message: "Token inserted successfully.",
            token: {
                patient_id, clinic_id, schedule_id, emergency, fee_amount, fee_status, status, created_by
            },
            error: null
        });

    } catch (error) {
        console.error("Error inserting token:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            token: null,
            error: error.message
        });
    }
});

const getTokensForToday = asyncHandler(async (req, res) => {
    try {
        // Fetch tokens using stored function
        const result = await db.query("SELECT * FROM etoken.fn_get_tokens_for_today();");

        res.status(200).json({
            success: true,
            message: result.rows.length > 0 ? "Today's active tokens retrieved successfully." : "No active tokens found for today.",
            tokens: result.rows || [],
            error: null
        });

    } catch (error) {
        console.error("Error fetching today's tokens:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            tokens: [],
            error: error.message
        });
    }
});

module.exports = { insertToken, getTokensForToday };
