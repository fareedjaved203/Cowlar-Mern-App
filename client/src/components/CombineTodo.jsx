import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/todolist.css";
import axios from "axios";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import { getData } from "../services/getData";
import { removeData } from "../services/removeData";
import { updateData } from "../services/updateData";
import { postData } from "../services/postData";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [accordianChecked, setAccordianChecked] = useState(false);
  const [mode, setMode] = useState("input");
  const [isOpen, setIsOpen] = useState(false);
  const [confirmId, setId] = useState("");
  const [pic, setPic] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  var fetchData = async () => {
    try {
      const receive = await getData();
      setTodos(receive);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAccordion = (id) => {
    setIsOpen(!isOpen);
    setId(id);
  };

  const toggleMode = () => {
    // Toggle between input, Text1, and Text2
    if (mode === "input") {
      setMode("completed");
    } else if (mode === "completed") {
      setMode("pending");
    } else {
      setMode("input");
    }
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden); // Toggle the visibility state
    setAccordianChecked(!accordianChecked);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // addTodo();
      sendDataToBackend();
      setInputValue("");
    }
  };

  const removeTodo = async (id) => {
    try {
      await removeData(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconToggle = async (id) => {
    try {
      await updateData(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendDataToBackend = async () => {
    try {
      await postData(inputValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="todo-structure">
          <TodoInput
            mode={mode}
            toggleMode={toggleMode}
            inputValue={inputValue}
            handleKeyPress={handleKeyPress}
            handleChange={handleChange}
            isHidden={isHidden}
            toggleVisibility={toggleVisibility}
          />
          <TodoList
            todos={todos}
            toggleAccordion={toggleAccordion}
            handleIconToggle={handleIconToggle}
            removeTodo={removeTodo}
            isHidden={isHidden}
            isOpen={isOpen}
            confirmId={confirmId}
          >
            {todos.map((value) => (
              <TodoItem
                key={value._id}
                todo={value}
                toggleAccordion={toggleAccordion}
                handleIconToggle={handleIconToggle}
                removeTodo={removeTodo}
                isOpen={isOpen}
                confirmId={confirmId}
              />
            ))}
          </TodoList>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
