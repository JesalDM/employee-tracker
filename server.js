// Import the required packages and files
const mysql = require("mysql");
const employeeTracker = require("./employee_tracker");
const CFonts = require('cfonts');

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
  CFonts.say('Employee Tracker', {
    font: 'block',              // define the font face
    align: 'left',              // define text alignment
    colors: ['system'],         // define all colors
    background: 'transparent',  // define the background color
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line
  });
  employeeTracker.start(connection);
});
