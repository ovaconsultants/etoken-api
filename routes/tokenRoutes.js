const express = require("express");
const { insertToken, fetchTokensForPatients } = require("../controllers/tokenController");

//const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.post("/createToken", insertToken);
router.get("/fetchTokensForPatients", fetchTokensForPatients);


//router.use(authMiddleware);

module.exports = router;
