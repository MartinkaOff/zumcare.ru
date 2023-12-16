import React from 'react';
import {Row, Col, Form, Button, Container} from 'react-bootstrap';
import {Formik, ErrorMessage} from 'formik';
import * as yup from 'yup';

export function AddMethodicsContent({onHide}: {onHide(): void}) {
  const onSubmitHandler = (form: object) => {
    Meteor.call('methodics.insert', form, (err: object) => {
      console.log(err);
      onHide();
    });
  };

  const schema = yup.object().shape({
    title: yup.string().required('title is required'),
    description: yup.string().required('description is required'),
    methodicsId: yup
      .string()
      .required('No methodics id provided.')
      .min(2, 'id is too short - should be 2 chars minimum.'),
  });

  return (
    <Container>
      <Row style={{justifyContent: 'center'}}>
        <h5>Fill in details</h5>
        <Col>
          <Formik
            validationSchema={schema}
            onSubmit={onSubmitHandler}
            initialValues={{
              methodicsId: '',
              title: '',
              description: '',
            }}
          >
            {({handleSubmit, handleChange, values, touched, errors}) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className='mb-3'>
                  <Form.Group
                    controlId='validationFormik01'
                    style={{paddingBottom: '1rem'}}
                  >
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type='text'
                      name='methodicsId'
                      placeholder='methodicsId'
                      value={values.methodicsId}
                      onChange={handleChange}
                      isValid={touched.methodicsId && !errors.methodicsId}
                      isInvalid={!!errors.methodicsId}
                    />
                    <span className='error-message'>
                      <ErrorMessage name='methodicsId' />
                    </span>
                  </Form.Group>
                  <Form.Group
                    controlId='validationFormik02'
                    style={{paddingBottom: '1rem'}}
                  >
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type='text'
                      name='title'
                      placeholder='Title'
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                      isInvalid={!!errors.title}
                    />
                    <span className='error-message'>
                      <ErrorMessage name='title' />
                    </span>
                  </Form.Group>
                  <Form.Group controlId='validationFormik03'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      style={{height: '120px'}}
                      name='description'
                      placeholder='description'
                      value={values.description}
                      onChange={handleChange}
                      isValid={touched.description && !errors.description}
                      isInvalid={!!errors.description}
                    />
                    <span className='error-message'>
                      <ErrorMessage name='description' />
                    </span>
                  </Form.Group>
                </Row>
                <div className='d-grid gap-2' style={{paddingTop: '2rem'}}>
                  <center>
                    <Button
                      style={{width: '70%', marginBottom: '1rem'}}
                      variant='primary'
                      type='submit'
                      size='lg'
                    >
                      Add
                    </Button>
                  </center>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
