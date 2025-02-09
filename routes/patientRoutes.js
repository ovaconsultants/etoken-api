const express = require("express");
const { insertPatient } = require("../controllers/patientController");

//const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.post("/addPatient", insertPatient);


//router.use(authMiddleware);

module.exports = router;
