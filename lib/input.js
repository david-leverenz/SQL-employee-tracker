// This file holds all of the questions called by the .prompt section of my init function. It exports "askQuestions".
const askQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department','Quit'],
        name: 'queryName',
    },
]

module.exports = askQuestions;