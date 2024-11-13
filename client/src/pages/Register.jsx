export const Register = () => {
  return (
    <section className="center">
      <h2>REGISTER</h2>
      <form action="post" className="form">
        <input type="text" name="nombre" id="" placeholder="su nombre" />
        <input type="text" name="user" id="" placeholder="elija un nombre de usuario" />
        <input type="text" name="mail" id="" placeholder="email" />
        <input type="text" name="password" id="" placeholder="contraseña"/>
        <button>Enviar</button>
      </form>
    </section>
  )
}
