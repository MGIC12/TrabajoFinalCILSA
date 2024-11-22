import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../css/todoStyles.css";

export const Tareas = () => {
  const { id } = useParams(); // Captura el id de la URL
  const [datos, setDatos] = useState([]);

  // SOLICITUD DE TAREAS
  useEffect(() => {
    // Solicitud al servidor Express
    axios
      .get(`http://localhost:3001/todo/${id}`)
      .then((response) => {
        setDatos(response.data); // Guarda los datos en el estado datos
        console.log(datos);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  console.log(datos);

  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState(0);
  // BOTON PARA ADD UNA TAREA-------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    try {
      const newDate = new Date().toISOString().split("T")[0];

      const nuevaTarea = { id, newDate, estado, descripcion };
      console.log(nuevaTarea);

      // Solicitud POST al servidor
      const response = await axios.post(
        `http://localhost:3001/crearTarea`,
        nuevaTarea
      );

      // Actualiza la lista de tareas con la nueva tarea agregada
      setDatos([...datos, response.data.tarea]); // response.data contiene la tarea creada

      // Limpia el formulario
      setDescripcion("");
      setEstado(0);
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };
  // BOTON PARA ELIMINAR UNA TAREA-------------------------------------------
  const handleDelete = async (idTarea) => {
    console.log(idTarea);
    try {
      // Petición DELETE al backend
      await axios.delete(`http://localhost:3001/eliminarTarea/${idTarea}`);

      // Actualizar la lista de tareas en el estado
      setDatos(datos.filter((tarea) => tarea.idTarea !== idTarea));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      alert("Hubo un problema al eliminar la tarea. Inténtalo de nuevo.");
    }
  };

  const handleEdit = async (tarea) => {
    // Mostrar un prompt para editar la descripción
    const nuevaDescripcion = prompt("Editar descripción:", tarea.descripcion);
    console.log(tarea.descripcion);

    // Verificar si la descripción no es null y no está vacía
    if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== "") {
      // Realizar la solicitud PUT para actualizar la tarea
      axios
        .put(`http://localhost:3001/editarTarea/${tarea.idTarea}`, {
          descripcion: nuevaDescripcion, // Enviar la nueva descripción en el cuerpo de la solicitud
        })
        .then((response) => {
          // Si la solicitud es exitosa, actualizamos el estado de los datos
          setDatos(
            datos.map((t) =>
              t.idTarea === tarea.idTarea
                ? { ...t, descripcion: nuevaDescripcion }
                : t
            )
          );
        })
        .catch((error) => {
          // Manejo de errores
          console.error("Error al editar la tarea:", error);
          alert("Hubo un problema al actualizar la tarea. Inténtalo de nuevo.");
        });
    } else {
      // Si la descripción es vacía o se cancela el prompt, no se hace nada
      alert("La descripción no puede estar vacía.");
    }
  };

  const handleOnChange = (e) => {
    setDescripcion(e.target.value); // Actualiza el estado con el valor del input
  };

  const handleToggleEstado = async (idTarea, estadoActual) => {
    const nuevoEstado = estadoActual === 1 ? 0 : 1; // Cambia el estado
    console.log(nuevoEstado, idTarea);
    try {
      await axios.put(`http://localhost:3001/cambiarEstado/${idTarea}`, {
        estado: nuevoEstado,
      });

      // Actualiza el estado local de la tarea
      setDatos(
        datos.map((tarea) =>
          tarea.id === idTarea ? { ...tarea, estado: nuevoEstado } : tarea
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="text-center">
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <input
                type="text"
                placeholder="Escribe tu tarea..."
                className="form-control form-control-lg"
                required
                value={descripcion}
                onChange={(e) => handleOnChange(e)}
              />
              <Button className="btn" variant="success" type="submit">
                Añadir
              </Button>
            </InputGroup>
          </Form>
          <ul>
            {datos.map((dato, index) => (
              <li
                className="list-item d-flex justify-content-between align-items-center shadow bg-dark text-white p-3 mb-2 rounded"
                key={index}
              >
                <p className="fecha fw-bold mb-0 p-2">
                  Fecha: {dato.fechaCreacion.split("T")[0]}
                </p>
                <br />
                <h6 className="descripcion mb-0 p-3">{dato.descripcion}</h6>
                <div className="button-group p-2">
                  <i
                    className={`fas fa-check-circle icon-check ${
                      dato.estado === 1 ? "completed" : "pending"
                    }`}
                    onClick={() =>
                      handleToggleEstado(dato.idTarea, dato.estado)
                    }
                    title="Cambiar estado"
                  ></i>
                  <i
                    className="fas fa-edit icon-edit"
                    onClick={() => handleEdit(dato)}
                    title="Editar"
                  ></i>
                  <i
                    className="fas fa-trash icon-delete"
                    onClick={() => handleDelete(dato.idTarea)}
                    title="Eliminar"
                  ></i>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
