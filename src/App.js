import { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import useLocalStorage from "./useLocalStorage";
import FrienderApi from './api';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import UserContext from "./UserContext";
import LoadingSpinner from "./LoadingSpinner";
import "bootstrap/dist/css/bootstrap.css";

export const TOKEN_STORAGE_ID = "friender-token";

/** Friender Application 
 * 
 * State: 
 * - token - for logged in users, this is their authentication JWT.
 * - currentUser - user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 * - goRedirect - boolean to indicate whether or not we should redirect.
 * - infoLoaded - boolean, has user data been pulled from API?
 * 
 * App -> {NavBar, Routes}
 */
function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [goRedirect, setGoRedirect] = useState(false);
  const [infoLoaded, setInfoLoaded] = useState(false);

  console.log("* App ", { token, currentUser, goRedirect, infoLoaded });

  /** Effect triggered by token change, updates currentUser based on token */
  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { id } = jwt.decode(token);
          console.log("id is ", id)
          // put the token on the Api class so it can use it to call the API.
          FrienderApi.token = token;
          let currentUser = await FrienderApi.getCurrentUser(id);

          setCurrentUser(currentUser);
          setGoRedirect(false);

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles new user signup, sets token received from server */
  async function signup(formData) {

    let dataForBackend = new FormData();

    for (let key in formData) {
      dataForBackend.append(key, formData[key]);
    };

    const token = await FrienderApi.registerUser(dataForBackend);
    setToken(token);
    setGoRedirect(true);
  }

  /** Handles site-wide login and sets token */
  async function login(loginData) {
    let token = await FrienderApi.login(loginData);
    setToken(token);
    setGoRedirect(true);
  }

  // after login/signup success, redirect to /users
  if (goRedirect) return <Redirect push to="/users" />;

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}>
      <div className="App">
        < NavBar logout={logout} />
        < Routes signup={signup} login={login} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
