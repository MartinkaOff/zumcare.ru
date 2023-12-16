import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { usePickerQuestions } from "../../../helpers/hooks/usePickerQuestions";
import { Loading } from "../Loading/Loading";

export function CreatePickerQuestions() {
  const { isPickerQuestionsLoading } = usePickerQuestions();
  const [newQuestion, setNewQuestion] = useState({
    name: "",
    content: "",
    type: "",
    options: [""],
  });

  const handleNewQuestionSubmit = (event) => {
    event.preventDefault();
    Meteor.call("pickerQuestions.insert", newQuestion);
    setNewQuestion({
      name: "",
      content: "",
      type: "",
      options: [],
    });
  };

  return !isPickerQuestionsLoading ? (
    <Container>
      <Row style={{ paddingBottom: "2rem" }}>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title style={{ paddingBottom: "1rem" }}>
                Create new question
              </Card.Title>
              <Form onSubmit={handleNewQuestionSubmit}>
                <Form.Group style={{ paddingBottom: "1rem" }}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter question name"
                    value={newQuestion.name}
                    onChange={(event) =>
                      setNewQuestion({
                        ...newQuestion,
                        name: event.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group style={{ paddingBottom: "1rem" }}>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter question content"
                    value={newQuestion.content}
                    onChange={(event) =>
                      setNewQuestion({
                        ...newQuestion,
                        content: event.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group style={{ paddingBottom: "1rem" }}>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={newQuestion.type}
                    onChange={(event) =>
                      setNewQuestion({
                        ...newQuestion,
                        type: event.target.value,
                      })
                    }
                  >
                    <option value="">Select question type</option>
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group style={{ paddingBottom: "1rem" }}>
                  <Form.Label>Options</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter comma-separated options"
                    value={newQuestion.options.join(", ")}
                    onChange={(event) =>
                      setNewQuestion({
                        ...newQuestion,
                        options: event.target.value.split(", "),
                      })
                    }
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ float: "right" }}
                >
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Loading />
  );
}
