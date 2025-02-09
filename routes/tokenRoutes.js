const express = require("express");
const { insertToken, getTokensForToday } = require("../controllers/tokenController");

//const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.post("/createToken", insertToken);
router.get("/getTokensForToday", getTokensForToday);


//router.use(authMiddleware);

module.exports = router;
