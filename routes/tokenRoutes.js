const express = require("express");
const {
  insertToken,
  fetchTokensForPatients,
  updateToken,
  toggleRecallStatus,
} = require("../controllers/tokenController");

const router = express.Router();

// Public Routes
router.post("/insertToken", insertToken);
router.get("/fetchTokensForPatients", fetchTokensForPatients);
router.put("/updateToken", updateToken);
router.put("/toggleRecallStatus", toggleRecallStatus);

module.exports = router;
