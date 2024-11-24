const express = require("express"); // importar express
const cors = require('cors'); // importa CORS
const routes = require('./routes'); // importa las rutas de la API

const server = express(); // inicializar la app

server.use(cors());
server.use(express.json()); // Middleware para parsear JSON
server.use('/', routes); // Usar las rutas definidas en routes.js

// Configuración del puerto y ejecución del servidor
server.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});