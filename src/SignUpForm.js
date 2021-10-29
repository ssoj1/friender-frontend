import { useState } from "react";
import Alert from "./Alert";
import "./SignUpForm.css";

/** SignUp form for new users
 * 
 * Props: 
 * - signup - function passed from App
 * 
 * Routes -> SignUpForm
 */
function SignUpForm({ signup }) {
  const initialFormData = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    zipcode: "",
    photo: null,
    hobbies: "", 
    interests: "",
    password: ""
  }

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);

  console.log("* SignUpForm ", { signup, formData, message });

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    let files = evt.target.files;
    console.log("evt.target.files: ", evt.target.files)

    let file = !files ? formData.photo : evt.target.files[0];

    setFormData(fData => ({
      ...fData,
      [name]: value,
      photo: file,
    }));
  }

  /** Call parent function. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("Check out formData ->", formData);

    try {
      await signup(formData);
      // setRedirectRequired(true);
    } catch (err) {
      setMessage(err);
      console.log(err);
    };
  }

  return (

    <div className="row justify-content-center pt-1">
      <h2>Sign Up</h2>
        <form className="SignUpForm m-0 mx-5 row form-horizontal" onSubmit={handleSubmit}>

          <div className="col-md-4 offset-md-4 justify-content-evenly mt-1">
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

            <label htmlFor="SignUpForm-email">
              Email
            </label>
            <input
              id="SignUpForm-email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              aria-label="email"
            />

            <label htmlFor="SignUpForm-zipcode">
              Zip Code
            </label>
            <input
              id="SignUpForm-zipcode"
              name="zipcode"
              className="form-control"
              onChange={handleChange}
              value={formData.zipcode}
              aria-label="zipcode"
            />

            <label htmlFor="SignUpForm-photo">
              Photo
            </label>
            <input
              id="SignUpForm-photo"
              name="photo"
              type="file"
            //   accept="image/png, image/jpeg"
              className="form-control"
              onChange={handleChange}
            />

            <label htmlFor="SignUpForm-hobbies">
              Hobbies
            </label>
            <input
              id="SignUpForm-hobbies"
              name="hobbies"
              className="form-control"
              onChange={handleChange}
              value={formData.hobbies}
            />

            <label htmlFor="SignUpForm-interests">
              Interests
            </label>
            <input
              id="SignUpForm-interests"
              name="interests"
              className="form-control"
              onChange={handleChange}
              value={formData.interests}
            />

            <label htmlFor="SignUpForm-password">
              Password
            </label>
            <input type="password"
              id="SignUpForm-password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
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