import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/signin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "js-cookie";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendDataToBackend = async (e) => {
    e.preventDefault();
    try {
      toast.info("Processing", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const data = await axios.post("http://localhost:8000/signin", {
        email,
        password,
      });
      navigate("/todolist");
      // if (validated) {
      // } else {
      //   toast.error("InCorrect Details", {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-first">
        <ToastContainer></ToastContainer>
        <div className="container auth-wrapper">
          <div className="auth-inner">
            <form action="post">
              <h3>Login</h3>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn submit-btn"
                  onClick={sendDataToBackend}
                >
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right text-white">
                Already registered <NavLink to="/sign-up">sign up?</NavLink>
              </p>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SignIn;
