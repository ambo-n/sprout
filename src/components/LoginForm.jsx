import { useState } from "react";
import postLogin from "../api/post-login.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import { FaUserNinja } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password).then((response) => {
        window.localStorage.setItem("token", response.token);
        setAuth({
          token: response.token,
        });
        navigate("/");
      });
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate("/users");
  };

  return (
    <div className="wrapper">
      <div className="login">
        <form>
          <h1>Login</h1>
          <div className="input-box">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <FaUserNinja className="icon" />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <RiLockPasswordFill className="icon" />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={handleSignUp}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
