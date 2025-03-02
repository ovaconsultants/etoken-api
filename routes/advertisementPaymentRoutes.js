const express = require("express");
const { insertAdvertisementPayment } = require("../controllers/advertisementPaymentController");
const router = express.Router();

// Public Routes
router.post("/insertAdvertisementPayment", insertAdvertisementPayment);

module.exports = router;
