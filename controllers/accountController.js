const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

const getAccounts = asyncHandler(async (req, res) => {
    console.log("getAccounts called");
    try {
        const result = await db.query("SELECT * FROM etoken.fn_get_all_accounts();");

        res.status(200).json({
            success: true,
            message: result.rows.length > 0 ? "Accounts retrieved successfully." : "No accounts found.",
            accounts: result.rows || [],
            error: null
        });

    } catch (error) {
        console.error("Error fetching accounts:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            accounts: [],
            error: error.message
        });
    }
});
//http://localhost:3001/api/registration/specializations?account_id=2
const getSpecializationsByAccountId = asyncHandler(async (req, res) => {
    const { account_id } = req.query;
    //console.log("account_id", account_id);
    // Validate account_id
    if (!account_id || isNaN(account_id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid account_id. It must be a number.",
            specializations: [],
            error: "Invalid request parameters."
        });
    }

    try {
        const result = await db.query(
            "SELECT * FROM etoken.fn_get_specializations_by_account($1);",
            [account_id]
        );

        res.status(200).json({
            success: true,
            message: result.rows.length > 0 ? "Specializations retrieved successfully." : `No specializations found for account_id ${account_id}.`,
            specializations: result.rows || [],
            error: null
        });

    } catch (error) {
        console.error(`Error fetching specializations for account_id ${account_id}:`, error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            specializations: [],
            error: error.message
        });
    }
});

module.exports = { getAccounts, getSpecializationsByAccountId };
