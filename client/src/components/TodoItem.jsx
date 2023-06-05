import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FaGripLines } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";

const TodoItem = ({
  value,
  toggleAccordion,
  handleIconToggle,
  removeTodo,
  isOpen,
  confirmId,
}) => {
  return (
    <li key={value._id}>
      <Container>
        <Row>
          <Col>
            {value.status === "completed" ? (
              <BsCheckCircleFill size={20} style={{ color: "black" }} />
            ) : (
              <BsCircle
                onClick={() => handleIconToggle(value._id)}
                size={20}
                style={{ color: "black" }}
              />
            )}
          </Col>
          <Col xs={8} onClick={() => toggleAccordion(value._id)}>
            {value.task}
          </Col>
          <Col>
            <RxDragHandleDots2
              size={20}
              style={{ color: "black" }}
              onClick={() => removeTodo(value._id)}
            />
          </Col>
        </Row>
        {isOpen && confirmId === value._id && (
          <Container>
            <Row>
              <b>Start Time:</b> {value.startTime}
            </Row>
            <Row>
              <b>Completion Time:</b> {value.completionTime}
            </Row>
            <Row>
              <b>Status:</b> {value.status}
            </Row>
          </Container>
        )}
      </Container>
      <hr />
    </li>
  );
};

export default TodoItem;
