import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({ children }) => {
  const { state } = useLocation();
  return state?.logged ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
