import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function HeaderWelcome() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header>
        {state?.logged ? (
          <nav className="navbar navbar-expand-sm header">
            <div className="container-fluid">
              <Link className="navbar-brand logo-inicio" to="/">
                <img src="../img/LogoToDo.png" className="logo"></img>
              </Link>
              <button
                className="navbar-toggler boton-nav"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={onLogout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-sm header">
            <div className="container-fluid">
              <Link className="navbar-brand logo-inicio" to="/">
                <img src="../img/LogoToDo.png" className="logo"></img>
              </Link>
              <button
                className="navbar-toggler boton-nav"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Registrarse
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </header>
      <Outlet />
    </>
  );
}

export default HeaderWelcome;
