import { useState } from "react";
import postUser from "../api/post-user.js";

function UserForm() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userDetails.username && userDetails.password) {
      postUser(
        userDetails.username,
        userDetails.password,
        userDetails.email
      ).then((response) => {
        window.localStorage.setItem("token", response.token);
        setAuth({
          token: response.token,
        });
        navigate("/");
      });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Your Email"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Create New User
      </button>
    </form>
  );
}

export default UserForm;
