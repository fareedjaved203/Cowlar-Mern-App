import React, { useState, useEffect, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/todolist.css";
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

//using react hooks
const initialState = {
  todos: [],
  inputValue: "",
  isHidden: false,
  accordianChecked: false,
  mode: "input",
  isOpen: false,
  confirmId: "",
  data: "",
  enableAlert: false,
  variant: "",
  alertText: "",
};

//useReducer is used because states were too large (11) and were interdependent and involved complex state representations
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_INPUT_VALUE":
      return { ...state, inputValue: action.payload };
    case "SET_IS_HIDDEN":
      return { ...state, isHidden: action.payload };
    case "SET_ACCORDIAN_CHECKED":
      return { ...state, accordianChecked: action.payload };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_IS_OPEN":
      return { ...state, isOpen: action.payload };
    case "SET_CONFIRM_ID":
      return { ...state, confirmId: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_ENABLE_ALERT":
      return { ...state, enableAlert: action.payload };
    case "SET_VARIANT":
      return { ...state, variant: action.payload };
    case "SET_ALERT":
      return { ...state, alertText: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    todos,
    inputValue,
    isHidden,
    accordianChecked,
    mode,
    isOpen,
    confirmId,
    data,
    enableAlert,
    variant,
    alertText,
  } = state;

  //useFffect with dependencies
  useEffect(() => {
    if (enableAlert) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_ENABLE_ALERT", payload: false });
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
    fetchData();
  }, [mode, data, enableAlert]);

  const fetchData = async () => {
    try {
      const receive = await getData();
      switch (mode) {
        case "completed":
          dispatch({
            type: "SET_TODOS",
            payload: receive.filter((item) => item.status === "completed"),
          });
          dispatch({ type: "SET_DATA", payload: "completed" });
          break;
        case "pending":
          dispatch({
            type: "SET_TODOS",
            payload: receive.filter((item) => item.status === "pending"),
          });
          dispatch({ type: "SET_DATA", payload: "pending" });
          break;
        default:
          dispatch({ type: "SET_TODOS", payload: receive });
          dispatch({ type: "SET_DATA", payload: "data added" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //to hide/show the items
  const toggleAccordion = (id) => {
    dispatch({ type: "SET_IS_OPEN", payload: !isOpen });
    dispatch({ type: "SET_CONFIRM_ID", payload: id });
  };

  //to view the completed, pending or all items
  const toggleMode = () => {
    if (mode === "input") {
      dispatch({ type: "SET_MODE", payload: "completed" });
    } else if (mode === "completed") {
      dispatch({ type: "SET_MODE", payload: "pending" });
    } else {
      dispatch({ type: "SET_MODE", payload: "input" });
    }
  };

  //to show/hide items
  const toggleVisibility = () => {
    dispatch({ type: "SET_IS_HIDDEN", payload: !isHidden });
    dispatch({ type: "SET_ACCORDIAN_CHECKED", payload: !accordianChecked });
  };

  //to save data when enter is pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch({ type: "SET_ENABLE_ALERT", payload: true });
      dispatch({ type: "SET_VARIANT", payload: "primary" });
      dispatch({ type: "SET_ALERT", payload: "Loading..." });

      sendDataToBackend();
      dispatch({ type: "SET_DATA", payload: "data posted" });
      dispatch({ type: "SET_INPUT_VALUE", payload: "" });
    }
  };

  //to delete data from db
  const removeTodo = async (id) => {
    try {
      dispatch({ type: "SET_VARIANT", payload: "primary" });
      dispatch({ type: "SET_ALERT", payload: "Loading..." });
      dispatch({ type: "SET_ENABLE_ALERT", payload: true });
      const add = await removeData(id);
    } catch (error) {
      console.log(error);
    }
  };

  //to mark the item completed in db
  const updateTodo = (id) => {
    dispatch({ type: "SET_VARIANT", payload: "primary" });
    dispatch({ type: "SET_ALERT", payload: "Loading..." });
    dispatch({ type: "SET_ENABLE_ALERT", payload: true });
    handleIconToggle(id);
    dispatch({ type: "SET_DATA", payload: "data updated" });
  };

  //function that actually marks the item status
  const handleIconToggle = async (id) => {
    try {
      const data = await updateData(id);
    } catch (error) {
      console.log(error);
    }
  };

  //handles input value
  const handleChange = (e) => {
    dispatch({ type: "SET_INPUT_VALUE", payload: e.target.value });
  };

  //to save data to db
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
          <Alert
            variant={variant}
            onClose={() =>
              dispatch({ type: "SET_ENABLE_ALERT", payload: false })
            }
            dismissible
          >
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
