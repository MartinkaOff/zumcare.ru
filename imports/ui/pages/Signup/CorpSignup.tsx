import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Formik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import MaskedInput from 'react-text-mask';
import './Signup.css';
import { useMultipleCompanies } from '../../../helpers/hooks/useMultipleCompany';

export function CorpSignup() {
  const history = useHistory();
  const { t } = useTranslation();

  const { companies } = useMultipleCompanies();
  const companiesList = companies.map(item => item.company)

  const onSubmitHandler = (form) => {
    console.log(form)
    Meteor.call('users.insert', form, (err, res) => {
      if (err) {
        alert(err);
      } else {
        Meteor.loginWithPassword(
          { username: form.email },
          form.password,
          (err) => {
            if (err) console.log(err);
            else {
              history.push('/cabinet');
            }
            console.log(err);
          },
        );
      }
    });
  };

  const schema = yup.object().shape({
    name: yup.string().required(t('nameIsRequired') || undefined),
    surname: yup.string().required(t('surnameIsRequired') || undefined),
    email: yup
      .string()
      .email(t('emailInvalid') || undefined)
      .required(t('emailIsRequired') || undefined),
    password: yup
      .string()
      .required(t('passwordRequired') || undefined)
      .min(8, t('passwordTooShort') || undefined)
      .matches(/[a-zA-Z]/, t('passwordLatinLettersOnly') || undefined),
    phone: yup.string().required(t('phoneRequired') || undefined),
    confirmPassword: yup
      .string()
      .required(t('passwordRequired') || undefined)
      .min(8, t('passwordTooShort') || undefined)
      .oneOf([yup.ref('password'), null], t('passwordNotConfirm') || undefined)
      .matches(/[a-zA-Z]/, t('passwordLatinLettersOnly') || undefined),
    userType: yup.string().required(t('userTypeIsRequired') || undefined),
    terms: yup
      .bool()
      .required()
      .oneOf([true], t('termsMustBeAccepted') || undefined),
    company: yup.string().required('Компания обязательна' || undefined)
  });

  const phoneNumberMask = [
    '+',
    7,
    ' ',
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  return (
    <Container>
      <Row style={{ padding: '2rem', justifyContent: 'center' }}>
        <Col xxl={10} xl={8} lg={10}>
          <Card style={{ padding: '2rem', borderRadius: '15px' }}>
            <Card.Title style={{ textAlign: 'center' }}>
              {t('signup')}
            </Card.Title>
            <Card.Body>
              <Formik
                validationSchema={schema}
                onSubmit={onSubmitHandler}
                initialValues={{
                  name: '',
                  surname: '',
                  email: '',
                  password: '',
                  phone: '',
                  confirmPassword: '',
                  userType: 'client',
                  terms: false,
                  company: ''
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className='mb-3'>
                      <Form.Group
                        as={Col}
                        md='6'
                        sm='12'
                        controlId='validationFormik01'
                        style={{ paddingBottom: '1rem' }}
                      >
                        <Form.Label>{t('name')}</Form.Label>
                        <Form.Control
                          type='text'
                          name='name'
                          placeholder={t('name') as string}
                          value={values.name}
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          isInvalid={!!errors.name}
                        />
                        <span className='error-message'>
                          <ErrorMessage name='name' />
                        </span>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md='6'
                        sm='12'
                        controlId='validationFormik02'
                      >
                        <Form.Label>{t('surname')}</Form.Label>
                        <Form.Control
                          type='text'
                          name='surname'
                          placeholder={t('surname') as string}
                          value={values.surname}
                          onChange={handleChange}
                          isValid={touched.surname && !errors.surname}
                          isInvalid={!!errors.surname}
                        />
                        <span className='error-message'>
                          <ErrorMessage name='surname' />
                        </span>
                      </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                      <Form.Group
                        as={Col}
                        md='6'
                        sm='12'
                        controlId='validationFormikEmail'
                        style={{ paddingBottom: '1rem' }}
                      >
                        <Form.Label>{t('email')}</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text id='inputGroupPrepend'>
                            @
                          </InputGroup.Text>
                          <Form.Control
                            type='email'
                            placeholder={t('email') as string}
                            aria-describedby='inputGroupPrepend'
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.email}
                          />
                        </InputGroup>
                        <span className='error-message'>
                          <ErrorMessage name='email' />
                        </span>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md='6'
                        sm='12'
                        controlId='validationFormikUsername'
                      >
                        <Form.Label>{t('password')}</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='password'
                            placeholder={t('password') as string}
                            aria-describedby='inputGroupPrepend'
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            isValid={touched.password && !errors.password}
                            isInvalid={!!errors.password}
                          />
                        </InputGroup>
                        <span className='error-message'>
                          <ErrorMessage name='password' />
                        </span>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md='6'
                        sm='12'
                        controlId='validationFormikPhone'
                      >
                        <Form.Label>{t('phone')}</Form.Label>
                        <Field name='phone'>
                          {({ field }) => (
                            <MaskedInput
                              {...field}
                              value={values.phone}
                              type='text'
                              mask={phoneNumberMask}
                              placeholder={t('phonePlaceholder')}
                              onChange={handleChange}
                              className='input-mask'
                            />
                          )}
                        </Field>
                        <span className='error-message'>
                          <ErrorMessage name='phone' />
                        </span>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md='6'
                        sm='12'
                        controlId='validationFormikConfirmPassword'
                      >
                        <Form.Label>{t('confirmPassword')}</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='password'
                            placeholder={t('confirmPassword') as string}
                            aria-describedby='inputGroupPrepend'
                            name='confirmPassword'
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isValid={
                              touched.confirmPassword && !errors.confirmPassword
                            }
                            isInvalid={!!errors.confirmPassword}
                          />
                        </InputGroup>
                        <span className='error-message'>
                          <ErrorMessage name='confirmPassword' />
                        </span>
                      </Form.Group>
                    </Row>
                    <Row className='mb-3' style={{ justifyContent: 'center' }}>
                      <Form.Group
                        as={Col}
                        md='8'
                        sm='12'
                        controlId='validationFormikCompany'
                      >
                        <Form.Select
                          required
                          name='company'
                          aria-label={t('company') as string}
                          style={{ marginTop: '2rem' }}
                          onChange={handleChange}
                          isValid={touched.company && !errors.company}
                          isInvalid={!!errors.company}
                        >
                          <option value=''>{t('select')}</option>
                          {companiesList.map(company => (
                            <option value={company}>{company}</option>
                          ))}

                        </Form.Select>
                        <span className='error-message'>
                          <ErrorMessage name='company' />
                        </span>
                      </Form.Group>
                    </Row>
                    <Row className='mb-3' style={{ justifyContent: 'center' }}>
                      <Form.Group as={Col} md='8' sm='12'>
                        <Form.Check
                          required
                          name='terms'
                          label={t('agreeToTerms')}
                          onChange={handleChange}
                          isInvalid={!!errors.terms}
                          feedback={errors.terms}
                          feedbackType='invalid'
                          id='validationFormik0'
                        />
                      </Form.Group>
                    </Row>
                    <div
                      className='d-grid gap-2'
                      style={{ paddingTop: '2rem' }}
                    >
                      <Button variant='primary' type='submit' size='lg'>
                        {t('enroll')}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
