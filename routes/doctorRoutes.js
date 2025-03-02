const express = require("express");
const { insertDoctor,
     insertClinic, 
     insertDoctorClinicSchedule, 
     doctorSignIn, 
     uploadDoctorProfilePicture,
    doctorAccountToggle
 } = require("../controllers/doctorController");

//const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

// Public Routes
router.post("/addDoctor", insertDoctor);
router.post("/addClinic", insertClinic);
router.post("/schedule", insertDoctorClinicSchedule);
router.post("/signIn", doctorSignIn);
router.post("/uploadDoctorProfilePicture", upload.single("profile_picture"), uploadDoctorProfilePicture);
router.put("/doctorAccountToggle", doctorAccountToggle);

//router.use(authMiddleware);

module.exports = router;
