/* TABLA USERS */
CREATE DATABASE trabajo_final_cilsa;
USE trabajo_final_cilsa;

CREATE TABLE users (
    idUsuario int(50) NOT NULL AUTO_INCREMENT,
    nombre varchar(100) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (idUsuario)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/* TABLA TAREAS */
CREATE TABLE tareas (
    idTarea int(11) NOT NULL AUTO_INCREMENT,
    idUsuario int(11) NOT NULL,
    fechaCreacion datetime NOT NULL,
    estado tinyint(1) NOT NULL,
    descripcion varchar(255) NOT NULL,
    PRIMARY KEY (idTarea),
    KEY idUsuario (idUsuario),
    CONSTRAINT tareas_ibfk_1 FOREIGN KEY (idUsuario) REFERENCES users (idUsuario)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/* Agregamos filas para probar (antes de tener la interfaz) */
INSERT INTO users (nombre, email, password) VALUES ('Juan','user1@ejemplo.com','pass1');
INSERT INTO users (nombre, email, password) VALUES ('Maria','user2@ejemplo.com','pass2');
INSERT INTO tareas (idUsuario,fechaCreacion,estado,descripcion)
VALUES
('1','2024-11-13','1','Salir a correr'),
('1','2024-11-13','0','Seguir con TP'),
('1','2024-11-13','0','No morir');

SELECT * FROM users;
SELECT idUsuario FROM users WHERE email = 'user1@ejemplo.com' AND password = 'pass1'; /* Sentencia para el Login */
SELECT * FROM tareas;

/* Sentencia para que funcione la conexion sin la contraseña (Cambio de contraseña MySQL) */
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
flush privileges;