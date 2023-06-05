import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [accordianChecked, setAccordianChecked] = useState(false);
  const [mode, setMode] = useState("input");
  const [isOpen, setIsOpen] = useState(false);
  const [confirmId, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make GET request to backend API
        const response = await axios.get("http://localhost:8000/");
        // Update component state with retrieved data
        if (mode === "input") {
          return setTodos(response.data);
        } else if (mode === "pending") {
          const showPending = response.data.filter((val) => {
            return val.status === "pending";
          });

          return setTodos(showPending);
        } else {
          const showCompleted = response.data.filter((val) => {
            return val.status === "completed";
          });

          return setTodos(showCompleted);
        }
      } catch (error) {
        // Handle errors
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [todos, mode]);

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
      const response = await axios.delete(`http://localhost:8000/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconToggle = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/${id}`, {
        status: "completed",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendDataToBackend = async () => {
    try {
      await axios.post("http://localhost:8000/", {
        inputValue,
      });
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
        <footer>&copy; 2023, Muhammad Fareed Javed. All Rights Reserved</footer>
      </div>
    </>
  );
};

export default App;
