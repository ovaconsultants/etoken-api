const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

const getAccounts = asyncHandler(async (req, res) => {
    console.log("getAccounts called");
  const result = await db.query("SELECT * FROM etoken.fn_get_all_accounts();");

  if (!result.rows || result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No accounts found."
    });
  }

  res.status(200).json({
    success: true,
    accounts: result.rows
  });
});

const getSpecializationsByAccountId = asyncHandler(async (req, res) => {
  const { account_id } = req.params;

  // Validate account_id
  if (!account_id || isNaN(account_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid account_id. It must be a number."
    });
  }

  const result = await db.query(
    "SELECT * FROM etoken.fn_get_specializations_by_account($1);",
    [account_id]
  );

  if (!result.rows || result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No specializations found for account_id ${account_id}`
    });
  }

  res.status(200).json({
    success: true,
    specializations: result.rows
  });
});

module.exports = {getAccounts, getSpecializationsByAccountId };

