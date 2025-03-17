const express = require('express');
const router = express.Router();

router.get('/tasks', (req, res) => {
    res.json({ message: 'Obteniendo todas las tareas' });
});

router.post('/tasks', (req, res) => {
    res.json({ message: 'Creando una nueva tarea' });
});

router.put('/tasks/:id', (req, res) => {
    res.json({ message: `Actualizando la tarea con ID ${req.params.id}` });
});

router.delete('/tasks/:id', (req, res) => {
    res.json({ message: `Eliminando la tarea con ID ${req.params.id}` });
});

module.exports = router;
