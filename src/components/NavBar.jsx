import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "./NavBar.css";
import { useState } from "react";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_id");
    setAuth({ token: null });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div>
        <nav className="navbar">
          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
            {auth.token ? (
              <Link to="/" onClick={handleLogout}>
                Log Out
              </Link>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
            )}
            {auth.token ? (
              <Link to="/projects" onClick={closeMenu}>
                Create
              </Link>
            ) : null}
            {auth.token ? (
              <Link to="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            ) : null}
          </div>
        </nav>
        <Outlet />
      </div>
    </header>
  );
}

export default NavBar;
