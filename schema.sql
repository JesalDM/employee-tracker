-- deletes database if it already exists
DROP DATABASE IF EXISTS employee_TrackerDB;

-- creates database
CREATE DATABASE employee_TrackerDB;

-- creates the following 3 tables in this database
USE employee_TrackerDB;

-- creates table 'department' with 2 columns
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
  );
 
-- creates table 'role' with 4 columns
CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
  );

-- creates table 'employee' with 5 columns
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL
);