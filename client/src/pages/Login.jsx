
export const Login = () => {
  return (
    <section className="center">
      <h2>LOGIN</h2>
      <form action="post" className="form">
        <input type="text" name="mail" id="" placeholder="email" />
        <input type="text" name="password" id="" placeholder="contraseña"/>
        <button>Enviar</button>
      </form>
    </section>
  )
}
