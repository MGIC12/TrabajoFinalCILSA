import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [ usuario, setUsuario ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const navigate = useNavigate(); // Para redireccionar

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/login', { usuario, password })
    .then((response) => {
      const idUsuario = response.data.id;
      navigate(`/todo/${idUsuario}`); // Redirige al usuario a la pagina con sus tareas.
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        setError('Credenciales incorrectas');
      } else {
        setError('Error en el servidor');
      }
    })
  }

  return (
    <section className="center">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin} className="form">
        <label>NOMBRE DE USUARIO</label>
        <input 
        id="" 
        placeholder="Nombre de usuario" 
        type="text" 
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}/>

        <label>CONTRASEÑA</label>
        <input
        id="" 
        placeholder="Contraseña" 
        type="text" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  )
}
