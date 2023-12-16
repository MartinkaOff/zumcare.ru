import React, { useState } from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import { useBlog } from "../../../helpers/hooks/useBlog";
import { Loading } from "../../components/Loading/Loading";
import { useParams, useHistory } from "react-router-dom";
import { Formik } from "formik";

export function SpecialistContent() {
  const { id } = useParams();
  const { blog, isBlogLoading, updateBlog } = useBlog(id);
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(blog?.content || "");
  const [editedTitle, setEditedTitle] = useState(blog?.title || "");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(blog?.content || "");
    setEditedTitle(blog?.title || "");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(blog?.content || "");
    setEditedTitle(blog?.title || "");
  };

  const handleSubmit = (values) => {
    updateBlog(values.content, values.title);
    setIsEditing(false);
    setEditedContent("");
    setEditedTitle("");
  };

  const handleClick = () => {
    Meteor.call("blogs.remove", blog._id);
    {
      history.push(`/blog`);
    }
  };

  return (
    <>
      {isBlogLoading ? (
        <Loading />
      ) : (
        <Container>
          {isEditing ? (
            <Card>
              <Card.Body>
                <Formik
                  onSubmit={handleSubmit}
                  initialValues={{ content: editedContent, title: editedTitle }}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <Card.Text as="div">
                        <Form.Group>
                          <Card.Title>Title</Card.Title>
                          <Form.Control
                            type="text"
                            autoFocus
                            name="title"
                            defaultValue={editedTitle}
                            onChange={(event) => {
                              handleChange(event);
                              setEditedTitle(event.target.value);
                            }}
                            required
                          />
                          <hr />
                        </Form.Group>
                        <Form.Group>
                          <Card.Title>Content</Card.Title>
                          <Form.Control
                            as="textarea"
                            rows={10}
                            cols={20}
                            name="content"
                            onChange={handleChange}
                            defaultValue={editedContent}
                          />
                        </Form.Group>
                        <hr />
                      </Card.Text>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                      </Modal.Footer>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  <h2>{blog?.title}</h2>
                  <h4>{blog?.author}</h4>
                </div>
                <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                  {blog?.content}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={handleClick}
                  style={{ float: "right" }}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={handleEdit}
                  style={{ float: "right" }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </>
  );
}
