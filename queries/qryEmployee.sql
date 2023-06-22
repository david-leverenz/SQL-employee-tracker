INSERT INTO employee AS e1 (first_name, last_name, role_id, manager_id)
VALUES ("first_name","last_name","role_id","manager_id")
JOIN department AS d1 on role.department_id = d1.id;

