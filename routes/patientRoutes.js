const express = require("express");
const { insertPatient, fetchAllPatients,updatePatient } = require("../controllers/patientController");

//const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.post("/addPatient", insertPatient);
router.get("/fetchAllPatients", fetchAllPatients);
router.put("/updatePatient", updatePatient);


//router.use(authMiddleware);

module.exports = router;
