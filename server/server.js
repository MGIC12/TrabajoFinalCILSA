const express = require("express");
const server = express();

server.use(express.json());

// Base de datos
const connection = require("./database/db");

server.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
