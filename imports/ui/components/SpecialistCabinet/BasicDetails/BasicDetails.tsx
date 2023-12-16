import React from 'react';
import { Loading } from '../../Loading/Loading';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Specialist } from '../../../../helpers/types';
import { FormikFormControlGroup } from '../../FormikFormControlGroup/FormikFormControlGroup';
import { UpdateAvatar } from '../../UpdateAvatar/UpdateAvatar';
import { usePhoto } from '../../../../helpers/hooks/usePhoto';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import './BasicDetails.css';

export function BasicDetails({
  specialist,
  isLoading,
}: {
  specialist: Specialist;
  isLoading: boolean;
}) {
  const { photo, isPhotoLoading } = usePhoto(specialist?.userId);
  const { t } = useTranslation();

  const onSubmitHandler = (form: any) => {
    form.age = parseInt(form.age);
    Meteor.call(
      'specialists.updateBasicDetails',
      form,
      specialist.userId,
      (err: object) => {
        if (err) console.log(err);
        Swal.fire({
          title: 'Success!',
          text: 'Your data was updated!',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      },
    );
  };

  const schema = yup.object().shape({
    name: yup.string().required(t('nameIsRequired') || undefined),
    surname: yup.string().required(t('surnameIsRequired') || undefined),
    age: yup
      .string()
      .matches(/^[0-9]+$/, t('onlyDigits') || undefined)
      .min(2, t('onlyToDigits') || undefined)
      .max(2, t('onlyToDigits') || undefined),
    gender: yup.string(),
  });

  return !isLoading ? (
    <Container>
      <Row style={{ padding: '2rem', justifyContent: 'center' }}>
        <Col>
          <Card style={{ padding: '2rem', borderRadius: '15px' }}>
            <Card.Title style={{ textAlign: 'center' }}>
              {t('basicDetail')}
            </Card.Title>
            <Card.Body>
              <Row>
                <Col lg='4' md='12' sm='12' style={{ marginRight: '4rem' }}>
                  {!isPhotoLoading ? (
                    <UpdateAvatar {...specialist} photo={photo?.photo} />
                  ) : (
                    <Loading />
                  )}
                </Col>

                <Col lg='6' md='12' sm='12'>
                  <Formik
                    validationSchema={schema}
                    onSubmit={onSubmitHandler}
                    initialValues={{
                      name: specialist && specialist.name,
                      surname: specialist && specialist.surname,
                      age: specialist && specialist.age,
                      gender: specialist && specialist.gender,
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      errors,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Row className='mb-3'>
                          {['name', 'surname'].map((el) => (
                            <FormikFormControlGroup
                              xl='6'
                              lg='12'
                              md='12'
                              sm='12'
                              xs='12'
                              name={el}
                              value={values[el]}
                              handleChange={handleChange}
                              touched={touched[el]}
                              errors={errors[el]}
                              placeholder={
                                el.charAt(0).toUpperCase() + el.slice(1)
                              }
                              type='text'
                              key={el}
                            />
                          ))}
                        </Row>
                        <Row className='mb-3'>
                          {['age'].map((el) => (
                            <FormikFormControlGroup
                              xl='6'
                              lg='6'
                              md='6'
                              sm='12'
                              xs='12'
                              name={el}
                              value={values[el]}
                              handleChange={handleChange}
                              touched={touched[el]}
                              errors={errors[el]}
                              placeholder={t('age')}
                              type='text'
                              key={el}
                            />
                          ))}
                          <Form.Group
                            as={Col}
                            lg='6'
                            md='6'
                            sm='12'
                            controlId='gender'
                          >
                            <Form.Label>{t('gender')}</Form.Label>
                            <Form.Select
                              name='gender'
                              defaultValue={values.gender}
                              aria-label='Select'
                              onChange={handleChange}
                              isValid={touched.gender && !errors.gender}
                              isInvalid={!!errors.gender}
                            >
                              <option value=''>{t('notApplicable')}</option>
                              <option value='male'>{t('male')}</option>
                              <option value='female'>{t('female')}</option>
                            </Form.Select>
                            <span className='error-message'>
                              <ErrorMessage name='gender' />
                            </span>
                          </Form.Group>
                        </Row>
                        <div
                          className='d-grid gap-2'
                          style={{ paddingTop: '2rem' }}
                        >
                          <center>
                            <Button
                              variant='primary'
                              type='submit'
                              size='lg'
                              style={{ width: '70%' }}
                            >
                              {t('save')}
                            </Button>
                          </center>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Loading />
  );
}
