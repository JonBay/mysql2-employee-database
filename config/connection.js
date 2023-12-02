const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jimmer01",
  database: "employees_db",
});

module.exports = db;