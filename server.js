const inquirer = require("inquirer");
const db = require("./config/connection");

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
          db.end();
    }
    });
};

//now I need to create functions to return the data



options();