import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
function Signup() {
  document.title = "Signup";
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const { signup, loading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, fullname, username, image);
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
          <h1>Signup</h1>
          <p>Join the Creative Movement</p>
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            placeholder="John Doe"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="johnd"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="johndoe@risidio.dev"
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button className="btn-primary" disabled={loading}>
          {loading ? "Signing Up" : "Signup"}
        </button>
        <small>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </small>
      </form>
    </div>
  );
}

export default Signup;
