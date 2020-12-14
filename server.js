// Import the mysql and inquirer packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Connect to the employee_trackerDB database using a localhost connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "employee_trackerDB"
});

// connect/start the database connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n")
});
