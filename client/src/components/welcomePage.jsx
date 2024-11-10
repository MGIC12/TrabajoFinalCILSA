import React, {useEffect} from "react";
import '../css/welcomeStyles.css';
import HeaderWelcome from "./header-welcome";
import AOS from 'aos';
import 'aos/dist/aos.css';

const letras = ["o","a","e","x"];
var index = 0;

function Welcome() {
  const [letra, setLetra] = React.useState(letras[0]);
  
  function timing() {
    setInterval(() => {
        let letra = sigLetra()
        setLetra(letra);
    }, 1000);
  }
  function sigLetra(){
    if (index < 3) {
      index += 1;
      return letras[index];
    } else {
      index = 0;
      return letras[index];
    }
  }

  // Cambio la letra
  React.useEffect(() => {
   timing()
  }, 1000);

  // Inicializo la libreria de animaciones
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
    <HeaderWelcome></HeaderWelcome>
    <div className="main p-0">
      <div className="imagen container-fluid text-center">
        <div className="cartel" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out-back">
          <h1 className="bienvenido">Bienvenid{ letra }!</h1>
           {/* <!-- que la x se vaya cambiando cada xtiempo: o,a,e,x --> */}
        </div>
        <div className="info cartel" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="500" data-aos-easing="ease-in-out-back">
          <h2 className="info-item">Lleva un registro de tus tareas</h2>
          <h3 className="info-item">Crea, Modifica, Guarda y  Elimina Tareas</h3>
          <p className="info-item-link">Para comenzar, <a href="" className="link-inicio">inicia sesión.</a></p>
        </div>

      </div>
    </div>
    </>
  );
}

export default Welcome;