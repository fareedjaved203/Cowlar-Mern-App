import React from "react";
import CombineTodo from "./components/CombineTodo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//with the help of react router, default route '/' is set
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CombineTodo />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
