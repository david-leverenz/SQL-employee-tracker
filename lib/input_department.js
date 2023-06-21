// This file holds all of the questions called by the .prompt section of my init function. It exports "askQuestions".
const addDepartment = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department','Quit'],
        name: 'departmentName',
    },
]

module.exports = addDepartment;