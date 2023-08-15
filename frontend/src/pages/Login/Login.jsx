import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="auth-form-header">
          <h1>Login</h1>
          <p>Access Your Canvas</p>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="johndoe@risidio.dev"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </div>
        <button className="btn-primary" disabled={loading}>
          {loading ? "Logging In" : "Login"}
        </button>
        <small>
          Don't have an account? <NavLink to="/signup">Register</NavLink>
        </small>
      </form>
    </div>
  );
}

export default Login;
