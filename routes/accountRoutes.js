const express = require("express");
const {getAccounts, getSpecializationsByAccountId} = require("../controllers/accountController");
//const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
//console.log("Account Route is running");
// Public Routes
router.get("/accounts", getAccounts);
router.get("/specializations", getSpecializationsByAccountId);
//router.use(authMiddleware);

module.exports = router;
