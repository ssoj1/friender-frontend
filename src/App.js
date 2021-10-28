import { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import FrienderApi from './api';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import UserContext from "./UserContext";
import LoadingSpinner from "./LoadingSpinner";

/**
 * 
 * 
 */
function App() {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [goRedirect, setGoRedirect] = useState(false);
  const [infoLoaded, setInfoLoaded] = useState(false);

  console.log("* App ", {token, currentUser, goRedirect, infoLoaded});
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

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** */
  async function signup(formData) {
    // console.log("In handleSignup formdata: ", formData);
    // loop through and append each key/value pair into new FofmData class 

    let dataForBackend = new FormData();

    for (let key in formData) {
      dataForBackend.append(key, formData[key]);
    };

    // console.log("dataForBackend.get('username') is ", dataForBackend.get("username"))

    const token = await FrienderApi.registerUser(dataForBackend);
    setToken(token);
    setGoRedirect(true);
  }


  /** Handles site-wide login.
   *
   * Logs in a user and sets goRedirect state to true.
   *
   * Make sure you await this function to see if any error happens.
   */
   async function login(loginData) {
    let token = await FrienderApi.login(loginData);
    setToken(token);
    setGoRedirect(true);
  }

    // after login/signup success, redirect to /
    if (goRedirect) return <Redirect push to="/" />;

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
