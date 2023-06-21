// This file holds all of the questions called by the .prompt section of my init function. It exports "askQuestions".
const changeRole = [
    {
        type: 'list',
        message: "Which employee's role do you want to update?",
        // choices: [] this is going to be a query of employee table
        name: 'employeeSelect',
    },
    {
        type: 'list',
        message: "Which role do you want to assign the selected employee?",
        // choices: [] this is going to be a query of role table
        name: 'newRole',
    }
]

module.exports = changeRole;