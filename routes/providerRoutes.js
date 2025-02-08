const express = require("express");
const {getCategories} = require("../controllers/providerController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.get("/getCategories", getCategories);

router.use(authMiddleware);

module.exports = router;
