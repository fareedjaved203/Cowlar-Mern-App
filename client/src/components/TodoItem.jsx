import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiTwotoneDelete } from "react-icons/ai";
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
  const [formattedStartTime, setFormattedStartTime] = useState(null);
  const [formattedCompleteTime, setFormattedCompleteTime] = useState(null);
  useEffect(() => {
    const startTime = new Date(value.startTime);
    const completionTime = new Date(value.completionTime);
    const formattedStartTime = startTime.toLocaleTimeString();
    const formattedCompletionTime = completionTime.toLocaleTimeString();
    setFormattedStartTime(formattedStartTime);
    setFormattedCompleteTime(formattedCompletionTime);
  }, [value]);
  return (
    <li key={value._id}>
      <Container style={{ color: "white" }}>
        <Row>
          <Col style={{ cursor: "pointer" }}>
            {value.status === "completed" ? (
              <BsCheckCircleFill size={20} style={{ color: "white" }} />
            ) : (
              <BsCircle
                onClick={() => handleIconToggle(value._id)}
                size={20}
                style={{ color: "white" }}
              />
            )}
          </Col>
          <Col xs={8} onClick={() => toggleAccordion(value._id)}>
            {value.task}
          </Col>

          <Col>
            <AiTwotoneDelete
              size={20}
              style={{
                color: "#960C07",
                cursor: "pointer",
              }}
              onClick={() => removeTodo(value._id)}
            />
          </Col>
        </Row>
        {isOpen && confirmId === value._id && (
          <Container
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
            }}
          >
            <Row className="item-details">
              {" "}
              <span>Start Time: {formattedStartTime}</span>{" "}
            </Row>
            <Row className="item-details">
              {value.completionTime ? (
                <span>Completion Time: {formattedCompleteTime}</span>
              ) : (
                <span>Completion Time: N/A</span>
              )}
            </Row>
            <Row className="item-details">
              {" "}
              <span>Status: {value.status}</span>{" "}
            </Row>
          </Container>
        )}
      </Container>
      <hr />
    </li>
  );
};

export default TodoItem;
