import React from "react";
import Credentials from "./components/Credentials";
import CombineTodo from "./components/CombineTodo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route path="/todolist" element={<CombineTodo />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
