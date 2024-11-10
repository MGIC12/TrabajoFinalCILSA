import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Welcome from "./components/welcomePage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Welcome />
  </StrictMode>
);
