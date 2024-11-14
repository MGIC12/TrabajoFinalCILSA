const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trabajo_final_cilsa",
});


connection.connect((error) => {
  if (error) {
    console.log("Error al conectar con la base de datos: " + error);
    return;
  }
  console.log("Conectado a la base de datos");
});

module.exports = connection;
