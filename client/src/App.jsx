{
  /* import React from "react";*/
}
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcomePage";
import ToDo from "./pages/ToDo";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/todo/:id" element={<ToDo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
