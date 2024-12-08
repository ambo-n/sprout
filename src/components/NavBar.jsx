import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };

  return (
    <header>
      <div>
        <nav className="navbar">
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
    </header>
  );
}

export default NavBar;
