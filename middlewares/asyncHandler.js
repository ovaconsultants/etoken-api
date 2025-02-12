
const db = require("../config/db");

const asyncHandler = (fn, errorMessage) => async (req, res, next) => {
    try {
        // console.log("asyncHandler executed for:", req.query);
        await fn(req, res, next);
    } catch (error) {
        //console.error("Error:", error.message);
        const platform = "API Server";
        const created_by = "AsyncHandler ";
        try {
            await db.query(
                "CALL etoken.sp_insert_exception_log($1, $2, $3, NULL);",
                [error.message, platform, created_by]
            );
        } catch (logError) {
            console.error("Failed to log exception:", logError.message);
        }
        res.status(500).json({
            success: false,
            error: errorMessage + (Object.keys(req.query).length ? "-" + JSON.stringify(req.query) : ""),
            message: error.message
        });
    }
};

module.exports = asyncHandler;
