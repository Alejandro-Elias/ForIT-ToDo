const fs = require("fs");
const path = require("path");

const data = process.env.DATA_FILE;

const tareasFilePath = path.join(__dirname, data);

let tareas = JSON.parse(fs.readFileSync(tareasFilePath, "utf-8"));

const getTasks = (req, res) => {
  return res.status(200).json({
    ok: true,
    meta: {
      total: tareas.task.length,
      status: 200,
      message: "Obteniendo todas las tareas",
      tareas: tareas.task,
    },
  });
};

const createTask = (req, res) => {
  const { title, description, completed, createdAt } = req.body;

  if (
    !title ||
    !description ||
    completed.length == 0
  ) {
    return res.status(400).json({
      ok: false,
      meta: {
        total: 0,
        status: 400,
        message: "Faltan datos",
      },
    });
  } else {
    try {
      const nuevaTarea = {
        id:
          tareas && tareas.task.length > 0
            ? tareas.task[tareas.task.length - 1].id + 1
            : 1,
        title,
        description,
        completed,
        createdAt,
      };

      tareas.task.push(nuevaTarea);

      fs.writeFileSync(
        tareasFilePath,
        JSON.stringify(tareas, null, 2),
        "utf-8"
      );

      return res.status(200).json({
        ok: true,
        meta: {
          total: tareas.task.length,
          status: 200,
          message: "Obteniendo todas las tareas",
          tareas,
        },
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        meta: {
          total: 0,
          status: 500,
          message: "Error al crear la tarea",
          error,
        },
      });
    }
  }
};

const updateTask = (req, res) => {
  const { title, description, completed } = req.body;
  const id = parseInt(req.params.id);

  
    try {
      const taskIndex = tareas.task.findIndex(tarea => tarea.id === id);
      if (taskIndex === -1) {
        return res.status(404).json({
          ok: false,
          meta: {
            total: 0,
            status: 404,
            message: "Tarea no encontrada",
          },
        });
      }

      console.log(tareas)

      tareas.task[taskIndex] = {
              id: tareas.task[taskIndex].id,
              title: title ? title : tareas.task[taskIndex].title,
              description: description ? description : tareas.task[taskIndex].description,
              completed: typeof completed !== "undefined" ? completed : tareas.task[taskIndex].completed,
              createdAt: tareas.task[taskIndex].createdAt,
            }



      fs.writeFileSync(
        tareasFilePath,
        JSON.stringify(tareas, null, 2),
        "utf-8"
      );
      return res.status(200).json({
        ok: true,
        meta: {
          total: tareas.task.length,
          status: 200,
          message: "Actualizando Tarea",
          tareas,
        },
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        meta: {
          total: 0,
          status: 500,
          message: "Error al actualizar la tarea",
          error,
        },
      });
    }
  
};

const deleteTask = (req, res) => {
  const id = req.params.id;

  try {
    tareas.task = tareas.task.filter((tarea) => tarea.id != id);

    fs.writeFileSync(tareasFilePath, JSON.stringify(tareas, null, 2), "utf-8");
    return res.status(200).json({
      ok: true,
      meta: {
        total: tareas.task.length,
        status: 200,
        message: "Eliminando Tarea",
        tareas,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      meta: {
        total: 0,
        status: 500,
        message: "Error al eliminar la tarea",
        error,
      },
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
