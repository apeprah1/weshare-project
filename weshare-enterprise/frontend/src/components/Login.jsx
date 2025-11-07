import { useState } from "react";
import { login } from "../api";

function Login({ onLogin, onSwitchToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const data = await login(username, password);
      if (data.access) {
        localStorage.setItem("username", username);
        setMessage("Logged in!");
        onLogin && onLogin(username);
      } else {
        setMessage("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setMessage(
          `Error ${err.response.status}: ${JSON.stringify(err.response.data)}`
        );
      } else {
        setMessage("Network or server error – check console.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">WeShare</h1>
        <h2 className="auth-subtitle">Log In</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-switch">
          Don’t have an account?{" "}
          <button
            type="button"
            className="auth-link-button"
            onClick={onSwitchToSignup}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
