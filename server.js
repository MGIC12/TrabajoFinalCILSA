const express = require("express");
const server = express();

// urlencoded para la captura de los datos de los formularios
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Inicio dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

// Motor de plantilla ejs
server.set("view engine", "ejs");

// Inicio de la base de datos
const connection = require("./database/db");

// inicio servidor
server.listen(3000, (req, res) => {
  console.log("Server running in http://localhost:3000");
});

// Ruta principal
const indexRoute = require("./routes/index");
server.use("/", indexRoute);
const welcomeRoute = require("./routes/welcome.js");
server.use("/", welcomeRoute);
