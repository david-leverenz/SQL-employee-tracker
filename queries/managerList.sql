select e1.id, e1.last_name from employee AS e1
JOIN employee AS e2 WHERE e2.manager_id = e1.id;