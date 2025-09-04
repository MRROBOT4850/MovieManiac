import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import "./MenuBar.css";

const MenuBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="menu-bar">
      {/* Logo */}
      <div className="menu-logo">
        <Link to="/">🎬 MovieApp</Link>
      </div>

      {/* Hamburger toggle (mobile) */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Nav Links */}
      <div className={`menu-links-container ${menuOpen ? "open" : ""}`}>
        <ul className="menu-links">
          <li>
            <Link to="/movies/popular" onClick={() => setMenuOpen(false)}>
              Popular
            </Link>
          </li>
          <li>
            <Link to="/movies/top-rated" onClick={() => setMenuOpen(false)}>
              Top Rated
            </Link>
          </li>
          <li>
            <Link to="/movies/upcoming" onClick={() => setMenuOpen(false)}>
              Upcoming
            </Link>
          </li>
        </ul>

        {/* User Section */}
        <div className="menu-user">
          {user ? (
            <>
              <span className="welcome">Hi, {user.username}</span>
              <Link
                to="/dashboard"
                className="menu-btn"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="menu-btn logout">
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="menu-btn"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
