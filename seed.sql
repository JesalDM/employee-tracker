INSERT INTO department(name)
VALUES ("IT"), ("Finance"), ("Marketing"), ("Accounts");

INSERT INTO role(title, salary, department_id)
VALUES ("Developer", 105000, 1), 
("QA", 70000, 1), 
("Sales Associate", 50000, 3), 
("Credit Analyst", 68000, 2),
("Auditor", 45000, 4),
("BA", 80000, 1),
("BA", 60000, 2);


INSERT INTO employee(first_name, last_name, role_id)
VALUES ("Abbey", "Thompson", 3),
("Josh", "Coleman", 5),
("Sharon", "Albright", 7),
("Sunny", "Troy", 4),
("Karen", "Ginsberg", 7),
("Scott", "Orme", 1),
("Amy", "Florez", 5),
("Jennifer", "Black", 2),
("Shaun", "Epstein", 3);

UPDATE employee 
SET manager_id = 2 WHERE id = 1;
UPDATE employee 
SET manager_id = 3 WHERE id = 2;
UPDATE employee 
SET manager_id = 3 WHERE id = 4;
UPDATE employee 
SET manager_id = 7 WHERE id = 5;
UPDATE employee 
SET manager_id = 2 WHERE id = 6;
UPDATE employee 
SET manager_id = 3 WHERE id = 8;
UPDATE employee 
SET manager_id = 7 WHERE id = 9;