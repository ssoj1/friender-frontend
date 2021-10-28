import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import "./Homepage.css";
import UserContext from "./UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("* Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 fw-bold">Friender</h1>
        <p className="lead">The best place on the internet for making new friends.</p>
        {currentUser
          ? <h2>
            Welcome, {currentUser.firstName || currentUser.username}!
          </h2>
          : (
            <p>
              <Link className="btn btn-primary fw-bold me-3"
                to="/auth/token">
                Log in
              </Link>
              <Link className="btn btn-primary fw-bold"
                to="/auth/register">
                Sign up
              </Link>
            </p>
          )}
      </div>
    </div>
  );
}

export default Homepage;