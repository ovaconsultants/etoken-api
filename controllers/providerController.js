const db = require("../config/db");
const getCategories = async (req, res) => {
    try {
      const { rows } = await db.query(
        "SELECT * FROM etoken.fn_get_all_categories();"
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error(
        "Error occurred while fetching the categories:",
        error.message
      );
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  };

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    console.log("req.params",req.params)
    const { category_id } = req.params; // Get category_id from request parameters
console.log("category_id",category_id)
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
  } catch (error) {
    console.error("Error fetching subcategories:", error.message);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message
    });
  }
};

module.exports = {getCategories, getSubCategoriesByCategoryId};