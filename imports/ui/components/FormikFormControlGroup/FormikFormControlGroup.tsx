import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

export function FormikFormControlGroup({
  touched,
  errors,
  value,
  handleChange,
  xl,
  lg,
  md,
  sm,
  xs,
  name,
  placeholder,
  type,
}) {
  const { t } = useTranslation();
  return (
    <Form.Group
      as={Col}
      xl={xl}
      lg={lg}
      md={md}
      sm={sm}
      xs={xs}
      controlId={name}
      style={{ paddingBottom: '1rem' }}
    >
      <Form.Label>
        {/* name.charAt(0).toUpperCase() + name.slice(1) */ t(name)}
      </Form.Label>
      <Form.Control
        as={type === 'textarea' ? 'textarea' : undefined}
        type={type === 'text' ? 'text' : undefined}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        isValid={touched && !errors}
        isInvalid={!!errors}
      />
      <span className='error-message'>
        <ErrorMessage name={name} />
      </span>
    </Form.Group>
  );
}
