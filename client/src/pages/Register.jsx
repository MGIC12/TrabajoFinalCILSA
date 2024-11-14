import { useState } from "react";
import axios from 'axios';

export const Register = () => {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Realiza la solicitud POST
    axios.post('http://localhost:3001/crearUser', { usuario, nombre, email, password })
    .then((response) => {
      setNombre(''); // Limpia el formulario
      setUsuario('');
      setEmail('');
      setPassword('');
      setMensaje(response.data.message); // Muestra un mensaje de éxito
    })
  }


  return (
    <section className="center">
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>USUARIO</label>
        <input 
        id="" 
        placeholder="elija un nombre de usuario" 
        type="text" 
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)} />
        <p>ADMITIDO: Mayúsculas, Minúsculas, Números, ., -, #, Sin espacios.</p>

        <label>NOMBRE</label>
        <input 
        id="" 
        placeholder="su nombre"
        type="text" 
        value={nombre}
        onChange={(e) => setNombre(e.target.value)} />

        <label>EMAIL</label>
        <input 
        id="" 
        placeholder="email" 
        type="text" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} />

        <label>CONTRASEÑA</label>
        <input 
        id="" 
        placeholder="contraseña"
        type="text" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </section>
  )
}
