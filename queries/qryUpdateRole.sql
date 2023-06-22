UPDATE employee
SET role_id = 1
WHERE id = 2
JOIN role ON employee.role_id = role.id;