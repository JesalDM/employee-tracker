// Importing the required packages and files
const inquirer = require("inquirer");
const cTable = require("console.table");
const Department = require("./model/Department");
const Role = require("./model/Role");
const Employee = require("./model/Employee");


// inquirer question prompt - what do you want to do? (choices - add departments, add roles, add employees, view departments, view roles, view employees, update employee roles, exit)

// function which prompts the user for what action they should take - presently assuming adding a department is the only option 
function start(connection) {
  inquirer
  // prompt to ask the user about what action he wants to take
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update an Employee's Role", "Delete Department", "Delete Role", "Exit"]
    })
    .then(function(answer) {
        // based on the user answer, executes the corresponding function
        switch(answer.action){
            case "Add Department" :
                addDepartment(connection);
                break;
            case "Add Role" :
                addRole(connection);
                break;
            case "Add Employee" :
                addEmployee(connection);
                break;
            case "View Departments" :
                viewDepartments(connection);
                break;
            case "View Roles" :
                viewRoles(connection);
                break;
            case "View Employees" :
                viewEmployees(connection);
                break;
            case "Update an Employee's Role" :
                updateEmployeeRole(connection);
                break;
            case "Delete Department" :
                deleteDepartment(connection);
                break;
            case "Delete Role" :
                deleteRole(connection);
                break;
            default:
                connection.end();     
        }
    });
}

// this function adds a new department to the departmment table in the database, based on user response
function addDepartment(connection){
    // prompt to ask the user about the department that he wants to add
  inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department that you want to add?",
            // validates that response is provided
            validate: (answer) => {
                if(answer = ""){
                    return "Name is required";
                }
                return true;
            }
        }
    ]).then((answers) => {
        // creates new instance of Department using user response
        const newDepartment = new Department(answers.name);
        // SQL query to insert the new record in the department table in the database
        connection.query("INSERT INTO department SET ?",
            newDepartment,
            function(err) {
                if (err){
                    // shpws a user friendly message to user
                    console.log("Sorry! The department could not be added due to some problem. Please try again!\nError Details: ", err.sqlMessage);
                } else {
                    console.log("The department was successfully added!");
                }
                // restarts the question prompt
                start(connection);
            }
        )
    });
}

// this function adds a new role to the role table in the database, based on user response
function addRole(connection){
  connection.query("Select * from department", function(err, results){
    if (err) throw err;
    // maps every row in the department table to an object that can be made available to inquirer choices
    const departmentList = results.map((department)=> 
        ({ value: department.id, name: department.name })
    );
    // prompts to ask the user about the role that he wants to add
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the new role title that you want to add?",
                // validates that response is provided
                validate: (answer) => {
                    if(answer = ""){
                        return "Role title is required";
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary that an employee in this role would be paid?",
                // validates that response is provided and is a positive number 
                validate: (answer) => {
                    if (answer === ""){
                    return "Please enter a number greater than 0";
                    }
                    return true;
                },
                filter: answer => {
                    if(Number.isNaN(answer) || Number(answer)<=0){
                        return ""
                    }
                    return Number(answer);
                }  
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department do you want to associate the role with?",
                choices: departmentList
            }
        ]).then((answers) => {
            // creates new instance of role using user response
            const newRole = new Role(answers.title, answers.salary, answers.department_id);
            // SQL query to insert the new record in the role table in the database
            connection.query("INSERT INTO role SET ?",
                newRole,
                function(err) {
                    if (err){
                        // shpws a user friendly message to user
                        console.log("Sorry! The role could not be added due to some problem. Please try again!\nError Details: ", err.sqlMessage);
                    } else {
                        console.log("The role was successfully added!");
                    }
                    // restarts the question prompt
                    start(connection);
                }
            )
        });
  });
}

