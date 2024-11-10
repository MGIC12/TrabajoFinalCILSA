import { useEffect } from "react";
import "../css/welcomeStyles.css";
import HeaderWelcome from "./header-welcome";
import AOS from "aos";
import "aos/dist/aos.css";
// data-aos="zoom-in"

function Welcome() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <HeaderWelcome></HeaderWelcome>
      <div className="main p-0">
        <div className="imagen container-fluid text-center">
          <div
            className="cartel"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-easing="ease-in-out-back"
          >
            <h1 className="bienvenido">Bienvenidx!</h1>
            {/* <!-- que la x se vaya cambiando cada xtiempo: o,a,e,x --> */}
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
              <a href="" className="link-inicio">
                inicia sesión.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
