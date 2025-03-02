const express = require("express");
const { insertAdvertisement } = require("../controllers/advertisementController");
const router = express.Router();

// Public Routes
router.post("/insertAdvertisement", insertAdvertisement);

module.exports = router;
