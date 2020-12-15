// Import the required packages and files
const mysql = require("mysql");
const employeeTracker = require("./employee_tracker")

// Connect to the employee_trackerDB database using a localhost connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "employee_trackerDB"
});

// connect/start the database connection
connection.connect(function(err) {
  if (err) throw err;
  employeeTracker.addDepartment(connection);
});
