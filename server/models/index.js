// Base de datos
const connection = require("../database/db");

const tareas = (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM tareas WHERE idUsuario = ?"; // Cambia esto según tu consulta

  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la consulta" });
      console.error("Error en la consulta:", err);
    } else {
      res.json(results);
    }
  });
};

const register = (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const sqlInsert =
    "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)";

  connection.query(sqlInsert, [nombre, email, password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        // Error de valor duplicado
        res
          .status(409)
          .json({ error: "El correo electrónico ya está registrado" });
      } else {
        res.status(500).json({ error: "Error al insertar los datos" });
      }
      console.error("Error en la consulta:", err);
    } else {
      res.json({
        message: "Datos insertados exitosamente",
        id: result.insertId,
      });
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  const sqlQuery =
    "SELECT idUsuario FROM users WHERE email = ? AND password = ?";

  connection.query(sqlQuery, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la consulta" });
    } else if (results.length > 0) {
      res.json({ success: true, id: results[0].idUsuario }); //devuelve esto results: [ RowDataPacket { idUsuario: 1 } ]
    } else {
      res
        .status(401)
        .json({ success: false, message: "Credenciales incorrectas" });
    }
  });
};

const user = (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM users WHERE idUsuario = ?"; // Cambia esto según tu consulta

  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la consulta" });
      console.error("Error en la consulta:", err);
    } else {
      res.json(results);
    }
  });
};

const crear = (req, res) => {
  const { id, newDate, estado, descripcion } = req.body;
  console.log(req.body);
  // Validación de los datos recibidos
  if (!id || !descripcion || !newDate || estado === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const sqlQuery =
    "INSERT INTO tareas (idUsuario, fechaCreacion, estado, descripcion) VALUES (?, ?, ?, ?)";

  connection.query(
    sqlQuery,
    [id, newDate, estado, descripcion],
    (err, result) => {
      if (err) {
        console.error("Error al insertar tarea:", err);
        return res.status(500).json({ error: "Error al insertar la tarea" });
      }

      // Devuelve una respuesta más útil, incluyendo los datos insertados
      res.status(201).json({
        message: "Tarea insertada exitosamente",
        tarea: { id, fechaCreacion: newDate, estado, descripcion },
        result,
      });
    }
  );
};

const del = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM tareas WHERE idTarea = ?";
  console.log(req);
  connection.query(sql, [id], (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Tarea con ID ${id} eliminada` });
  });
};
// Método POST para modificar la tarea
const modificar = (req, res) => {
  const { descripcion, id } = req.body;
  // console.log(req.params); // Para debuggear

  // if (!descripcion) {
  //   res.status(400).json({ error: "La descripcion es necesaria." });
  // }

  const sqlInsert = "UPDATE tareas SET descripcion = ? WHERE idTarea = ?";

  connection.query(sqlInsert, [descripcion, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error al insertar los datos" });
      console.error("Error en la consulta:", err);
    } else {
      res.json({
        message: "Datos modificados exitosamente",
        id: result.insertId,
      });
    }
  });
};
const cambioestado = (req, res) => {
  const { estado, id } = req.body;

  const sqlQuery = "UPDATE tareas SET estado = ? WHERE idTarea = ?";

  connection.query(sqlQuery, [estado, id], (err, result) => {
    if (err) {
      console.error("Error al cambiar el estado:", err);
      return res.status(500).json({ error: "Error al cambiar el estado" });
    }
    res.json({ message: "Estado de la tarea actualizado correctamente" });
  });
};

module.exports = {
  tareas,
  register,
  login,
  user,
  crear,
  del,
  modificar,
  cambioestado,
};
