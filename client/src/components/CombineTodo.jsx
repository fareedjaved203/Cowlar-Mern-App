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
import Alert from "react-bootstrap/Alert";
import Header from "./Header";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [accordianChecked, setAccordianChecked] = useState(false);
  const [mode, setMode] = useState("input");
  const [isOpen, setIsOpen] = useState(false);
  const [confirmId, setId] = useState("");
  const [data, setData] = useState("");
  const [enableAlert, isAlert] = useState(false);
  const [variant, setVariant] = useState("");
  const [alertText, setAlert] = useState("");

  useEffect(() => {
    if (enableAlert) {
      const timer = setTimeout(() => {
        isAlert(false);
      }, 1000);

      // Clean up the timer when the component unmounts or when enableAlert changes
      return () => {
        clearTimeout(timer);
      };
    }
    fetchData();
  }, [mode, data, enableAlert]);
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
      isAlert(true);
      setVariant("primary");
      setAlert("Loading...");
      isAlert(true);

      sendDataToBackend();
      setData("data posted");
      setInputValue("");
    }
  };

  const removeTodo = async (id) => {
    try {
      setVariant("primary");
      setAlert("Loading...");
      isAlert(true);
      const add = await removeData(id);
      // setData("data deleted");
      // setVariant("success");
      // setAlert("Item Deleted Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  const updateTodo = (id) => {
    setVariant("primary");
    setAlert("Loading...");
    isAlert(true);
    handleIconToggle(id);
    // setVariant("success");
    // setAlert("Item Updated Successfully!");
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
      <Header />

      {enableAlert ? (
        <div className="custom-toast">
          <Alert variant={variant} onClose={() => isAlert(false)} dismissible>
            {alertText}
          </Alert>
        </div>
      ) : null}

      <div className="container-fluid body">
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
