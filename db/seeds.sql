INSERT INTO department
  (name)
VALUES
  ('Department 1'),
  ('Department 2'),
  ('Department 3'),
  ('Department 4');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Manager', 100000.00,1),
  ('Programmer', 75000.00,2),
  ('Engineer', 75000.00,3),
  ('Consultant', 50000.00,4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 2),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 2, 2),
  ('Katherine', 'Mansfield', 3, 1),
  ('Dora', 'Carrington', 3, 2),
  ('Edward', 'Bellamy', 4, 1),
  ('Montague', 'Summers', 4, 2),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 3, 1);
  