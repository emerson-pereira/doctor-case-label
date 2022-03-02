import React from 'react';
import './Style.css';

function handleSubmit(event: React.FormEvent<HTMLFormElement>) { }

function Login() {
  return (
    <section className="Login">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Email: <input name="email" type="text" />
          </label>{" "}
        </p>

        <p>
          <label>
            Senha: <input name="password" type="password" />
          </label>{" "}
        </p>

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
