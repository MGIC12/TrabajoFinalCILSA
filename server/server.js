const express = require("express");
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.json());

// Base de datos
const connection = require("./database/db");

// Ruta para hacer una consulta
server.get('/todo/:id', (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT * FROM tareas WHERE idUsuario = ?'; // Cambia esto según tu consulta
  // const sqlQuery = 'SELECT * FROM users'; // Cambia esto según tu consulta

  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en la consulta' });
      console.error('Error en la consulta:', err);
    } else {
      res.json(results);
    }
  });
});

// Ruta para manejar una solicitud POST de REGISTER
server.post('/crearUser', (req, res) => {
  const { usuario, nombre, email, password } = req.body;

  const sqlInsert = 'INSERT INTO users (usuario, nombre, email, password) VALUES (?, ?, ?, ?)';

  connection.query(sqlInsert, [usuario, nombre, email, password], (err, result) => {
    if(err) {
      res.status(500).json({ error: 'Error al insertar los datos' });
    } else {
      res.json({ message: 'Datos insertados exitosamente', id: result.insertId });
    }
  });
});

// Ruta del POST de LOGIN
server.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  const sqlQuery = 'SELECT id FROM users WHERE usuario = ? AND password = ?';

  connection.query(sqlQuery, [usuario, password], (err, results) => {
    if(err) {
      res.status(500).json({ error: 'Error en la consulta' });
    } else if (results.length > 0) {
      res.json({ success: true, id: results[0].id });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// Configuración del puerto y ejecución del servidor
server.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
