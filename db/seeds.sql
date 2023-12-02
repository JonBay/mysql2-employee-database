INSERT INTO department (name)
VALUES ("Customer Service"),
       ("Sales"),
       ("Marketing"),
       ("Operations"),
       ("Finance"),
       ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("CX Agent", 35000, 1),
       ("CX Manager", 50000, 1),
       ("Sales Representative", 45000, 2),
       ("Sales Manager", 60000, 2),
       ("Marketing Specialist", 48000, 3),
       ("Marketing Manager", 55000, 3),
       ("Operations Associate", 40000, 4),
       ("Operations Manager", 60000, 4),
       ("Financial Analyst", 55000, 5),
       ("Finance Manager", 70000, 5),
       ("IT Support Specialist", 45000, 6),
       ("IT Manager", 65000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jane", "Smith", 2, 1),
       ("Mike", "Johnson", 3, 2),
       ("Emily", "Williams", 4, 2),
       ("Chris", "Anderson", 5, 3),
       ("Sara", "Taylor", 6, 3),
       ("Mark", "Brown", 7, 4),
       ("Anna", "Clark", 8, 4),
       ("David", "Jones", 9, 5),
       ("Jessica", "Moore", 10, 5),
       ("Brian", "Miller", 11, 6),
       ("Rachel", "White", 12, 6);