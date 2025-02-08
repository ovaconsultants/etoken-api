const p = require("../config/db");

// Function to log exceptions to the database
const logExceptionToDb = async (logData) => {
  try {
    const query = `SELECT ova2.udf_insert_exception_log_from_json($1);`;
    const response = await p.query(query, [JSON.stringify(logData)]);
    console.log("Exception logged successfully:", response.rows[0].udf_insert_exception_log_from_json);
  } catch (err) {
    console.error("Failed to log exception to database:", err);
    throw err; // Optional: re-throw the error for further handling
  }
};

module.exports = logExceptionToDb;
