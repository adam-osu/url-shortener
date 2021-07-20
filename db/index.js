const mysql = require("mysql");

const { CREATE_TABLE } = require("./queries");

// From https://github.com/mysqljs/mysql
// Modified to create table
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "0.0.0.0",
  user: "root",
  password: "password",
  port: 3306,
  database: "url_shortener_dev",
});

pool.query(CREATE_TABLE, function (error) {
  if (error) throw error;
  console.log("DB connection established");
});
