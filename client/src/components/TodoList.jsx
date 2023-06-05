import React from "react";
import TodoItem from "./TodoItem";

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
