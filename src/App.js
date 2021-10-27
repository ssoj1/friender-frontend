import { useState } from 'react';
import FrienderApi from './api';
import './App.css';
import SignUpForm from './SignUpForm';

/**
 * 
 * 
 */
function App() {
  console.log("* App ");

  const [token, setToken] = useState("");


  /** */
  async function handleSignUp(formData) {
    console.log("In handleSignup formdata: ", formData);
    // loop through and append each key/value pair into new FofmData class 

    let dataForBackend = new FormData();

    for (let key in formData) {
      dataForBackend.append(key, formData[key]);
    };

    console.log("dataForBackend.get('username') is ", dataForBackend.get("username"))

    const token = await FrienderApi.registerUser(dataForBackend);
    setToken(token);
    // setRedirectRequired(true);
  }

  return (
    <div className="App">
      <h1> Friender </h1> 
      < SignUpForm handleSignUp={handleSignUp} />
    </div>
  );
}

export default App;
