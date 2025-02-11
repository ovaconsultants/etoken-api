const express = require("express");
const router = express.Router();
const {
  insertExceptionLog,
  fetchAllExceptions,
} = require("../controllers/exceptionController");
const asyncHandler = require("../middlewares/asyncHandler");

// Route to log exceptions
router.post("/logException", insertExceptionLog);
router.get("/fetchAllExceptions", asyncHandler(fetchAllExceptions));

module.exports = router;
