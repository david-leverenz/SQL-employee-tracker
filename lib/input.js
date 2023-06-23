// This file holds the jumping off point for my application .prompt section of my init function.  Originally I had all of the prompt questions in here and planned to call them when needed but ran into an issue where I need to collect information and use it later and it was getting dropped because of this setup :(

const askQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add New Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department','Update Employee Manager', 'View Employees By Manager','View Employees By Department','Remove Employee', 'Budgets By Department','Quit'],
        name: 'queryName',
    },
]

module.exports = askQuestions;