const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");
const { protect } = require("../middlewares/authMiddleware");
/*
URL: POST /api/exception/logException
Sample request body:{
    "exception_description": "Error found in API response",
    "platform": "Web",
    "created_by": "AdminUser"
}
*/
const insertExceptionLog = asyncHandler(async (req, res) => {
  const { exception_description, platform, created_by } = req.body;

  // Validate required fields
  if (!exception_description || !platform || !created_by) {
    return res.status(400).json({
      success: false,
      message: "Exception description, platform, and created_by are required.",
      error: "Missing required fields.",
    });
  }

  try {
    console.log("Call the stored procedure");
    // Call the stored procedure
    const result = await db.query(
      "CALL etoken.sp_insert_exception_log($1, $2, $3, NULL);",
      [exception_description, platform, created_by]
    );
    console.log("result", result);

    res.status(201).json({
      success: true,
      message: "Exception logged successfully.",
      exception_id: result.rows[0]?.new_exception_id || null,
      error: null,
    });
  } catch (error) {
    console.error("Error logging exception:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      exception_id: null,
      error: error.message,
    });
  }
});
/*
URL: GET /api/exception/fetchAllExceptions
*/
const fetchAllExceptions = asyncHandler(async (req, res) => {
    try {
        // Call the function to fetch exceptions
        const result = await db.query("SELECT * FROM etoken.fn_fetch_all_exceptions();");

        res.status(200).json({
            success: true,
            message: result.rows.length > 0 ? "Exceptions retrieved successfully." : "No exceptions found.",
            exceptions: result.rows || [],
            error: null
        });

    } catch (error) {
        console.error("Error fetching exceptions:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            exceptions: [],
            error: error.message
        });
    }
});

module.exports = { insertExceptionLog: [protect, insertExceptionLog], fetchAllExceptions };
