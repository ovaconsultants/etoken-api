const express = require("express");
const { insertPatient, fetchAllPatients,updatePatient,fetchIndividualPatientInQueue } = require("../controllers/patientController");

//const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.post("/insertPatient", insertPatient);
router.get("/fetchAllPatients", fetchAllPatients);
router.put("/updatePatient", updatePatient);
router.get("/fetchIndividualPatientInQueue", fetchIndividualPatientInQueue);


//router.use(authMiddleware);

module.exports = router;
