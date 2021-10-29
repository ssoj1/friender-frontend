import React, { useState } from "react";
import Alert from "./Alert";
import "./LoginForm.css";

/** Login form.
 *
 * On submission:
 * - calls login function prop
 * 
 * Props: 
 * login - function passed from App
 * 
 * State: 
 * - formData
 *
 * Routes -> LoginForm -> Alert
 */

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.log(
    "* LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "formErrors", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if not successful, sets errors.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
    <div className="row justify-content-center pt-1">
      <h2>Log In</h2>
      <form className="LoginForm row mt-1" onSubmit={handleSubmit}>

        <div className="col-md-4 offset-md-4 justify-content-evenly mt-1">
            <label className="form-label ">Username</label>
            <input
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />

          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          {formErrors.length
            ? <Alert type="danger" messages={formErrors} />
            : null}

            <button className="btn-primary rig btn btn-sm LoginForm-Button mt-4" onClick={handleSubmit}>
              Submit
            </button>

        </div>
      </form>
    </div>
  );
}

export default LoginForm;