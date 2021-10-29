// TO DO: update routes when FriendList component is completed

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import UserList from "./UserList";
// import FriendList from "./FriendList";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import PrivateRoute from "./PrivateRoute";


/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 * 
 * Props: 
 * - login - function passed from App
 * - signup - function passed from App
 * - users - array of user objects like [{user}, ...]
 * 
 * App -> Routes -> {Home, LoginForm, SignUpForm, UserList, UserCard}
 */

function Routes({ login, signup, users }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `signup=${typeof signup}`,
    users,
  );

  return (
    <div className="pt-5">
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/auth/token">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/auth/register">
          <SignUpForm signup={signup} />
        </Route>

        <PrivateRoute exact path="/users">
          <UserList />
        </PrivateRoute>

        {/* <PrivateRoute exact path="/friends">
          <FriendList />
        </PrivateRoute> */}

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
