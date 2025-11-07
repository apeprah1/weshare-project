import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Timeline from "./components/Timeline.jsx";
import PostDetail from "./components/PostDetail.jsx";

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );
  const [mode, setMode] = useState("login"); // "login" or "signup"

  if (!username) {
    return (
      <div style={{ maxWidth: 500, margin: "2rem auto", textAlign: "center" }}>
        {mode === "signup" ? (
          <>
            <Signup
              onSignupSuccess={() => setMode("login")}
              onSwitchToLogin={() => setMode("login")}
            />
          </>
        ) : (
          <>
            <Login
              onLogin={(u) => setUsername(u)}
              onSwitchToSignup={() => setMode("signup")}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "1rem auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>WeShare</h1>
        </Link>
        <div>
          <span style={{ marginRight: "1rem" }}>@{username}</span>
          <button
            onClick={() => {
              localStorage.clear();
              setUsername(null);
              setMode("login");
            }}
          >
            Log out
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
