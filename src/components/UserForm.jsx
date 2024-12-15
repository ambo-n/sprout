import { useState } from "react";
import postUser from "../api/post-user.js";
import "./LoginForm.css";
import postLogin from "../api/post-login.js";
import useAuth from "../hooks/use-auth.js";
import { useNavigate } from "react-router-dom";
import z from "zod";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username must not be empty" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
});

function UserForm() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { auth, setAuth } = useAuth();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = loginSchema.safeParse(userDetails);
    if (!result.success) {
      const error = result.error.errors?.[0];
      if (error) {
        alert(error.message);
      }
      return;
    } else {
      postUser(result.data.username, result.data.password, result.data.email)
        .then(() => {
          return postLogin(result.data.username, result.data.password)
            .then((responseLogin) => {
              window.localStorage.setItem("token", responseLogin.token);
              window.localStorage.setItem("user_id", responseLogin.user_id);
              setAuth({
                token: responseLogin.token,
              });
              navigate("/");
            })
            .catch((error) => {
              alert(
                `Login failed: ${
                  error.response?.data?.message || error.message
                }`
              );
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div className="wrapper">
      <div className="login">
        <form>
          <h1>Sign Up</h1>
          <div className="input-box">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Join
          </button>
          <div className="register-link">
            <p>
              Already have an account?
              <a href="#" onClick={handleSignIn}>
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
