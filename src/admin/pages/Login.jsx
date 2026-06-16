import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAdminAuth,
} from "../context/AdminAuthContext";

import "../styles/Login.css";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useAdminAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@homepot.com" &&
      password === "123456"
    ) {
      login(email);

      navigate("/admin");
    } else {
      alert(
        "Invalid Credentials"
      );
    }
  };

  return (
    <div className="login-page">

      <form
        className="login-card"
        onSubmit={handleLogin}
      >
        <h2>
          Home Pot Admin
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;