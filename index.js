// These enable fs and inquirer.  They also identify the other files needed and create constants for those files.
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./server.js');

const askQuestions = require('./lib/input.js');
// const addEmployee = addEmployee('./lib/input.js');



function init() {
    inquirer
        .prompt(askQuestions)
        .then
        ((data) => {
            let choice = data.queryName;
            // console.log(choice);
            if (choice === "View All Employees") {
                viewAllEmployees();
            } else if (choice === "Add New Employee") {
                newEmp();
            } else if (choice === "Update Employee Role") {
                updateRole();
            } else if (choice === "View All Roles") {
                viewAllRoles();
            } else if (choice === "Add Role") {
                addRole();
            } else if (choice === "View All Departments") {
                viewAllDepartments();
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
    LEFT JOIN employee AS e2 ON e1.manager_id = e2.id ORDER BY e1.last_name`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

const newEmp = () => {
    connection.query('SELECT * FROM role ORDER BY title', (err, data) => {
        const rolesList = data.map(role => ({ name: role.title, value: role.id }));
        connection.query('SELECT DISTINCT distinct e1.id, e1.last_name from employee AS e1 JOIN employee AS e2 WHERE e2.manager_id = e1.id ORDER BY e1.last_name', (err, managerData) => {
            const managerList = managerData.map(manager => ({ name: manager.last_name, value: manager.id }))

            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: "What is the employee's first name?",
                        name: 'employeeFirstName',
                    },
                    {
                        type: 'input',
                        message: "What is the employee's last name?",
                        name: 'employeeLastName',
                    },
                    {
                        type: 'list',
                        message: "What is the employee's role?",
                        choices: rolesList,
                        name: 'employeeRole',
                    },
                    {
                        type: 'list',
                        message: "Who is the employee's manager?",
                        choices: managerList,
                        name: 'employeeManager',
                    }
                ])
                .then
                ((data) => {
                    console.log(data)
                    connection.query("INSERT into employee SET ?", { first_name: data.employeeFirstName, last_name: data.employeeLastName, role_id: data.employeeRole, manager_id: data.employeeManager }, (err, data) => {
                        if (err) console.log(err)
                        init()
                    })
                })
        })
    });
}

const updateRole = () => {
    connection.query('SELECT * FROM employee ORDER BY last_name', (err, data) => {
        const employeeList = data.map(employee => ({ name: `${employee.last_name}, ${employee.first_name}`, value: employee.id }));
        connection.query('SELECT * FROM role ORDER BY title', (err, rolesData) => {
            const rolesList = rolesData.map(roles => ({ name: roles.title, value: roles.id }));

            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: "Which employee's role do you want to update?",
                        choices: employeeList,
                        name: 'employeeSelect',
                    },
                    {
                        type: 'list',
                        message: "Which role do you want to assign the selected employee?",
                        choices: rolesList,
                        name: 'newRole',
                    }
                ])
                .then
                ((data) => {
                    console.log(data)
                    connection.query(`UPDATE employee SET role_id = ${data.newRole} WHERE id = ${data.employeeSelect}`, (err, data) => {
                        if (err) console.log(err)
                        init()
                    })
                })
        })
    });




}

const viewAllRoles = () => {
    let sql = `SELECT DISTINCT title AS "Current Roles" FROM role ORDER BY title`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });

}

const addRole = () => {
    connection.query('SELECT * FROM department ORDER BY name', (err, data) => {
        const deptList = data.map(dept => ({ name: dept.name, value: dept.id }));

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role?',
                    name: 'roleName',
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'roleSalary',
                },
                {
                    type: 'list',
                    message: 'What department for the role belong to?',
                    choices: deptList,
                    name: 'roleDepartment',
                }
            ])
            .then
            ((data) => {
                console.log(data)
                connection.query("INSERT INTO role SET ?", { department_id: data.roleDepartment, title: data.roleName, salary: data.roleSalary }, (err, data) => {
                    if (err) console.log(err)
                    init()
                })
            })
    })
};

const viewAllDepartments = () => {
    let sql = `SELECT DISTINCT name AS "Current Departments" FROM department ORDER BY name`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });

}

const addDepartment = () => {
    connection.query('SELECT * FROM department ORDER BY name', (err, data) => {
        const deptList = data.map(dept => ({ name: dept.name, value: dept.id }));

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the department?',
                    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
                    name: 'departmentName',
                },
            ])
            .then
            ((data) => {
                console.log(data)
                connection.query("INSERT INTO role SET ?", { department_id: data.roleDepartment, title: data.roleName, salary: data.roleSalary }, (err, data) => {
                    if (err) console.log(err)
                    init()
                })
            })
    })
};
