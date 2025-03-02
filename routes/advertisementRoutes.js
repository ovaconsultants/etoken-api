const express = require("express");
const { insertAdvertisement, fetchActiveAdvertisements } = require("../controllers/advertisementController");
const router = express.Router();

// Public Routes
router.post("/insertAdvertisement", insertAdvertisement);
router.get("/fetchActiveAdvertisements", fetchActiveAdvertisements);

module.exports = router;
