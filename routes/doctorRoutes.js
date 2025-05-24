const express = require("express");
const {
   insertDoctor,
   updateDoctor,
   insertClinic,
   insertDoctorClinicSchedule,
   doctorSignIn,
   uploadImage,
   doctorAccountToggle,
   fetchAllDoctors,
   fetchClinicsByDoctorId,
   fetchImage,
} = require("../controllers/doctorController");

const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

// Public Routes
router.post("/addDoctor", insertDoctor);
router.put("/updateDoctor", updateDoctor);
router.post("/addClinic", insertClinic);
router.post("/schedule", insertDoctorClinicSchedule);
router.post("/signIn", doctorSignIn);
router.post("/uploadImage", upload.single("image"), uploadImage);
router.put("/doctorAccountToggle", doctorAccountToggle);
router.post("/fetchAllDoctors", fetchAllDoctors);
router.get("/fetchClinicsByDoctorId", fetchClinicsByDoctorId);
router.get("/fetchImage", fetchImage);

module.exports = router;
