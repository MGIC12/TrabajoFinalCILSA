/* TABLA USERS */
CREATE DATABASE trabajo_final_cilsa;
USE trabajo_final_cilsa;

CREATE TABLE users (
    idUsuario int(50) NOT NULL AUTO_INCREMENT,
    usuario varchar(50) NOT NULL,
    nombre varchar(100) NOT NULL,
    email varchar(255) NOT NULL,
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

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
flush privileges;