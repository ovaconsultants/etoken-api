const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

//URL: /api/registration/accounts
const getAccounts = asyncHandler(async (req, res) => {
    const result = await db.query("SELECT * FROM etoken.fn_get_all_accounts();");
    res.status(200).json({
        success: true,
        message: result.rows.length > 0 ? "Accounts retrieved successfully." : "No accounts found.",
        accounts: result.rows || [],
        error: null
    });

}, "Error fetching accounts");

//URL : api/registration/specializations?account_id=2
const getSpecializationsByAccountId = asyncHandler(async (req, res) => {
    const { account_id } = req.query;
    if (!account_id || isNaN(account_id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid account_id. It must be a number.",
            specializations: [],
            error: "Invalid request parameters."
        });
    }
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

}, "Error fetching specializations for");

module.exports = { getAccounts, getSpecializationsByAccountId };