// this function adds a new employee to the employee table in the database, based on user response
function addEmployee(connection){
    connection.query('Select CONCAT(first_name, " ", last_name) as full_name, id from employee', function(error, empResults){
        if (error) throw error;
        // maps every row in the employee table to an object that can be made available to inquirer choices
        const managerList = empResults.map(manager=>
            ({ value: manager.id, name: manager.full_name})
        );
        connection.query('Select CONCAT(role.title, "-", department.name) as role_department, role.id from role left join department on role.department_id = department.id', function(err, results){
            if (err) throw err;
            // maps every row in the role table to an object that can be made available to inquirer choices
            const roleList = results.map(role=> 
                ({ value: role.id, name: role.role_department })
            );
            // prompts to ask the user about the new employee that he wants to add
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the first name of the new employee?",
                    // validates that response is provided
                    validate: (answer) => {
                        if(answer = ""){
                            return "Employee first name is required";
                        }
                        return true;
                    }
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the last name of the new employee?",
                    // validates that response is provided
                    validate: (answer) => {
                        if(answer = ""){
                            return "Employee last name is required";
                        }
                        return true;
                    }
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What is the role of this employee?",
                    // lists all the existing roles along with the department the role is associated with, for the user to be able to select the role of this employee
                    choices: roleList
                },
                {
                    type: "confirm",
                    name: "hasManager",
                    message: "Does this employee have a manager?"
                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "Who is the manager of this employee?",
                    // question asked only if the employee has a manager and if there is at least one existing employee in the employee table in the database who could be assigned as the manager
                    when: answer => {
                        return answer.hasManager === false && managerList.length !== 0;
                    },
                    // lists all the existing employees for the user to be able to select the manager for the new employee
                    choices: managerList
                }
            ]).then((answers) => {
                // creates new instance of employee using user response
                const newEmployee = new Employee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
                // SQL query to insert the new record in the employee table in the database
                connection.query("INSERT INTO employee SET ?",
                    newEmployee,
                    function(err) {
                        if (err){
                            // shows a user friendly message to user
                            console.log("Sorry! The employee could not be added due to some problem. Please try again!\nError Details: ", err.sqlMessage);
                        } else {
                            console.log("The employee was successfully added!");
                        }
                        // restarts the question prompt
                        start(connection);
                    }
                )
            });
        });
    });
}

// this function allows the user to retrieve and view all the existing departments from the department table in the database
function viewDepartments(connection){
    // SQL query to retreive all the fields from the department table in the database
    connection.query("Select id, name AS department from department", function(err, results) {
        if (err) throw err;
        console.table(results);
        // restarts the question prompt
        start(connection);
    });
}

// this function allows the user to retrieve and view all the existing roles from the role table in the database
function viewRoles(connection){
    // SQL JOINs used to retreive the fields from the role and department table in the database
    connection.query("SELECT r.id, r.title as role, d.name AS department, r.salary FROM role AS r INNER JOIN department AS d on r.department_id = d.id", function(err, results) {
        if (err) throw err;
        console.table(results);
        // restarts the question prompt
        start(connection);
    });
}

// this function allows the user to retrieve and view all the existing employees from the employee table in the database
function viewEmployees(connection){
    // SQL JOINS used to retreive the fields from the employee, role and department table in the database
    connection.query('SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) as manager FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id', 
        function(err, results) {
            if (err) throw err;
            console.table(results);
            // restarts the question prompt
            start(connection);
        }
    );
}

