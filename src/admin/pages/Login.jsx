import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // REAL STRAPI LOGIN (handled inside context)
      await login(email, password);

      navigate("/admin");
    } catch (error) {
      console.log("Login failed:", error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (token && window.location.pathname === "/admin/login") {
    navigate("/admin");
  }
}, [navigate]);

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Home Pot Admin</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;