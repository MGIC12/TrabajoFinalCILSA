const express = require("express");
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.json());

// Base de datos
const connection = require("./database/db");

// Ruta para hacer la consulta de las tareas de un usuario
// Toma los parametros de la URL (idUsuario) y lo utiliza para hacer el query de las tareas de ese usuario
server.get('/todo/:id', (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT * FROM tareas WHERE idUsuario = ?'; // Cambia esto según tu consulta

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
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sqlInsert = 'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)';

  connection.query(sqlInsert, [nombre, email, password], (err, result) => {
    if(err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // Error de valor duplicado
        res.status(409).json({ error: 'El correo electrónico ya está registrado' });
      } else {
        res.status(500).json({ error: 'Error al insertar los datos' });
      }
      console.error('Error en la consulta:', err);
    } else {
      res.json({ message: 'Datos insertados exitosamente', id: result.insertId });
    }
  });
});

// Ruta de login con mensajes de error detallados
server.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  const sqlQuery = 'SELECT idUsuario FROM users WHERE email = ? AND password = ?';

  connection.query(sqlQuery, [email, password], (err, results) => {
    if(err) {
      res.status(500).json({ error: 'Error en la consulta' });
    } else if (results.length > 0) {
      res.json({ success: true, id: results[0].idUsuario }); //devuelve esto results: [ RowDataPacket { idUsuario: 1 } ]
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// Ruta para coltar datos del usuario
server.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT * FROM users WHERE idUsuario = ?'; // Cambia esto según tu consulta

  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en la consulta' });
      console.error('Error en la consulta:', err);
    } else {
      res.json(results);
    }
  });
});
// Configuración del puerto y ejecución del servidor
server.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
