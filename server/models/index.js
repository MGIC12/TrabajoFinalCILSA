// Importo la Base de Datos
const connection = require("../database/db");

// Función que devuelve las tareas de un usuario
const tareas = (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM tareas WHERE idUsuario = ?"; // Consulta/Sentencia de SQL

  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la consulta" });
      console.error("Error en la consulta:", err);
    } else {
      res.json(results); // Devuelvo los resultados de la consulta
    }
  });
};

// Función que crea un usuario nuevo
const register = (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const sqlInsert = "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)";

  connection.query(sqlInsert, [nombre, email, password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") { // Error de valor duplicado
        res
          .status(409)
          .json({ error: "El correo electrónico ya está registrado" });
      } else {
        res.status(500).json({ error: "Error al insertar los datos" });
      }
      console.error("Error en la consulta:", err); // Debug
    } else {
      res.json({
        message: "Datos insertados exitosamente",
      }); // Devuelvo un mensaje de éxito
    }
  });
};

// Función que se fija si existe un usuario y devuelve su id
const login = (req, res) => {
  const { email, password } = req.body;

  const sqlQuery = "SELECT idUsuario FROM users WHERE email = ? AND password = ?";

  connection.query(sqlQuery, [email, password], (err, results) => {
    if (err) { // Error en la conexion
      res.status(500).json({ error: "Error en la consulta" });
    } else if (results.length > 0) {
      res.json({ success: true, id: results[0].idUsuario }); //devuelve esto results: [ RowDataPacket { idUsuario: 1 } ]
    } else { // No existe ese usuario
      res
        .status(401)
        .json({ success: false, message: "Credenciales incorrectas" }); // Devuelvo mensaje de error
    }
  });
};

// Función que devuelve los datos del usuario logueado
const user = (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM users WHERE idUsuario = ?";

  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la consulta" });
      console.error("Error en la consulta:", err);
    } else {
      res.json(results); // Devuelto los resultados de la consulta
    }
  });
};

// Función que crea una nueva tarea
const crear = (req, res) => {
  const { newDate, estado, descripcion } = req.body;
  const { id } = req.params; // Toma el parametro de la Ruta (idUduario)
  // console.log(req.body, req.params); // Debug

  const sqlQuery = "INSERT INTO tareas (idUsuario, fechaCreacion, estado, descripcion) VALUES (?, ?, ?, ?)";

  connection.query(
    sqlQuery,
    [id, newDate, estado, descripcion],
    (err, result) => {
      if (err) {
        console.error("Error al insertar tarea:", err);
        return res.status(500).json({ error: "Error al insertar la tarea" });
      }

      // Devuelve un mensaje y los datos insertados
      res.status(201).json({
        message: "Tarea insertada exitosamente",
        tarea: { idTarea: result.insertId, idUsuario: id, fechaCreacion: newDate, estado, descripcion },
      });
    }
  );
};

const del = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM tareas WHERE idTarea = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Tarea con ID ${id} eliminada` }); // Devuelve un mensaje de exito
  });
};
// Método POST para modificar la tarea
const modificar = (req, res) => {
  const { descripcion, id } = req.body;

  const sqlInsert = "UPDATE tareas SET descripcion = ? WHERE idTarea = ?";

  connection.query(sqlInsert, [descripcion, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error al insertar los datos" });
      console.error("Error en la consulta:", err);
    } else {
      res.json({
        message: "Datos modificados exitosamente",
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
    res.json({ message: "Estado de la tarea actualizado correctamente" }); // Mensaje de exito
  });
};

// Comentarios: Muchos mensajes de exito no los mostramos, pero nunca estan de más por si se necesita Debuggear.

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
