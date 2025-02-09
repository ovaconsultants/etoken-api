// Generic error-handling wrapper for async functions
const logExceptionToDb = require("../utils/logExceptionToDb");
const asyncHandler = (fn) => async (req, res, next) => {
    try {
      console.log("asyncHandler called");
      //logExceptionToDb("request completed successfully");
      await fn(req, res, next);
     
    } catch (error) {
      console.error("Error:", error.message);
      await logExceptionToDb(error.message);
  
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
        message: error.message
      });
    }
  };
  
  module.exports = asyncHandler;
  