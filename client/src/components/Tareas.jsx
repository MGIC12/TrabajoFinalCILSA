import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";
import "../css/todoStyles.css";

export const Tareas = () => {
  const { id } = useParams(); // Captura el id de la URL (idUsuario)
  const [datos, setDatos] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState(0);

  // Estados para el modal
  const [showModal, setShowModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");

  // Solicitud de tareas
  useEffect(() => {
    axios
      .get(`http://localhost:3001/todo/${id}`)
      .then((response) => {
        setDatos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, [id]);

  // Manejo del formulario para agregar tareas
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (descripcion.trim() === "") {
      alert("La descripción no puede estar vacía.");
      return;
    }

    try {
      const newDate = new Date().toISOString().split("T")[0];
      const nuevaTarea = { newDate, estado, descripcion };

      const response = await axios.post(
        `http://localhost:3001/crearTarea/${id}`,
        nuevaTarea
      ); // Me devuelve los datos de la nueva tarea en la bbdd

      // console.log(response.data.tarea); // Debug
      setDatos([...datos, response.data.tarea]); // Agrego la nueva tarea a la lista de tareas
      setDescripcion(""); // Limpio las variables
      setEstado(0);
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  // Eliminar una tarea
  const handleDelete = async (idTarea) => {
    try {
      await axios.delete(`http://localhost:3001/eliminarTarea/${idTarea}`); // Elimino la tarea de bbdd
      setDatos(datos.filter((tarea) => tarea.idTarea !== idTarea)); // Elimino la tarea de la lista de tareas
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Abrir el modal para editar una tarea
  const handleEdit = (tarea) => {
    setTareaSeleccionada(tarea);
    setNuevaDescripcion(tarea.descripcion);
    setShowModal(true);
  };

  // Guardar los cambios de la tarea
  const guardarCambios = async () => {
    if (nuevaDescripcion.trim() === "") {
      alert("La descripción no puede estar vacía.");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/editarTarea`, {
        descripcion: nuevaDescripcion,
        id: tareaSeleccionada.idTarea,
      });

      // Actualizo la tarea en la lista de tareas
      // Creo una nueva lista con la nueva descripcion
      setDatos(
        datos.map((t) =>
          t.idTarea === tareaSeleccionada.idTarea
            ? { ...t, descripcion: nuevaDescripcion }
            : t
        )
      );

      setShowModal(false);
    } catch (error) {
      console.error("Error al editar la tarea:", error);
    }
  };

  const handleToggleEstado = async (idTarea, estadoActual) => {
    const nuevoEstado = estadoActual === 1 ? 0 : 1; // Si el estado es 1, ponelo en 0 y viceversa

    try {
      await axios.put(`http://localhost:3001/cambiarEstado`, {
        estado: nuevoEstado,
        id: idTarea,
      });// Modifica el estado en la bbdd

      // Actualizo la tarea en la lista de tareas
      // Creo una nueva lista con el nuevo estado (completado/pendiente)
      setDatos(
        datos.map((tarea) =>
          tarea.idTarea === idTarea ? { ...tarea, estado: nuevoEstado } : tarea
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
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <Button className="btn" variant="success" type="submit">
                Añadir
              </Button>
            </InputGroup>
          </Form>
          <ul>
            {datos.map((dato, index) => (
              <li
                className={`list-item d-flex justify-content-between align-items-center shadow p-3 mb-2 rounded ${
                  dato.estado === 1 ? "completada muted" : "text-white bg-dark"
                }`}
                key={index}
              >
                <p className="fecha fw-bold mb-0 p-2">
                  Fecha: {dato.fechaCreacion.split("T")[0]}
                </p>
                <h6 className="descripcion mb-0 p-3">{dato.descripcion}</h6>
                <div className="grupo button-group p-2 d-flex align-items-center">
                  <i
                    className="fas fa-edit icon-edit text-white"
                    onClick={() => handleEdit(dato)}
                    title="Editar"
                  ></i>
                  <i
                    className="fas fa-trash icon-delete text-danger"
                    onClick={() => handleDelete(dato.idTarea)}
                    title="Eliminar"
                  ></i>
                  <div className="check-container">
                    <input
                      type="checkbox"
                      checked={dato.estado === 1}
                      onChange={() =>
                        handleToggleEstado(dato.idTarea, dato.estado)
                      }
                      title="Cambiar estado"
                    ></input>
                    <span
                      className="checkmark"
                      onClick={() =>
                        handleToggleEstado(dato.idTarea, dato.estado)
                      }
                    ></span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-2">
          <Form>
            <Form.Group>
              <Form.Label className="fw-bold">Nueva descripción:</Form.Label>
              <Form.Control
                type="text"
                value={nuevaDescripcion}
                onChange={(e) => setNuevaDescripcion(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
