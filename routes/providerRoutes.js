const express = require("express");
const {getCategories, getSubCategoriesByCategoryId} = require("../controllers/providerController");
//const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.get("/categories", getCategories);
router.get("/subCategories", getSubCategoriesByCategoryId);

//router.use(authMiddleware);

module.exports = router;
