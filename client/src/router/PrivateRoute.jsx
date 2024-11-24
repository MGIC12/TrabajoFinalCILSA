import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({ children }) => {
  //El componente PrivateRoute es una función que recibe un objeto children como prop.
  const { state } = useLocation();
  //La función utiliza el hook useLocation para obtener el estado de la ruta actual.
  return state?.logged ? children : <Navigate to="/login" />;
  /**
   * La función verifica si el estado de la ruta tiene una propiedad logged que sea verdadera.
   * Si es así, renderiza el componente children. Si logged es falsa, la función redirige a la ruta /login utilizando el componente Navigate.
   * */
};

PrivateRoute.propTypes = {
  // La propiedad propTypes se define para especificar que el componente children es requerido y debe ser un nodo de React
  children: PropTypes.node.isRequired,
};
