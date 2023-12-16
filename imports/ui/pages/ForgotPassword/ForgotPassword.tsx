import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    InputGroup,
} from "react-bootstrap";
import { Formik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";

export function ForgotPassword() {

    let history = useHistory();

    const { t, i18n } = useTranslation();

    const urlParams = new URLSearchParams(window.location.search)
    const tokenParams = urlParams.get('email')


    const onSubmitHandler = (form) => {
        if (form.password === form.confirmPassword) {
            //@ts-ignore
            Meteor.call(
                'users.resetPassword',
                tokenParams,
                form.password,
                Swal.fire({
                    title: 'Success!',
                    text: i18n.language === 'en' ? "Password changed successfully!" : "Пароль успешно изменен!",
                    icon: 'success'
                })
            )

            history.push('/login')
            Meteor.logout();
        }
    };
    const schema = yup.object().shape({
        password: yup
            .string()
            .required(t('passwordRequired') || undefined)
            .min(8, t('passwordTooShort') || undefined)
            .matches(/[a-zA-Z]/, t('passwordLatinLettersOnly') || undefined),
        confirmPassword: yup
            .string()
            .required(t('passwordRequired') || undefined)
            .min(8, t('passwordTooShort') || undefined)
            .oneOf([yup.ref('password'), null], t('passwordNotConfirm') || undefined)
            .matches(/[a-zA-Z]/, t('passwordLatinLettersOnly') || undefined)
    });

    return (
        <Container>
            <Row style={{ padding: '2rem', justifyContent: 'center' }}>
                <Col xxl={10} xl={8} lg={10}>
                    <Card style={{ padding: '2rem', borderRadius: '15px' }}>
                        <Card.Title style={{ textAlign: 'center' }}>
                            {t('passwordReset')}
                        </Card.Title>
                        <Card.Body>
                            <Formik
                                validationSchema={schema}
                                onSubmit={onSubmitHandler}
                                initialValues={{
                                    password: '',
                                    confirmPassword: '',
                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className='mb-3'>
                                            <Form.Group
                                                as={Col}
                                                md='6'
                                                sm='12'
                                                controlId='validationFormikUsername'
                                            >
                                                <Form.Label>{t("newPassword")}</Form.Label>
                                                <InputGroup hasValidation>
                                                    <Form.Control
                                                        type='password'
                                                        placeholder={t("newPassword") as string}
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
                                                controlId='validationFormikConfirmPassword'
                                            >
                                                <Form.Label>{t("confirmPassword")}</Form.Label>
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
                                        <div
                                            className='d-grid gap-2'
                                            style={{ paddingTop: '2rem' }}
                                        >
                                            <Button style={{ margin: "0 auto", width: "30%" }} variant='primary' type='submit'>
                                                {t('accept')}
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
    )
} 