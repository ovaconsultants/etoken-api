const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up storage with dynamic path
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const doctorId = req.body.doctor_id; // Get doctor_id from request body
        if (!doctorId) {
            return cb(new Error("Doctor ID is required for file upload"), false);
        }

        const doctorDir = path.join(__dirname, "../uploads/doctorProfile", doctorId.toString());

        // Ensure directory exists
        if (!fs.existsSync(doctorDir)) {
            fs.mkdirSync(doctorDir, { recursive: true });
        }

        cb(null, doctorDir); // Set the upload directory
    },
    filename: (req, file, cb) => {
        const doctorId = req.body.doctor_id;
        const ext = path.extname(file.originalname); // Get file extension (.jpg, .png, etc.)
        const filename = `profile_pic_${doctorId}${ext}`; // Standardized filename
        cb(null, filename);
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

// Configure Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

module.exports = upload;
