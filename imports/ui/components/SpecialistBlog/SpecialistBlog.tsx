import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useMultipleBlogs } from "../../../helpers/hooks/useMultipleBlogs";
import { Loading } from "../../components/Loading/Loading";
import { Formik } from "formik";
import { useSpecialist } from "../../../helpers/hooks/useSpecialist";

export function SpecialistBlog() {
  const { blogs, isBlogsLoading } = useMultipleBlogs();
  const { specialist, isSpecialistLoading } = useSpecialist();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = (values: object) => {
    Meteor.call("blogs.insert", values, (err, res) => {
      if (err) {
        alert(err);
      }
    });
  };

  return !isBlogsLoading ? (
    <Container>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "2rem",
          }}
        >
          <h2 style={{ position: "absolute" }}>Статьи и новости</h2>
          <Button
            variant="primary"
            onClick={handleShow}
            style={{ marginLeft: "auto" }}
          >
            Create new post
          </Button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              onSubmit={onSubmitHandler}
              initialValues={{
                author: specialist?.surname && specialist?.name,
                title: "",
                content: "",
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group style={{ paddingBottom: "2rem" }}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      required
                      placeholder="Enter a title for your post"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleClose}
                    style={{ float: "right" }}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </>
    </Container>
  ) : (
    <Loading />
  );
}
