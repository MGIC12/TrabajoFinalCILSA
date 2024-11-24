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
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
    if(validarFormulario()){// Si los campos estan validados
                            // Realiza la solicitud POST
    axios
      .post("http://localhost:3001/crearUser", { nombre, email, password })
      .then((response) => {
        setNombre(""); // Limpia el formulario
        setEmail("");
        setPassword("");
        setFormErrors({});
        setError("");
        setMensaje(response.data.message); // Muestra un mensaje de éxito
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error); // Mensaje de error desde el servidor
        } else {
          setError("Error en el servidor");
        }
      });
    }
  };

  // Función para validar el formulario
const validarFormulario = () => {
  const errores = {};
  const regexNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexEmail = /\S+@\S+\.\S+/;
  const regexPass = /\s+/;

  // Validar nombre
  if (!nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio';
  } else if (!regexNombre.test(nombre)){
    errores.nombre = 'Usar solo letras y espacios';
  } else if (nombre.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  // Validar email
  if (!email.trim()) {
    errores.email = 'El correo electrónico es obligatorio';
  } else if (!regexEmail.test(email)) {
    errores.email = 'El correo electrónico no es válido';
  }

  // Validar password
  if (!password.trim()) {
    errores.password = 'La contraseña es obligatoria';
  } else if (regexPass.test(password)){
    errores.password = 'La contraseña no debe contener espacios';
  } else if (nombre.length < 3) {
    errores.nombre = 'La contraseña debe tener al menos 3 caracteres';
  }

  setFormErrors(errores);
  setError("");

  // Devuelve true si no hay errores
  return Object.keys(errores).length === 0;
};

  return (
    <>
      <section className="container center mt-3 bg-dark shadow-lg rounded">
        <h2 className="text-center mb-3 h1 mt-3 fw-bold border-bottom border-3 rounded border-secondary text-white">
          Registro
        </h2>
        <Form onSubmit={handleSubmit} className="form text-white">
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
          <Form.Text className="text-center text-white">
            No vamos a compartir tus datos con nadie.
          </Form.Text>
          <Button type="submit" variant="success" className="mt-2 mb-3">
            Registrarse
          </Button>
        </Form>
        {mensaje && Object.keys(formErrors).length === 0 && error.length == 0 && (
          <>
          <p className="text-white mb-1">{mensaje}</p>
          <Link className="text-warning mb-2 fw-bold" to="/login">Iniciá sesión</Link> 
          </>
        )}
        {error && (
          <p style={{ color: "red" }}>
            • {error}
          </p>
        )}
        {formErrors && (
        <div style={{ color: "red" }}>
          {Object.values(formErrors).map((error, index) => (
            <p key={index}>• {error}</p>
          ))}
        </div>
      )}
      </section>
    </>
  );
};
