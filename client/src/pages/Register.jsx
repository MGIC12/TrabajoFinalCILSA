import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

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
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error); // Mensaje de error desde el servidor
        } else {
          setError("Error en el servidor");
        }
      });
  };

  return (
    <>
      <section className="container center mt-3">
        <h2 className="text-center mb-3 h1 mt-3 fw-bold border-bottom border-3 rounded border-secondary">
          Registro
        </h2>
        <Form onSubmit={handleSubmit} className="form">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            id=""
            placeholder="Su nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <Form.Label>Email</Form.Label>
          <Form.Control
            id=""
            placeholder="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            id=""
            placeholder="contraseña"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-center">
            No vamos a compartir tus datos con nadie.
          </Form.Text>
          <Button type="submit" variant="success" className="mt-2">
            Registrarse
          </Button>
        </Form>
        {mensaje && <p className="success-text">{mensaje}</p>}
        {error && (
          <p className="error-text" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {mensaje && <Link to="/login">Iniciá sesión</Link>}
      </section>
    </>
  );
};
