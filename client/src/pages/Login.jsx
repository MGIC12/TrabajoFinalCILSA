import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      <section className="container center mt-3">
        <h2 className="text-center mb-3 h1 mt-3 fw-bold border-bottom border-3 rounded border-secondary">
          Inicio de Sesión
        </h2>
        <Form onSubmit={handleLogin} className="form mt-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            id=""
            placeholder="Correo electrónico"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            id=""
            placeholder="Contraseña"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-center">
            Asegúrate de no compartir tu contraseña con nadie.
          </Form.Text>
          <Button type="submit" variant="success" className="mb-3">
            Ingresar
          </Button>
        </Form>
        {error && (
          <p className="error-text" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <p>
          No tenés cuenta?{" "}
          <Link className="text-decoration-none text-danger" to="/register">
            Registrate
          </Link>
        </p>
      </section>
    </>
  );
};
