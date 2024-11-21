import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Tareas } from "../components/tareas";

function ToDo() {
  const { id } = useParams(); // Captura el id de la URL
  // const [datos, setDatos] = useState([]);
  const [user, setUser] = useState("");

  // SOLICITUD DE DATOS DE USER
  useEffect(() => {
    // Solicitud al servidor Express
    axios
      .get(`http://localhost:3001/user/${id}`)
      .then((response) => {
        setUser(response.data[0].nombre); // Guarda el nombre en user
        // console.log(user)
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);
  // console.log(user)

  return (
    <>
      <div>
        <h1>Tareas de {user}</h1>
        {/* {JSON.stringify(user)} */}
        <Tareas />
      </div>
    </>
  );
}

export default ToDo;
