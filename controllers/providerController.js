const db = require("../config/db");
const asyncHandler = require("../middleware/asyncHandler"); // Import the wrapper

const getCategories = asyncHandler(async (req, res) => {
  const result = await db.query("SELECT * FROM etoken.fn_get_all_categories();");

  if (!result.rows || result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No categories found."
    });
  }

  res.status(200).json({
    success: true,
    categories: result.rows
  });
});

const getSubCategoriesByCategoryId = asyncHandler(async (req, res) => {
  const { category_id } = req.params; // Get category_id from request parameters

  // Validate category_id (ensure it's a number)
  if (!category_id || isNaN(category_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category_id. It must be a number."
    });
  }

  // Execute query using the stored function
  const result = await db.query(
    "SELECT * FROM etoken.fn_get_subcategories_by_category($1);",
    [category_id]
  );

  // If no subcategories found, return 404
  if (!result.rows || result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No subcategories found for category_id ${category_id}`
    });
  }

  // Return subcategories in response
  res.status(200).json({
    success: true,
    subcategories: result.rows
  });
});

module.exports = {getCategories, getSubCategoriesByCategoryId};