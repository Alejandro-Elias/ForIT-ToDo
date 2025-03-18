const fs = require("fs");
const path = require("path");

const tareasFilePath = path.join(__dirname, "../../data/tareas.json");

let tareas = JSON.parse(fs.readFileSync(tareasFilePath, "utf-8"));

getTasks = (req, res) => {    
      res.json({ message: "Obteniendo todas las tareas", tareas });
};

createTask = (req, res) => {
    const { title, description, completed, createdAt} = req.body;

    const nuevaTarea = {
      id: tareas ? tareas.task[tareas.task.length - 1 ].id + 1 : 1,
      title,
      description,
      completed,
      createdAt,
    }
  
      tareas.task.push(nuevaTarea);
      fs.writeFileSync(tareasFilePath, JSON.stringify(tareas, null, 2), "utf-8");
  
      res.json({ message: "Obteniendo todas las tareas", tareas });
};

updateTask = (req, res) => {
  const { title, description, completed, createdAt } = req.body;
  const id = req.params.id;

    tareas.task = tareas.task.map((tarea) =>
        tarea.id == id
        ? {
            id,
            title,
            description,
            completed,
            createdAt,
            }
        : tarea
    );

    fs.writeFileSync(tareasFilePath, JSON.stringify(tareas, null, 2), "utf-8");
    res.json({ message: "Actualizando Tarea", tareas });
};

deleteTask = (req, res) => {
    const id = req.params.id;
    
    tareas.task = tareas.task.filter((tarea) => tarea.id != id);
    
    fs.writeFileSync(tareasFilePath, JSON.stringify(tareas, null, 2), "utf-8");
    res.json({ message: "Eliminando Tarea", tareas });  
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
