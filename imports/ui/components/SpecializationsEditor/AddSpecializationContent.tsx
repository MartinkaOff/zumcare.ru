import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function AddSpecializationModal({ onHide }: { onHide(): void }) {
  const onSubmitHandler = (form: object) => {
    Meteor.call('specializations.insert', form, (err: object) => {
      console.log(err);
      onHide();
    });
  };

  const schema = yup.object().shape({
    title: yup.string().required('title is required'),
    description: yup.string().required('description is required'),
    specializationId: yup
      .string()
      .required('No specialization id provided.')
      .min(2, 'id is too short - should be 2 chars minimum.'),
  });

  const { t } = useTranslation();

  return (
    <Container>
      <Row style={{ justifyContent: 'center' }}>
        <h5>{t("fillInDetails")}</h5>
        <Col>
          <Formik
            validationSchema={schema}
            onSubmit={onSubmitHandler}
            initialValues={{
              specializationId: '',
              title: '',
              description: '',
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className='mb-3'>
                  <Form.Group
                    controlId='validationFormik01'
                    style={{ paddingBottom: '1rem' }}
                  >
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type='text'
                      name='specializationId'
                      //@ts-ignore
                      placeholder={t("specializationId")}
                      value={values.specializationId}
                      onChange={handleChange}
                      isValid={
                        touched.specializationId && !errors.specializationId
                      }
                      isInvalid={!!errors.specializationId}
                    />
                    <span className='error-message'>
                      <ErrorMessage name='specializationId' />
                    </span>
                  </Form.Group>
                  <Form.Group
                    controlId='validationFormik02'
                    style={{ paddingBottom: '1rem' }}
                  >
                    <Form.Label>{t("title")}</Form.Label>
                    <Form.Control
                      type='text'
                      name='title'
                      //@ts-ignore
                      placeholder={t('title')}
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
                    <Form.Label>{t("description")}</Form.Label>
                    <Form.Control
                      as='textarea'
                      style={{ height: '120px' }}
                      name='description'
                      //@ts-ignore
                      placeholder={t("description")}
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
                <div className='d-grid gap-2' style={{ paddingTop: '2rem' }}>
                  <center>
                    <Button
                      style={{ width: '70%', marginBottom: '1rem' }}
                      variant='primary'
                      type='submit'
                      size='lg'
                    >
                      {t("add")}
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
