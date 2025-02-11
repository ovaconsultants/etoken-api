const express = require("express");
const router = express.Router();
const { insertExceptionLog } = require("../controllers/exceptionController");

// Route to log exceptions
router.post("/logException", insertExceptionLog);

module.exports = router;
