import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import './Style.css';

function Login() {
  let navigate = useNavigate();
  let location: any = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    const loginResponse = await requestLogin({
      email,
      password
    });

    if (loginResponse.access_token) {
      auth.signin({ email: loginResponse.email, name: loginResponse.name, token: loginResponse.access_token }, () => {
        navigate(from, { replace: true });
      });
    }
  }

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

async function requestLogin(credentials: any) {
  const response = await fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  })
  return response.json();
}

export default Login;
