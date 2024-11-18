import { Route, Routes } from "react-router-dom";
import HeaderWelcome from "../components/header-welcome";
import WelcomePage from "../pages/welcomePage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import ToDo from "../pages/ToDo";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderWelcome />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="todo/:id"
            element={
              <PrivateRoute>
                <ToDo />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
