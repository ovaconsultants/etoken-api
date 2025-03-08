const express = require("express");
const { insertDoctor,
     insertClinic, 
     insertDoctorClinicSchedule, 
     doctorSignIn, 
     uploadDoctorProfilePicture,
    doctorAccountToggle,
    fetchAllDoctors,
    fetchClinicsByDoctorId
 } = require("../controllers/doctorController");

const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

// Public Routes
router.post("/addDoctor", insertDoctor);
router.post("/addClinic", insertClinic);
router.post("/schedule", insertDoctorClinicSchedule);
router.post("/signIn", doctorSignIn);
router.post("/uploadDoctorProfilePicture", upload.single("profile_picture"), uploadDoctorProfilePicture);
router.put("/doctorAccountToggle", doctorAccountToggle);
router.get("/fetchAllDoctors", fetchAllDoctors);
router.get("/fetchClinicsByDoctorId", fetchClinicsByDoctorId);

module.exports = router;
