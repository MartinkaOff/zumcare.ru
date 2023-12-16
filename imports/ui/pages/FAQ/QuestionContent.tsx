import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';

export function FAQContent(props) {
  const { show, setShow } = props;
  let history = useHistory();

  const handleClose = () => setShow(false);

  const onSubmitHandler = (values) => {
    Meteor.call('userQuestions.insert', values, (err, res) => {
      if (err) {
        alert(err);
      } else {
        handleClose();
        history.push('/faq');
      }
    });
  };

  const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    email: yup
      .string()
      .email('please, provide a correct email address')
      .required('please, provide a correct email address'),
    question: yup.string().required('write a question please'),
  });

  const fields = [
    {
      type: 'text',
      placeholder: 'Как к вам обращаться?',
      name: 'name',
    },
    {
      type: 'type',
      placeholder: 'На какой E-Mail прислать ответ?',
      name: 'email',
    },
    {
      as: 'textarea',
      rows: 3,
      placeholder: 'Ваш вопрос',
      name: 'question',
    },
  ];

  const asMap = {
    textarea: 'textarea',
    select: 'select',
    input: 'input',
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmitHandler}
      initialValues={{
        name: '',
        email: '',
        question: '',
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {fields.map((field) => {
            const AsComponent = asMap[field.as as any] || 'input';
            return (
              <Form.Group
                className='mb-3'
                controlId={`exampleForm.ControlInput1-${field.name}`}
                key={field.name}
              >
                <Form.Control
                  type={field.type}
                  as={AsComponent}
                  rows={field.rows}
                  placeholder={field.placeholder}
                  autoFocus={field.name === 'name'}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                />
                <span className='error-message'>
                  <ErrorMessage name={field.name} />
                </span>
              </Form.Group>
            );
          })}
          <div style={{ textAlign: 'center' }}>
            <Button type='submit' variant='primary'>
              Отправить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
