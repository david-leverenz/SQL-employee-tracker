// These enable fs and inquirer.  They also identify the other files needed and create constants for those files.
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./server.js');

const askQuestions = require('./lib/input.js');


function init() {
    inquirer
        .prompt(askQuestions)
        .then
        ((data) => {
            let choice = data.queryName;
            // console.log(choice);
            if (choice === "View All Employees") {
                viewAllEmployees();
            } else if (choice === "Add Employee") {
                console.log("run add employee function")
            } else if (choice === "Update Employee Role") {
                console.log("run update employee role function")
            } else if (choice === "View All Roles") {
                console.log("run view all roles query");
            } else if (choice === "Add Role") {
                console.log("run add role function");
            } else if (choice === "View All Departments") {
                console.log("run query view all departments");
            } else if (choice === "Add Department") {
                console.log("run add department function");
            } return
        })
}

init()

// View All Employees
const viewAllEmployees = () => {
    let sql = `SELECT e1.id AS "Employee ID", e1.first_name AS "Employee First", e1.last_name AS "Employee Last", role.title AS "Employee Title", department.name AS "Department", role.salary AS "Employee Salary", CONCAT_WS(" ", e2.first_name, e2.last_name) AS "Manager Name" 
    FROM employee AS e1
    JOIN role ON e1.role_id = role.id
    JOIN department on role.department_id = department.id
    LEFT JOIN employee AS e2 ON e1.manager_id = e2.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log(res);
        init();
    })
};