const express = require("express");
const { insertPatient, fetchAllPatients } = require("../controllers/patientController");

//const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.post("/addPatient", insertPatient);
router.get("/fetchAllPatients", fetchAllPatients);


//router.use(authMiddleware);

module.exports = router;
