// Base de datos
const connection = require("../database/db");

const tareas = (req, res) => {
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
};

const register = (req, res) => {
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
};

const login = (req, res) => {
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
};

const user = (req, res) => {
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
};

module.exports = { tareas, register, login, user };