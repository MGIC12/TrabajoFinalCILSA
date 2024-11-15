import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Realiza la solicitud POST
    axios
      .post("http://localhost:3001/crearUser", { nombre, email, password })
      .then((response) => {
        setNombre(""); // Limpia el formulario
        setEmail("");
        setPassword("");
        setMensaje(response.data.message); // Muestra un mensaje de éxito
      });
  };

  return (
    <section className="center">
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>NOMBRE</label>
        <input
          id=""
          placeholder="su nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>EMAIL</label>
        <input
          id=""
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>CONTRASEÑA</label>
        <input
          id=""
          placeholder="contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">REGISTRARSE</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      {mensaje && <Link to="/login">Iniciá sesión</Link>}
    </section>
  );
};
