// import "todomvc-app-css/index.css";

function ToDo() {
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>ToDoW3b</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" id="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            <li className="completed">
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Tarea 1</label>
                <button className="destroy"></button>
              </div>
              <input className="edit" />
            </li>
            <li>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Tarea 2</label>
                <button className="destroy"></button>
              </div>
              <input className="edit" />
            </li>
          </ul>
        </section>
        <footer className="footer">
          {/*<!-- This should be `0 items left` by default -->*/}
          <span className="todo-count">
            <strong>0</strong> item left
          </span>
          {/*<!-- Remove this if you don't implement routing -->*/}
          <ul className="filters">
            <li>
              <a className="selected" href="#/">
                All
              </a>
            </li>
            <li>
              <a href="#/active">Activo</a>
            </li>
            <li>
              <a href="#/completed">Completado</a>
            </li>
          </ul>
          {/*<!-- Hidden if no completed items are left ↓ -->*/}
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    </>
  );
}

export default ToDo;
