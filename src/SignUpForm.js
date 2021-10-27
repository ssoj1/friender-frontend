import { useState } from "react";
import Alert from "./Alert";

/** 
 * 
 */
function SignUpForm({ handleSignUp }) {
  const initialFormData = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    photo: "",
    hobbies: "", 
    interests: "",
    password: ""
  }

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);
  const [redirectRequired, setRedirectRequired] = useState(false);

  console.log("* SignUpForm ", {
    handleSignUp,
    formData,
    message,
    redirectRequired
  });

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("Check out formData ->", formData);
    try {
      await handleSignUp(formData);
      setRedirectRequired(true);
    } catch (err) {
      setMessage(err);
    };
  }

  return (

    <div className="row justify-content-center pt-3">
      <h1>Sign Up</h1>
        <form className="SignUpForm col-8" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="SignUpForm-username">
              Username
            </label>
            <input
              id="SignUpForm-username"
              name="username"
              className="form-control"
              onChange={handleChange}
              value={formData.username}
              aria-label="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-firstName">
              First Name
            </label>
            <input
              id="SignUpForm-firstName"
              name="firstName"
              className="form-control"
              onChange={handleChange}
              value={formData.firstName}
              aria-label="First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-lastName">
              Last Name
            </label>
            <input
              id="SignUpForm-lastName"
              name="lastName"
              className="form-control"
              onChange={handleChange}
              value={formData.lastName}
              aria-label="Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-email">
              Email
            </label>
            <input
              id="SignUpForm-email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              aria-label="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-zipCode">
              Zip Code
            </label>
            <input
              id="SignUpForm-zipCode"
              name="zipCode"
              className="form-control"
              onChange={handleChange}
              value={formData.zipCode}
              aria-label="Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-photo">
              Photo
            </label>
            <input
              id="SignUpForm-photo"
              name="photo"
              type="file"
              accept="image/png, image/jpeg"
              className="form-control"
              onChange={handleChange}
              value={formData.photo}
              aria-label="Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-hobbies">
              Hobbies
            </label>
            <input
              id="SignUpForm-hobbies"
              name="hobbies"
              className="form-control"
              onChange={handleChange}
              value={formData.hobbies}
              aria-label="Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-interests">
              Interests
            </label>
            <input
              id="SignUpForm-interests"
              name="interests"
              className="form-control"
              onChange={handleChange}
              value={formData.interests}
              aria-label="Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-password">
              Password
            </label>
            <input type="password"
              id="SignUpForm-password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
              aria-label="Submit"
            />
          </div>
          {message && <Alert message={message} />}
          <div>
            <button className="btn-primary rig btn btn-sm SignUpForm-Button">
              Submit
            </button>
          </div>
        </form>


    </div>
  );
}

export default SignUpForm;