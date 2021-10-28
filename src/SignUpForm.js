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
    zipcode: "",
    photo: null,
    hobbies: "", 
    interests: "",
    password: ""
  }

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);
  const [redirectRequired, setRedirectRequired] = useState(false);
  // const [photo, setPhoto] = useState(null);

  console.log("* SignUpForm ", {
    handleSignUp,
    formData,
    message,
    redirectRequired
  });

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    let files = evt.target.files;
    console.log("evt.target.files: ", evt.target.files)
    // console.log("evt.target.files[0]: ", evt.target.files[0])
    // let file = files ? evt.target.files[0] : null;
    let file = !files ? formData.photo : evt.target.files[0];
    console.log("files: ", files)
    console.log("file: ", file)
    // console.log("photo: ", photo)


    setFormData(fData => ({
      ...fData,
      [name]: value,
      photo: file,
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
      console.log(err);
    };
  }

  return (

    <div className="row justify-content-center pt-3">
      <h2>Sign Up</h2>
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-zipcode">
              Zip Code
            </label>
            <input
              id="SignUpForm-zipcode"
              name="zipcode"
              className="form-control"
              onChange={handleChange}
              value={formData.zipcode}
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
            //   accept="image/png, image/jpeg"
              className="form-control"
              onChange={handleChange}
              // value={formData.photo.name}
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