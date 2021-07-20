const mysql = require("mysql");

const { CREATE_TABLE } = require("./queries");

// From https://github.com/mysqljs/mysql
// Modified to create table
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.query(CREATE_TABLE, function (error) {
  if (error) throw error;
  console.log("DB connection established");
});

module.exports = { pool };
