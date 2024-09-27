import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../../firebase.config";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset error and success messages
    setRegisterError("");
    setRegisterSuccess("");

    // validation

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          console.log(result.user);

          setRegisterSuccess("Login successfully");
        } else {
          alert("please verify your email first");
        }
      })
      .catch((error) => {
        console.log(error);

        setRegisterError("incrorect credentials");
      });
  };

  // forgot password
  const handleResetPassword = (e) => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("type an email");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("please write a valid email address");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a
                    onClick={handleResetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {registerError && <div>{registerError}</div>}
            {registerSuccess && <p>{registerSuccess}</p>}
            <p>
              SignUp <Link to="/register">here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
