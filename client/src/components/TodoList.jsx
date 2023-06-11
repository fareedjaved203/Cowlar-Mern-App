import React from "react";
import TodoItem from "./TodoItem";

//props are passed here and this component is helping to maintain UI
const TodoList = ({
  todos,
  toggleAccordion,
  handleIconToggle,
  removeTodo,
  isHidden,
  isOpen,
  confirmId,
}) => {
  return (
    <div className="item-display">
      {isHidden ? null : (
        <ul>
          {todos.map((value) => (
            <TodoItem
              key={value._id}
              value={value}
              toggleAccordion={toggleAccordion}
              handleIconToggle={handleIconToggle}
              removeTodo={removeTodo}
              isOpen={isOpen}
              confirmId={confirmId}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
