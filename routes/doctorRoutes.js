const express = require("express");
const {
   insertDoctor,
   updateDoctor,
   insertClinic,
   insertDoctorClinicSchedule,
   doctorSignIn,
   uploadDoctorProfilePicture,
   doctorAccountToggle,
   fetchAllDoctors,
   fetchClinicsByDoctorId,
   getDoctorProfilePicture,
} = require("../controllers/doctorController");

const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

// Public Routes
router.post("/addDoctor", insertDoctor);
router.put("/updateDoctor", updateDoctor);
router.post("/addClinic", insertClinic);
router.post("/schedule", insertDoctorClinicSchedule);
router.post("/signIn", doctorSignIn);
router.post("/uploadDoctorProfilePicture", upload.single("profile_picture"), uploadDoctorProfilePicture);
router.put("/doctorAccountToggle", doctorAccountToggle);
router.post("/fetchAllDoctors", fetchAllDoctors);
router.get("/fetchClinicsByDoctorId", fetchClinicsByDoctorId);
router.get("/getDoctorProfilePicture", getDoctorProfilePicture);

module.exports = router;
