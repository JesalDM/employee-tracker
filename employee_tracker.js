// inquirer question prompt - what do you want to do? (choices - add departments, add roles, add employees, view departments, view roles, view employees, update employee roles, exit)

/* If add departments,then Inquirer prompt for additional question:
    1. What is the name of the department that you want to add?
    Do inquirer validations 
    Take the response and insert the record in the Department table*/

/* If add roles, use SQL query to retrieve the department names from department table 
   Then ask additional inquirer questions:
    1. What is the title of the role that you want to add?
    2. Which department does the role belong to? (choices retrieved using sql query before the questions)
    3. What is the salary that an employee in this role would be paid?
    Do inquirer validations 
    Using SQL query, get the department id from the department table based on the user provided department name
    Take the response and insert the record in the Roles table*/

    
/* If add employees, use SQL query to retrieve the role titles and managers from roles table 
   Then ask additional inquirer questions:
    1. What is the first name of the employee?
    2. What is the last name of the employee?
    3. What is the role title of the employee? [choices]
    4. Is this employee a manager? [choices - Yes, No]
    5. (if yes) Who is the manager of this employee? [choices]
    Do inquirer validations
    Using SQL query, get the role id from the role table based on the user provided role title
    Using SQL query, get the manager id from the employees table based on the user provided name of the Manager
    Take the response and insert the record in the Employees table*/

/* If view departments, use sql query to console.table the departments table*/

/* If view roles, use sql query to console.table the roles table*/

/* If view employees, use sql query to console.table the employees table*/

/* If update employee roles, use SQL query to retrieve the role, employee and manager names from employees table.
    Then ask additional inquirer questions:
    1. Which employee's role you want to update? [choices]
    2. What is the new role title of this employee? [choices]
    3. Do you want to update the manager of this employee as well? (choices - Yes, No)
    4. (If yes) Who is the new manager of this employee?
    Do inquirer validations if needed
        Using SQL query, get the role id from the role table based on the user provided employee name
        Using SQL query, get the manager id from the employees table based on the user provided name of the Manager
        Take the response and update the record in the Employees table*/

/* If update employee manager, use SQL query to retrieve employee and manager names from employees table.
    Then ask additional inquirer questions:
    1. Which employee's manager you want to update.[choices]
    2. Who is the new manager of this employee? [choices]
    Do inquirer validations if needed.
        Using SQL query, get the employee id from the employees table based on the user provided employee name
        Using SQL query, get the manager id from the employees table based on the user provided name of the Manager
        Take the response and update the record in the Employees table*/

/* If view employees by manager, use sql query to console.table the employees table grouped by manager_id/name?*/

/* If delete departments, additional inquirer questions:
    1. Which department do you want to delete? [choices - retrieved first using SQL query]
    Based on the response, use SQL delete query to delete the corresponding record from the departments table. What about that department mapped to the role table?

 /* If delete roles, additional inquirer questions:
    1. Which role title do you want to delete? [choices - retrieved first using SQL query]
    Based on the response, use SQL delete query to delete the corresponding record from the roles table. What about that role mapped to the employee table?

 /* If delete employees, additional inquirer questions:
    1. Which employee do you want to delete? [choices - retrieved first using SQL query]
    Based on the response, use SQL delete query to delete the corresponding record from the employees table. 

/* View budget of a department, additional inquirer questions:
    1. For which department do you want to view the utilized budget?
    Based on the response, use SQL JOINs to join role, department and employees tables and utilize aggregate functions to add the salaries of all employees belonging to a department*/