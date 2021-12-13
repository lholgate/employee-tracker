const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// View all Departments
router.get('/departments', (req, res) => {
  const sql = `SELECT id AS department_id, name AS department_name
               FROM department
               ORDER BY id ASC`;

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

// view Department Budget
router.get('/department/:id', (req, res) => {
  const sql = `SELECT department.name AS department_name, sum(role.salary) AS department_budget
               FROM department 
               LEFT JOIN role 
               ON role.department_id = department.id 
               LEFT JOIN employee
               on employee.role_id = role.id 
               WHERE department.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Create a department
router.post('/department', ({ body }, res) => {

  const sql = `INSERT INTO department (name) VALUES (?)`;
  const params = [
    body.name
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});


// Delete a deparment
router.delete('/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
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
