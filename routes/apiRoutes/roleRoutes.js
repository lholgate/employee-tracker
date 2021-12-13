const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all roles with departments
router.get('/role', (req, res) => {
  const sql = `SELECT role.title AS job_title,
                      role.id AS role_id,
                      department.name AS department_name,
                      role.salary AS role_salary 
               FROM role 
               LEFT JOIN department
               ON department.id = role.department_id
               ORDER BY role.id ASC;`;

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

// Create a role
router.post('/role', ({ body }, res) => {

  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
  const params = [
    body.title,
    body.salary,
    body.department_id
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

// Delete a role
router.delete('/role/:id', (req, res) => {
  const sql = `DELETE FROM role WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
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
