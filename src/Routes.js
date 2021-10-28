import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import UsersList from "./UsersList";
import FriendList from "./FriendList";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import PrivateRoute from "./PrivateRoute";


/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
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

        {/* <PrivateRoute exact path="/users">
          <UsersList />
        </PrivateRoute> */}

        {/* <PrivateRoute exact path="/friends">
          <FriendList />
        </PrivateRoute> */}

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
