// These enable fs and inquirer.  They also identify the other files needed and create constants for those files.
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./server.js');
const askQuestions = require('./lib/input.js');

// This introduces the program and launches the init() file
connection.connect((error) => {
    if (error) throw error;
    console.log(``);
    console.log("        o8%8888,    ")
    console.log("      o88%8888888.  ")
    console.log("     8'-    -:8888b   ")
    console.log("    8'         8888  ")
    console.log("   d8.-=. ,==-.:888b  ")
    console.log("   >8 `~` :`~' d8888   EMPLOYEE TRACKER")
    console.log("   88         ,88888   Created By: David Leverenz")
    console.log("   88b. `-~  ':88888  ")
    console.log("   888b ~==~ .:88888 ")
    console.log("   88888o--:':::8888      ")
    console.log("   `88888| :::' 8888b  ")
    console.log("   8888^^'       8888b  ")
    console.log("  d888           ,%888b.   ")
    console.log(" d88%            %%%8--'-.  ")
    console.log("/88:.__ ,       _%-' ---  -  ")
    console.log("    '''::===..-'   =  --.")
    console.log("")
    init()
});

// This is my init() function that controls the application.  I know that most people used the "switch" function, I used a big if statement because I couldn't get switch to work and I needed to started coding.  Essentially, if what a user selected from the prompted input in input.js matches a clause in the if statement, I run a function to do what needs to be done.
function init() {
    inquirer
        .prompt(askQuestions)
        .then
        ((data) => {
            let choice = data.queryName;
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
                addDepartment();
            } else if (choice === "Update Employee Manager") {
                updateEmployeeManager();
            } else if (choice === "View Employees By Manager") {
                viewEmployeesByManager();
            } else if (choice === "View Employees By Department") {
                viewEmployeesByDepartment();
            } else if (choice === "Remove Employee") {
                deleteEmployee();
            } else if (choice === "Budgets By Department") {
                departmentBudget();
            } else if (choice === "Quit") {
                process.exit(0);
            } return
        })
}

// These are the functions that are called by the above.  If I need to get user input I use inquirer to gather data.  Then I use either an INSERT, SELECT, UPDATE, DELETE, etc. query to make it happen.  I had planned to modularize the entire application but couldn't due to time constraints.  Each function follows roughly the same pattern.
const viewAllEmployees = () => {
    let sql = `SELECT e1.id AS "ID", e1.first_name AS "First", e1.last_name AS "Last", role.title AS "Title", department.name AS "Department", role.salary AS "Salary", CONCAT_WS(" ", e2.first_name, e2.last_name) AS "Manager" 
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

// This requirement was tricky because I needed to run two queries and keep their variables available for later use.  I wouldn't recommend nesting queries because I spent a lot of time trying to figure out where a closing parenthesis should go.  Unfortunately my design dictated nesting so I made it work.
const newEmp = () => {
    connection.query('SELECT * FROM role ORDER BY title', (err, data) => {
        const rolesList = data.map(role => ({ name: role.title, value: role.id }));
        connection.query('SELECT e1.id, e1.last_name, e1.first_name from employee AS e1 ORDER BY e1.last_name', (err, managerData) => {
            const managerList = managerData.map(manager => ({ name: `${manager.last_name}, ${manager.first_name}`, value: manager.id }));

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
                    connection.query("INSERT into employee SET ?", { first_name: data.employeeFirstName, last_name: data.employeeLastName, role_id: data.employeeRole, manager_id: data.employeeManager }, (err, data) => {
                        if (err) console.log(err)
                        init()
                    })
                })
        })
    });
}

// Update query used in this one.
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
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'departmentName',
            },
        ])
        .then
        ((data) => {
            connection.query("INSERT INTO department SET ?", { name: data.departmentName }, (err, data) => {
                if (err) console.log(err)
                init()
            })
        })
}

const updateEmployeeManager = () => {
    connection.query('SELECT * FROM employee ORDER BY last_name', (err, data) => {
        const employeeList = data.map(employee => ({ name: `${employee.last_name}, ${employee.first_name}`, value: employee.id }));
        connection.query('SELECT e1.id, e1.last_name, e1.first_name from employee AS e1 ORDER BY e1.last_name', (err, managerData) => {
            const managerList = managerData.map(manager => ({ name: `${manager.last_name}, ${manager.first_name}`, value: manager.id }));
            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: "Which employee's manager do you want to update?",
                        choices: employeeList,
                        name: 'employeeSelect',
                    },
                    {
                        type: 'list',
                        message: "Who should be the new manager?",
                        choices: managerList,
                        name: 'newManager',
                    }
                ])
                .then
                ((data) => {
                    connection.query(`UPDATE employee SET manager_id = ${data.newManager} WHERE id = ${data.employeeSelect}`, (err, data) => {
                        if (err) console.log(err)
                        init()
                    })
                })
        })
    });
}

const viewEmployeesByManager = () => {
    connection.query('SELECT DISTINCT distinct e1.id, e1.last_name, e1.first_name from employee AS e1 JOIN employee AS e2 WHERE e2.manager_id = e1.id ORDER BY e1.last_name', (err, managerData) => {
        const managerList = managerData.map(manager => ({ name: `${manager.last_name}, ${manager.first_name}`, value: manager.id }))

        inquirer
            .prompt([
                {
                    type: 'list',
                    message: "Select a manager name below to view their employees.",
                    choices: managerList,
                    name: 'employeeManager',
                }
            ])
            .then
            ((data) => {
                connection.query(`SELECT last_name AS "Employee Last" FROM employee WHERE manager_id = ${data.employeeManager} ORDER BY last_name`, (err, data) => {
                    if (err) console.log(err);
                    console.table(data)
                    init()
                })
            })
    })
}

const viewEmployeesByDepartment = () => {
    connection.query('SELECT * FROM department', (err, deptData) => {
        const deptList = deptData.map(dept => ({ name: dept.name, value: dept.id }))

        inquirer
            .prompt([
                {
                    type: 'list',
                    message: "Select a department name below to view its employees.",
                    choices: deptList,
                    name: 'deptName',
                }
            ])
            .then
            ((data) => {
                connection.query(`SELECT last_name AS "Last Name" FROM employee JOIN role ON role_id = role.id WHERE department_id = ${data.deptName}`, (err, data) => {
                    if (err) console.log(err);
                    console.table(data)
                    init()
                })
            })
    })

}

const deleteEmployee = () => {
    connection.query('SELECT * FROM employee ORDER BY last_name', (err, data) => {
        const employeeList = data.map(employee => ({ name: `${employee.last_name}, ${employee.first_name}`, value: employee.id }));
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: "Which employee do you want to remove?",
                    choices: employeeList,
                    name: 'employeeSelect',
                },
            ])
            .then
            ((data) => {
                connection.query(`DELETE FROM  employee WHERE id = ${data.employeeSelect}`, (err, data) => {
                    if (err) console.log(err);
                    console.log("Removed");
                    init()
                })
            })
    })
};

const departmentBudget = () => {
    let sql = `SELECT department.id, department.name, sum(role.salary) AS total_budget FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.id, department.name;`
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}