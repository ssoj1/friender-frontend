import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./UserContext";
// import "./Navigation.css";

/** Nav bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("NavBar", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/friends">
            Friends
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.first_name || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/auth/token">
            Login
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/auth/register">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="NavBar navbar navbar-expand-md">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Friender
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </div>
    </nav>
  );
}

export default NavBar;