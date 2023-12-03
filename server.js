const inquirer = require("inquirer");
const db = require("./config/connection");

const startApp = () => {
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      process.exit(1);
    }

    console.log("Connected to the database!");
    options();
  });
};

const options = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "response",
        choices: [
          {
            name: "View all departments.",
            value: "viewAllDepartments",
          },
          {
            name: "View all roles.",
            value: "viewAllRoles",
          },
          {
            name: "View all employees.",
            value: "viewAllEmployees",
          },
          {
            name: "Add a department.",
            value: "addDepartment",
          },
          {
            name: "Add a role.",
            value: "addRole",
          },
          {
            name: "Add an employee.",
            value: "addEmployee",
          },
          {
            name: "Update an employee role.",
            value: "updateEmployeeRole",
          },
          {
            name: "Exit application.",
            value: "exit",
          },
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      switch (response.response) {
        case "viewAllDepartments":
          viewAllDepartments();
          break;
        case "viewAllRoles":
          viewAllRoles();
          break;
        case "viewAllEmployees":
          viewAllEmployees();
          break;
        case "addDepartment":
          addDepartment();
          break;
        case "addRole":
          addRole();
          break;
        case "addEmployee":
          addEmployee();
          break;
        case "updateEmployeeRole":
          updateEmployeeRole();
          break;
        default:
          closeConnection();
      }
    });
};

//now I need to create functions to return the data
const viewAllDepartments = () => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.log("\nHere are all the departments...");
    console.table(results);
  });
  options();
};

const viewAllRoles = () => {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.log("\nHere are all the roles...");
    console.table(results);
  });
  options();
};

const viewAllEmployees = () => {
  db.query(
    "SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id",
    (err, results) => {
      if (err) throw err;
      console.log("\nHere are all the employees...");
      console.table(results);
    }
  );
  options();
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department?",
        name: "departmentName",
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [response.departmentName],
        (err, results) => {
          if (err) throw err;
          console.log("Action Successful! Your new department has been added.");
          options();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the new role?",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "What is the salary of the new role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department ID for this new role?",
        name: "department",
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [response.roleTitle, response.salary, response.department],
        (err, results) => {
          if (err) throw err;
          console.log("Action Successful! Your new role has been added.");
          options();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the new employee?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the last name of the new employee?",
        name: "lastName",
      },
      {
        type: "input",
        message: "What is the ID of the role this new employee will be in?",
        name: "roleId",
      },
      {
        type: "input",
        message:
          "What is the employee ID of the manager for this new employee?",
        name: "managerId",
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          response.firstName,
          response.lastName,
          response.roleId,
          response.managerId,
        ],
        (err, results) => {
          if (err) throw err;
          console.log("Action Successful! Your new employee has been added.");
          options();
        }
      );
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "What is the ID of the employee you will be changing roles for? ",
        name: "employeeId",
      },
      {
        type: "input",
        message: "What is the ID of the role this employee will be changed to?",
        name: "roleId",
      },
    ])
    .then((response) => {
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [parseInt(response.roleId), parseInt(response.employeeId)],
        (err, results) => {
          if (err) throw err;
          console.log("Action Successful! Employee role has been updated.");
          options();
        }
      );
    });
};

const closeConnection = () => {
  db.end((err) => {
    if (err) {
      console.error("Error closing the database connection:", err);
    } else {
      console.log("Connection closed.");
    }
    process.exit(0);
  });
};

startApp();
