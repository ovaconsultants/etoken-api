const express = require("express");
const { insertAdvertisementPayment, updateAdvertisementPayment,
fetchAdvertisementPaymentsByAdId
 } = require("../controllers/advertisementPaymentController");
const router = express.Router();

// Public Routes
router.post("/insertAdvertisementPayment", insertAdvertisementPayment);
router.put("/updateAdvertisementPayment", updateAdvertisementPayment);
router.get("/fetchAdvertisementPaymentsByAdId", fetchAdvertisementPaymentsByAdId);

module.exports = router;