// this function allows the user to update an employees role in the database
function updateEmployeeRole(connection){
    connection.query('SELECT CONCAT(e.first_name, " ", e.last_name) AS employee_name, e.id FROM employee AS e', function(error, results){
        if (error) throw error;
            // maps every row in the role table to an object that can be made available to inquirer choices
        const employeeList = results.map(employee=> 
            ({ value: employee.id, name: employee.employee_name })
        );
        connection.query('SELECT CONCAT(role.title, "-", department.name) AS role_department, role.id FROM role LEFT JOIN department ON role.department_id = department.id', function(err, results){
            if (err) throw err;
            // maps every row in the role table to an object that can be made available to inquirer choices
            const roleList = results.map(role=> 
                ({ value: role.id, name: role.role_department })
            );
            // prompts to ask the user about the employee and the new role that he wants to update his record with
            inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee_name",
                    message: "Which employee's role you want to update?",
                    // lists all the existing employees from the database
                    choices: employeeList
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What is the new role of this employee?",
                    // lists all the existing roles along with the department the role is associated with, for the user to be able to select the role of this employee
                    choices: roleList
                },
            ]).then((answers) => {
                // SQL query to update this employee's record in the employee table in the database
                connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        {
                            role_id: answers.role_id
                        },
                        {
                            id: answers.employee_name
                        }
                    ],
                    function(err) {
                        if (err){
                            // shows a user friendly message to user
                            console.log("Sorry! This employee's role could not be updated due to some problem. Please try again!\nError Details: ", err.sqlMessage);
                        } else {
                            console.log("This employee's role was successfully updated!");
                        }
                        // restarts the question prompt
                        start(connection);
                    }
                )
            });
        });
    });
}

// this function deletes a department from the department table in the database
function deleteDepartment(connection){
    connection.query("SELECT id, name FROM department", function(err, results){
        if (err) throw err;
        const departmentList = results.map(department => 
            ({value: department.id, name: department.name})
        );
        inquirer.prompt([
            {
                name: "name",
                type: "list",
                message: "Which department do you want to delete?",
                // lists all the existing departments in the database
                choices: departmentList
            }
        ]).then (answer => {
            // SQL query to delete the user entered department from the department table in the database
            connection.query(`DELETE from department WHERE id = ${answer.name}`, function(err, results){
                if (err) {
                    console.log("Sorry! The department could not be deleted due to some problem. Please try again!\nError Details: ", err.sqlMessage);
                } else {
                    console.log("The department was successfully deleted!");
                }
                // restarts the question prompt
                start(connection);
            })
                
        });
    })
}

// this function deletes a role from the role table in the database
function deleteRole(connection){
    connection.query('SELECT CONCAT(role.title, "-", department.name) AS role_department, role.id FROM role LEFT JOIN department ON role.department_id = department.id',function(err, results){
        if (err) throw err;
        const roleList = results.map(role => 
            ({value: role.id, name: role.role_department})
        );
        inquirer.prompt([
            {
                name: "title",
                type: "list",
                message: "Which role do you want to delete?",
                // lists all the existing roles along with the corresponding departments in the database
                choices: roleList
            }
        ]).then (answer => {
            // SQL query to delete the user entered role from the role table in the database
            connection.query(`DELETE from role WHERE id = ${answer.title}`, function(err, results){
                if (err) {
                    console.log("Sorry! The role could not be deleted due to some problem. Please try again!\nError Details: ", err.sqlMessage);
                } else {
                    console.log("The role was successfully deleted!");
                }
                // restarts the question prompt
                start(connection);
            })
                
        });
    })
}
// exporting the functions to make them available in server.js
module.exports = {
    addDepartment,
    addRole,
    addEmployee,
    viewDepartments,
    viewRoles,
    viewEmployees,
    updateEmployeeRole,
    deleteDepartment,
    deleteRole,
    start
};


/* If update employee manager, use SQL query to retrieve employee and manager names from employees table.
    Then ask additional inquirer questions:
    1. Which employee's manager you want to update.[choices]
    2. Who is the new manager of this employee? [choices]
    Do inquirer validations if needed.
        Using SQL query, get the employee id from the employees table based on the user provided employee name
        Using SQL query, get the manager id from the employees table based on the user provided name of the Manager
        Take the response and update the record in the Employees table*/

/* If view employees by manager, use sql query to console.table the employees table grouped by manager_id/name?*/


 /* If delete employees, additional inquirer questions:
    1. Which employee do you want to delete? [choices - retrieved first using SQL query]
    Based on the response, use SQL delete query to delete the corresponding record from the employees table. 

/* View budget of a department, additional inquirer questions:
    1. For which department do you want to view the utilized budget?
    Based on the response, use SQL JOINs to join role, department and employees tables and utilize aggregate functions to add the salaries of all employees belonging to a department*/