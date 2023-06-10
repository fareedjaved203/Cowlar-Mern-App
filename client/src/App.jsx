import React from "react";
import CombineTodo from "./components/CombineTodo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
