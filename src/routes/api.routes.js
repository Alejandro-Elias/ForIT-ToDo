const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/controller');
const validateTaskForm = require('../validation/validateTaskForm');

router.use((req, res, next) => {
    const apiKey = req.headers.authorization;
    
        
    if (!apiKey || apiKey !== "Bearer " + process.env.API_KEY) {
        return res.status(401).json({ error: 'Api key invalida' });
    }
    next()
});

router
    .get('/tasks', getTasks)
    .post('/tasks', validateTaskForm(), createTask)
    .put('/tasks/:id', validateTaskForm(), updateTask)
    .delete('/tasks/:id', deleteTask)

module.exports = router;
