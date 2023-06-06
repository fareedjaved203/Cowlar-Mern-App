import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/signin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setPostImage] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage(base64);
  };
  const sendDataToBackend = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Enter All Details Correctly", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      try {
        await axios.post("http://localhost:8000/signup", {
          name,
          email,
          password,
          profilePic,
        });
        navigate("/sign-in");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      {/* <Header /> */}
      <div className="container-first">
        <div className="container auth-wrapper">
          <div className="auth-inner">
            <form action="post" className="signup">
              <h3>Sign Up</h3>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Fareed Javed"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload Image"
                  accept=".png, .jpg, .jpeg"
                  name="file"
                  onChange={(e) => handleFileUpload(e)}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn submit-btn"
                  onClick={sendDataToBackend}
                >
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right text-white">
                Already registered <NavLink to="/sign-in">sign in?</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUp;

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
