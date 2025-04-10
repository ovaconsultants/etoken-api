const express = require("express");
const { insertAdvertisement, fetchActiveAdvertisements, updateAdvertisement, fetchAdvertisements } = require("../controllers/advertisementController");
const router = express.Router();

// Public Routes
router.post("/insertAdvertisement", insertAdvertisement);
router.get("/fetchActiveAdvertisements", fetchActiveAdvertisements);
router.put("/updateAdvertisement", updateAdvertisement);
router.get("/fetchAdvertisements", fetchAdvertisements);

module.exports = router;
