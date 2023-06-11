import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaExchangeAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";

//props are passed here
const TodoInput = ({
  mode,
  toggleMode,
  inputValue,
  handleKeyPress,
  handleChange,
  isHidden,
  toggleVisibility,
}) => {
  return (
    <div className="item-adder" data-testid="Add Item">
      <Container>
        <Row>
          <Col>
            <FaExchangeAlt
              data-testid="exchange-icon"
              size={25}
              style={{ color: "white", cursor: "pointer" }}
              onClick={toggleMode}
            />
          </Col>
          <Col xs={8} data-testid="mode-selector">
            {mode === "input" ? (
              <input
                placeholder="Add Item"
                className="input"
                name="todo"
                type="text"
                value={inputValue}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                autoComplete="off"
              />
            ) : mode === "completed" ? (
              <input
                placeholder="Completed Items"
                className="input"
                name="todo"
                type="text"
                value={inputValue}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                disabled
              />
            ) : (
              <input
                placeholder="Pending Items"
                className="input"
                name="todo"
                type="text"
                value={inputValue}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                disabled
              />
            )}
          </Col>
          <Col>
            {isHidden ? (
              <IoIosArrowUp
                data-testid="visibility-icon"
                size={30}
                style={{ color: "white", cursor: "pointer" }}
                onClick={toggleVisibility}
              />
            ) : (
              <MdKeyboardArrowDown
                data-testid="visibility-icon"
                size={30}
                style={{ color: "white", cursor: "pointer" }}
                onClick={toggleVisibility}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TodoInput;
