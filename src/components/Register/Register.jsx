import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, getShowPassword] = useState(false);


  // form handle
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // const username = e.target.username.value;
    const password = e.target.password.value;
    const accept = e.target.terms.checked;
    const name = e.target.name.value;
    console.log(name);
    // console.log(email, username, password);
    console.log(password.length);
    // reset error and success messages
    setRegisterError('');
    setRegisterSuccess('');

    // conditions
    if (password.length < 6) {
      setRegisterError('Your password must be at least 6 characters or longer. Please try again.')
      return;
    }
    else if (!/[A-Z]/.test(password)){
      setRegisterError('Your password should have an UPPERCASE ')
      return;
    }
    else if(!accept){
      setRegisterError('accept terms and conditions')
      return;
    }
    
    // create user
    createUserWithEmailAndPassword(auth, email, password)
    
      .then((result) => {
        setRegisterSuccess('You are registered successfully');
        console.log(result);
        updateProfile(result.user,{
          displayName : name, photoURL : "omuk.jpg"
        })
        .then(()=>{
          console.log('profile updated');
        })
        .catch();
        sendEmailVerification(result.user)
        .then(()=>{
          alert('Sent verification link');
        })
        
      })
      .catch((error) => {
        setRegisterError(error.message)
      });
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl m-5">Register Now!</h2>
      </div>
      <form onSubmit={handleRegister}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            name="email" required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Full name"
            name="name" required
          />
        </label>
        {/* <label className="input input-bordered flex items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
          />
        </label> */}
        <label className="input input-bordered flex items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input 
          type={showPassword ? "text" : "password"} 
          className="grow" 
          name="password" 
          required /> 
          <span onClick={()=> getShowPassword(!showPassword)}>
            {
              showPassword ? "Hide" : "Show"
            }
          </span>
        </label>
        <div className="m-2 ">
        <input type="checkbox" name="terms" />
        <label htmlFor="terms" className="ml-2">Accept terms & conditions</label>
        </div>
        <label>
          <button className="btn mt-5">Sign Up</button>
        </label>
      </form>
      {
        registerError && <div>{registerError}</div>
      }
      {
        registerSuccess && <p>{registerSuccess}</p>
      }
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
