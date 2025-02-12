const express = require("express");
const router = express.Router();
const {
  insertExceptionLog,
  fetchAllExceptions,
} = require("../controllers/exceptionController");

// Route to log exceptions
router.post("/logException", insertExceptionLog);
router.get("/fetchAllExceptions", fetchAllExceptions);

module.exports = router;
