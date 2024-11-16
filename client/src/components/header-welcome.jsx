import { Link } from "react-router-dom";

function HeaderWelcome() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/welcome")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <nav className="navbar navbar-expand-sm header">
      <div className="container-fluid">
        <Link className="navbar-brand logo-inicio" to="/">
          ToDoW3b
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
  );
}

export default HeaderWelcome;
