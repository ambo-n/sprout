import { useState } from "react";
import postUsers from "../api/post-user";

function UserForm() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevUserDetails) => ({
      ...prevUserDetails,
      [id]: value,
    }));
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
      <button type="submit">Create New User</button>
    </form>
  );
}

export default UserForm;
