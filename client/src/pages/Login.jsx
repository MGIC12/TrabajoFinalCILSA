import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import HeaderWelcome from "../components/header-welcome";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para redireccionar

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((response) => {
        const idUsuario = response.data.id;
        navigate(`/todo/${idUsuario}`); // Redirige al usuario a la pagina con sus tareas.
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError("Credenciales incorrectas");
        } else if (error.response.status === 400) {
          setError("Faltan credenciales");
        } else {
          setError("Error en el servidor");
        }
      });
  };

  return (
    <>
      <HeaderWelcome />
      <section className="center">
        <h2>LOGIN</h2>
        <form onSubmit={handleLogin} className="form">
          <label>CORREO ELECTRONICO</label>
          <input
            id=""
            placeholder="Correo electronico"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>CONTRASEÑA</label>
          <input
            id=""
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Ingresar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          No tenes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </section>
    </>
  );
};
