const p = require("../config/db");
const getCategories = async (req, res) => {
    try {
      const { rows } = await p.query(
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
  module.exports = {getCategories};