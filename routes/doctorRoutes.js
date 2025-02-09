const express = require("express");
const { insertDoctor, insertClinic, insertDoctorClinicSchedule } = require("../controllers/doctorController");

//const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.post("/addDoctor", insertDoctor);
router.post("/addClinic", insertClinic);
router.post("/schedule", insertDoctorClinicSchedule);

//router.use(authMiddleware);

module.exports = router;
