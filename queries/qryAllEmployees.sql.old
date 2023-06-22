select e1.id AS "Employee ID", e1.first_name AS "Employee First", e1.last_name AS "Employee Last", role.title AS "Employee Title", department.name AS "Department", role.salary AS "Employee Salary", CONCAT_WS(" ", e2.first_name, e2.last_name) AS 'Manager Name'
FROM employee AS e1
JOIN role ON e1.role_id = role.id
JOIN department on role.department_id = department.id
LEFT JOIN employee AS e2 ON e1.manager_id = e2.id;