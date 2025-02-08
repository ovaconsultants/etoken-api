const { Pool } = require("pg");
const dbConfig = require("../config/dbConfig.js");

// connecting to database
const p = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

// Exporting the pool
module.exports = p;
