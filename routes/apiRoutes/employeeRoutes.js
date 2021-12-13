const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get the employee ids, first names, last names, job titles, departments, salaries, and managers
router.get('/employees', (req, res) => {
  const sql = `SELECT employee.id,
                      employee.first_name,
                      employee.last_name,
                      role.title,
                      department.name,
                      role.salary,
                      CONCAT(manager.first_name,' ', manager.last_name) AS manager
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id
               LEFT JOIN department ON role.department_id = department.id
               LEFT JOIN employee AS manager on employee.manager_id = manager.id
               ORDER BY employee.id ASC`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get the employees by manager
router.get('/employeesByManager/:id', (req, res) => {
  const sql = `SELECT employee.id,
                      employee.first_name,
                      employee.last_name,
                      role.title,
                      department.name,
                      role.salary,
                      CONCAT(manager.first_name,' ', manager.last_name) AS manager
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id
               LEFT JOIN department ON role.department_id = department.id
               LEFT JOIN employee AS manager on employee.manager_id = manager.id
               WHERE employee.manager_id = ? `;
      
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get the employees by department
router.get('/employeesByDepartment/:id', (req, res) => {
  const sql = `SELECT employee.id,
                      employee.first_name,
                      employee.last_name,
                      role.title,
                      department.name,
                      role.salary,
                      CONCAT(manager.first_name,' ', manager.last_name) AS manager
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id
               LEFT JOIN department ON role.department_id = department.id
               LEFT JOIN employee AS manager on employee.manager_id = manager.id
               where role.department_id = ? `;

  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Create an employee
router.post('/employee', ({ body }, res) => {
  
  const sql = `INSERT INTO votes (first_name, last_name, fole_id, manager_id) VALUES (?,?,?,?)`;
  const params = [body.first_name, 
                  body.last_name,
                  body.role_id,
                  body.manager_id
                 ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});

// Update employee role
router.post('/employeeRole', ({ body }, res) => {
  
  const sql = `UPDATE employee set role_id = ? where id = ?`;
  const params = [body.role_id, 
                  body.employee_id
                 ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});


// Update employee manager
router.post('/employeeManager', ({ body }, res) => {
  
  const sql = `UPDATE employee set manager_id = ? where id = ?`;
  const params = [body.manager_id, 
                  body.employee_id
                 ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});

// Delete a role
router.delete('/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

module.exports = router;
