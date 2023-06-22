// This file holds all of the questions called by the .prompt section of my init function. It exports several modules.

const askQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add New Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department','Quit'],
        name: 'queryName',
    },
]

// const addEmployee = [
//     {
//         type: 'input',
//         message: "What is the employee's first name?",
//         name: 'employeeFirstName',
//     },
//     {
//         type: 'input',
//         message: "What is the employee's last name?",
//         name: 'employeeLastName',
//     },
//     {
//         type: 'list',
//         message: "What is the employee's role?",
//         choices: ["rolesList"],
//         name: 'employeeRole',
//     },
//     {
//         type: 'list',
//         message: "Who is the employee's manager?",
//         choices: ["1","2","3"],
//         name: 'employeeManager',
//     }
// ]

// function addNewEmployee(rolesList) {
   
//     inquirer
//         .prompt(addEmployee)
//         .then
//         ((data) => {
//             console.log(data);
//         })
// }

// const changeRole = [
//     {
//         type: 'list',
//         message: "Which employee's role do you want to update?",
//         // choices: [] this is going to be a query of employee table
//         name: 'employeeSelect',
//     },
//     {
//         type: 'list',
//         message: "Which role do you want to assign the selected employee?",
//         // choices: [] this is going to be a query of role table
//         name: 'newRole',
//     }
// ]

// const addRole = [
//     {
//         type: 'input',
//         message: 'What is the name of the role?',
//         name: 'roleName',
//     },
//     {
//         type: 'input',
//         message: 'What is the salary of the role?',
//         name: 'roleSalary',
//     },
//     {
//         type: 'list',
//         message: 'What department for the role belong to?',
//         // choices: [] this is going to be a query of department table
//         name: 'roleDepartment',
//     }
// ]

// const addDepartment = [
//     {
//         type: 'input',
//         message: 'What is the name of the department?',
//         choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department','Quit'],
//         name: 'departmentName',
//     },
// ]

// module.exports = { askQuestions, addEmployee, changeRole, addRole, addDepartment }
module.exports = askQuestions;