import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaGripLines } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";

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
    <div className="item-adder">
      <Container>
        <Row>
          <Col>
            <FaGripLines
              size={30}
              style={{ color: "white" }}
              onClick={toggleMode}
            />
          </Col>
          <Col xs={8}>
            {mode === "input" && (
              <input
                placeholder="To do list"
                type="text"
                value={inputValue}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
            )}
            {mode === "completed" && <p>Completed Tasks</p>}
            {mode === "pending" && <p>Pending Tasks</p>}
          </Col>
          <Col>
            {isHidden ? (
              <IoIosArrowUp
                size={30}
                style={{ color: "white" }}
                onClick={toggleVisibility}
              />
            ) : (
              <MdKeyboardArrowDown
                size={30}
                style={{ color: "white" }}
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
