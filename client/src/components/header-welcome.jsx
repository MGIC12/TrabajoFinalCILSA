import "../css/welcomeStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

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
        <a className="navbar-brand logo-inicio" href="">
          ToDoW3b
        </a>
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
              <a className="nav-link" href="#">
                Iniciar Sesión
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Registrarse
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderWelcome;
