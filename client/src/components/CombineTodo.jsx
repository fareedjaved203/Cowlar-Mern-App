import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/todolist.css";
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
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, [mode, data]);
  var fetchData = async () => {
    try {
      const receive = await getData();
      switch (mode) {
        case "completed":
          setTodos(
            receive.filter((item) => {
              return item.status === "completed";
            })
          );
          setData("completed");
          break;
        case "pending":
          setTodos(
            receive.filter((item) => {
              return item.status === "pending";
            })
          );
          setData("pending");
          break;
        default:
          setTodos(receive);
          setData("data added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAccordion = (id) => {
    setIsOpen(!isOpen);
    setId(id);
  };

  const toggleMode = () => {
    // Toggle between input text, completed tasks and pending tasks
    if (mode === "input") {
      setMode("completed");
    } else if (mode === "completed") {
      setMode("pending");
    } else {
      setMode("input");
    }
  };

  const toggleVisibility = () => {
    //it sets the visibility of task items
    setIsHidden(!isHidden);
    setAccordianChecked(!accordianChecked);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendDataToBackend();
      setData("data posted");
      console.log(data);
      setInputValue("");
    }
  };

  const removeTodo = async (id) => {
    try {
      await removeData(id);
      setData("data deleted");
    } catch (error) {
      console.log(error);
    }
  };
  const updateTodo = (id) => {
    handleIconToggle(id);
    setData("data updated");
  };
  const handleIconToggle = async (id) => {
    try {
      const data = await updateData(id);
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
            handleIconToggle={updateTodo}
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
                handleIconToggle={updateTodo}
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
