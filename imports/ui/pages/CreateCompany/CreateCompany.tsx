import { Formik, ErrorMessage } from "formik"
import React from "react"
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    InputGroup,
} from "react-bootstrap"
import * as yup from 'yup';
import Swal from "sweetalert2";
import { useMultipleClients } from "../../../helpers/hooks/useMultipleClients";

export function CreateCompany() {

    const schema = yup.object().shape({
        company: yup.string().required('Название компании обязательно' || undefined),
    });

    const { clients } = useMultipleClients();

    const clientWithCompany = clients.filter(client => client.company)

    console.log(clientWithCompany)

    const onSubmitHandler = (form) => {
        Meteor.call(
            'companies.insert',
            form,
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Компания создана',
                        icon: 'success',
                    });
                }
            },
        );
    }

    return (
        <Container>
            <Row>
                <Col xxl={10} xl={8} lg={10}>
                    <Card style={{ padding: '2rem', borderRadius: '15px' }}>
                        <Card.Title style={{ textAlign: 'center' }}>
                            Добавить компанию
                        </Card.Title>
                        <Card.Body>
                            <Formik
                                validationSchema={schema}
                                onSubmit={onSubmitHandler}
                                initialValues={{
                                    company: '',
                                }}>
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form>
                                        <Row className='mb-3'>
                                            <Form.Group
                                                as={Col}
                                                md='6'
                                                sm='12'
                                                controlId='validationFormik01'
                                                style={{ paddingBottom: '1rem' }}
                                            >
                                                <Form.Label>Компания</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    name='company'
                                                    placeholder={'Введите название компании' as string}
                                                    value={values.company}
                                                    onChange={handleChange}
                                                    isValid={touched.company && !errors.company}
                                                    isInvalid={!!errors.company}
                                                />
                                                <span className='error-message'>
                                                    <ErrorMessage name='company' />
                                                </span>
                                            </Form.Group>
                                        </Row>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleSubmit()}>
                                            Создать
                                        </Button>
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