import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./SignIn";
import SignUp from "./SignUp";

const Credentials = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default Credentials;
