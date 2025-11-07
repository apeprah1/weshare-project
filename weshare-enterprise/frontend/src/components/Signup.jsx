import { useState } from "react";
import { signup } from "../api";

function Signup({ onSignupSuccess, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // safe even if called from onClick
    console.log("Signup form submitted");
    setMessage("");

    try {
      const data = await signup(username, password);
      console.log("Signup API result:", data);

      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage("Account created! You can now log in.");
        if (onSignupSuccess) onSignupSuccess();
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response) {
        setMessage(
          `Error ${err.response.status}: ${JSON.stringify(err.response.data)}`
        );
      } else {
        setMessage("Network or server error – check browser console.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">WeShare</h1>
        <h2 className="auth-subtitle">Sign Up</h2>

        {/* we keep the form mainly for styling; the real action is onClick */}
        <form className="auth-form">
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

          <button
            type="button"          // <--- no default form submit
            className="auth-button"
            onClick={handleSubmit} // <--- always runs when clicked
          >
            Sign Up
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-switch">
          Already have an account?{" "}
          <button
            type="button"
            className="auth-link-button"
            onClick={onSwitchToLogin}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
