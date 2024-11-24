const express = require("express");
const router = express.Router();
const { tareas, register, login, user, crear, del, modificar, cambioestado } = require("../models/index"); // Importar los metodos HTTP

// DEFINIMOS RUTAS

// Maneja GET de las Tareas del user
// Toma los parametros de la URL (idUsuario) y lo utiliza para hacer el query de las tareas de ese usuario
router.get("/todo/:id", tareas);

// Ruta para manejar una solicitud POST de REGISTER
router.post("/crearUser", register);

// Ruta de LOGIN con mensajes de error detallados
router.post("/login", login);

// Ruta para consultar datos del USUARIO
router.get("/user/:id", user);

// Ruta para crear una tarea nueva, con el id del usuario
router.post("/crearTarea/:id", crear);

// Ruta para manejar la eliminación de una tarea por su id
router.delete("/eliminarTarea/:id", del);

// Ruta para modificar la descrpcion de una tarea
router.put("/editarTarea", modificar);

// Ruta para modificar el estado de una tarea (completada/pendiente)
router.put("/cambiarEstado", cambioestado);

module.exports = router;
