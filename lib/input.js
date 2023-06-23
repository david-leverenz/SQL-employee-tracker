// This file holds all of the questions called by the .prompt section of my init function. It exports several modules.

const askQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add New Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department','Update Employee Manager', 'View Employees By Manager','View Employees By Department','Remove Employee', 'Quit'],
        name: 'queryName',
    },
]

module.exports = askQuestions;