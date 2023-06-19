import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";
import Alert from "react-bootstrap/Alert";
import { postData } from "../services/postData";
import { ToastContainer, toast } from "react-toastify";

const TodoItem = ({
  value,
  toggleAccordion,
  handleIconToggle,
  removeTodo,
  isOpen,
  confirmId,
}) => {
  //the dates stored in mongodb atlas were in ISO format, to format the data, I did these steps:
  const [formattedStartTime, setFormattedStartTime] = useState(null);
  const [formattedCompleteTime, setFormattedCompleteTime] = useState(null);
  const [enableAlert, isAlert] = useState(false);
  useEffect(() => {
    if (enableAlert) {
      const timer = setTimeout(() => {
        isAlert(false);
      }, 2000);

      // clean up the timer when the component unmounts or when enableAlert changes
      return () => {
        clearTimeout(timer);
      };
    }
    const startTime = new Date(value.startTime);
    const completionTime = new Date(value.completionTime);
    //dates are stored in this format 4:25:37 PM
    const formattedStartTime = startTime.toLocaleTimeString();
    const formattedCompletionTime = completionTime.toLocaleTimeString();
    setFormattedStartTime(formattedStartTime);
    setFormattedCompleteTime(formattedCompletionTime);
  }, [value, enableAlert]);
  return (
    <>
      {enableAlert && (
        <div className="custom-toast">
          <Alert variant="primary" onClose={() => isAlert(false)} dismissible>
            Task Already Completed!
          </Alert>
        </div>
      )}
      <li key={value._id} className="todo-item">
        <Container style={{ color: "white" }}>
          <Row>
            <Col style={{ cursor: "pointer" }}>
              {value.status === "completed" ? (
                <BsCheckCircleFill
                  data-testid="status-icon"
                  size={20}
                  style={{ color: "white" }}
                  onClick={() => isAlert(true)}
                />
              ) : (
                <BsCircle
                  onClick={() => handleIconToggle(value._id)}
                  data-testid="status-icon"
                  size={20}
                  style={{ color: "white" }}
                />
              )}
            </Col>
            <Col xs={8} onClick={() => toggleAccordion(value._id)}>
              <span data-testid="task-text">{value.task}</span>
            </Col>

            <Col>
              <AiTwotoneDelete
                data-testid="delete-icon"
                size={20}
                style={{
                  color: "white",
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
      </li>
    </>
  );
};

export default TodoItem;
