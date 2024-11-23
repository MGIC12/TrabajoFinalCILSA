const express = require("express");
const router = express.Router();
const { tareas, register, login, user } = require("../models/index"); // Importar la base de datos desde index.js
const { crear, del, modificar, cambioestado } = require("../models/index");

// Definir las rutas

// Maneja GET de las Tareas del user
// Toma los parametros de la URL (idUsuario) y lo utiliza para hacer el query de las tareas de ese usuario
router.get("/todo/:id", tareas);

// Ruta para manejar una solicitud POST de REGISTER
router.post("/crearUser", register);

// Ruta de LOGIN con mensajes de error detallados
router.post("/login", login);

// Ruta para consultar datos del USUARIO
router.get("/user/:id", user);

router.post("/crearTarea", crear);

router.delete("/eliminarTarea/:id", del);

router.put("/editarTarea", modificar);

router.put("/cambiarEstado", cambioestado);

//router.delete('/eliminarTarea', del);

// Nueva ruta para manejar la eliminación de un curso por su id
// router.delete('/:id', del); // Maneja DELETE en la ruta con un parámetro id

module.exports = router;
