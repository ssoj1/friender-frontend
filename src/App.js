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
    const token = await FrienderApi.registerUser(formData);
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
