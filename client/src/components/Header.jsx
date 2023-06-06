import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/header.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg sample-color fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              <span className="text-white">Cowlar TodoList</span>
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link text-white active" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
