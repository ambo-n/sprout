import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };

  console.log(auth);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/projects">Create</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
