import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/todolist.css";
import axios from "axios";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "js-cookie";

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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/");

        // const decryptedEmail = Cookies.get("email");
        // const image = await axios.get(
        //   `http://localhost:8000/signin/${decryptedEmail}`
        // );
        // console.log(image);
        // setPic(image.data.profilePic);
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
        {/* {pic && <img src={`data:image/png;base64,${pic}`} alt="Your image" />} */}
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
