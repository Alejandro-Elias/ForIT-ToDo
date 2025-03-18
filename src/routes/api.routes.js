const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/controller');

router
    .get('/tasks', getTasks)
    .post('/tasks', createTask)
    .put('/tasks/:id', updateTask)
    .delete('/tasks/:id', deleteTask)

module.exports = router;
