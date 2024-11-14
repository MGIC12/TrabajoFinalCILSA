import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ToDo() {
  const { id } = useParams(); // Captura el id de la URL
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Solicitud al servidor Express
    axios.get(`http://localhost:3001/todo/${id}`)
    .then((response) => {
      setDatos(response.data); // Guarda los datos en el estado datos
    })
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);

  return (
  <>
    <div>
      <h1>Resultados de la consulta</h1>
      <ul>
        {datos.map((dato, index) => (
          <li key={index}>
            Tarea: {dato.idTarea} <br/>
            Fecha: {dato.fechaCreacion.split('T')[0]} <br/>
            Descripcion: {dato.descripcion} <br/>
            Estado: {dato.estado} <br/>
            {/* {JSON.stringify(dato)} */}
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};

export default ToDo;
