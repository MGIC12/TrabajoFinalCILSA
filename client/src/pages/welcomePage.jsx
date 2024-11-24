import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/welcomeStyles.css";

function Welcome() {
  // Inicializo la libreria de animaciones
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="main p-0">
        <div className="imagen container-fluid text-center">
          <div
            className="cartel"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-easing="ease-in-out-back"
          >
            <h1 className="bienvenido">ToDoW3b</h1>
          </div>
          <div
            className="info cartel"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="500"
            data-aos-easing="ease-in-out-back"
          >
            <h2 className="info-item">Lleva un registro de tus tareas</h2>
            <h3 className="info-item">
              Crea, Modifica, Guarda y Elimina Tareas
            </h3>
            <p className="info-item-link">
              Para comenzar,{" "}
              <Link to="/login" className="link-inicio">
                inicia sesión.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
