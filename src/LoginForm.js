import React, { useState } from "react";
import Alert from "./Alert";
import "./LoginForm.css";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
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
    <div className="LoginForm">
      <div className="form-group col-md-4 offset-md-4 justify-content-evenly mt-5">
        <h3 className="mb-3">Log In</h3>

        <form className="LoginForm row mt-3" onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
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

          <div className="row justify-content-evenly">
            <button className="btn btn-primarybtn btn-sm Submit-Btn mt-2 mb-5 col-auto" onClick={handleSubmit}>
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default LoginForm;