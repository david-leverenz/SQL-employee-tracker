-- I can reset my database and tables by executing this page
DROP DATABASE IF EXISTS employee_tracker;
create database employee_tracker;
use employee_tracker;

-- The ids in each of these tables are required, auto-increment and are primary.
create table department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)

);

-- These tables have foreign keys that link them to each other.  This foreign key links table role to the id in table department.
create table role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

-- This foreign key links table employee to the id in table role.
create table employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    manager_id INT
);

select department.id, department.name, sum(role.salary) AS total_budget FROM employee left join role on employee.role_id = role.id left join department on role.department_id = department.id group by department.id, department.name;