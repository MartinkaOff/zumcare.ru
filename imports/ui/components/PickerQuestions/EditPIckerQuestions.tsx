import React from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { usePickerQuestions } from "../../../helpers/hooks/usePickerQuestions";
import { Loading } from "../Loading/Loading";

export function EditPickerQuestions() {
  const { questions, isPickerQuestionsLoading, updatePickerQuestions } =
    usePickerQuestions();

  const handleQuestionUpdate = (_id, name, content, type, options) => {
    updatePickerQuestions(_id, name, content, type, options);
  };

  return !isPickerQuestionsLoading ? (
    <Container>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Question</th>
            <th style={{ width: "10%" }}>Name</th>
            <th style={{ width: "30%" }}>Content</th>
            <th style={{ width: "10%" }}>Type</th>
            <th>Options</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.name}</td>
              <td>
                <Form.Control
                  type="text"
                  defaultValue={question.name}
                  onChange={(event) =>
                    handleQuestionUpdate(
                      question._id,
                      event.target.value,
                      question.content,
                      question.type,
                      question.options
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  defaultValue={question.content}
                  onChange={(event) =>
                    handleQuestionUpdate(
                      question._id,
                      question.name,
                      event.target.value,
                      question.type,
                      question.options
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  as="select"
                  defaultValue={question.type}
                  onChange={(event) =>
                    handleQuestionUpdate(
                      question._id,
                      question.name,
                      question.content,
                      event.target.value,
                      question.options
                    )
                  }
                >
                  <option value="text">Text</option>
                  <option value="radio">Radio</option>
                </Form.Control>
              </td>
              <td>
                {question.type !== "radio" ? null : (
                  <Form.Control
                    type="text"
                    defaultValue={question.options.join(", ")}
                    onChange={(event) =>
                      handleQuestionUpdate(
                        question._id,
                        question.name,
                        question.content,
                        question.type,
                        event.target.value.split(", ")
                      )
                    }
                  />
                )}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() =>
                    Meteor.call("pickerQuestions.remove", question._id)
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  ) : (
    <Loading />
  );
}
