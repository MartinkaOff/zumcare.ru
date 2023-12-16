import React, {useState} from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import {Formik} from 'formik';
import {schema} from './schema';
import {FormikFormControlGroup} from '../../FormikFormControlGroup/FormikFormControlGroup';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import './BasicDetail.css'

export function BasicDetail() {

  const admin = Meteor.user();

  const [adminUsername, setAdminUsername] = useState(admin?.username);
  const [adminName, setAdminName] = useState(admin?.profile?.name);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPhone, setAdminPhone] = useState('+7 707 972 5098')

  const { t } = useTranslation();
    
  const onHandleChangePassword = (e) => {
    setAdminPassword(e.target.value);
  }

  const onSubmitHandler = (form: any) => {
    const data = {
      username: adminUsername,
      name: adminName,
      phone: adminPhone
    }
    Meteor.call(
        'admin.updateBasicDetail',
        data,
        admin._id,
        (err: object) => {
            if (err) console.log(err);
            Swal.fire({
                title: 'Success!',
                text: 'Your data was update',
                icon: 'success',
                confirmButtonText: 'Cool',
            });
        }
    );

    if (adminPassword !== '' || adminPassword.length > 0) {
      Meteor.call(
        'admin.changePassword',
        admin._id,
        adminPassword,
        (err: object) => {
            if (err) console.log(err);
            Swal.fire({
                title: 'Success!',
                text: 'Your data was update',
                icon: 'success',
                confirmButtonText: 'Cool',
            });
        }
    );
    }
};

    return(
        <Container>
          <Row style={{padding: '2rem', justifyContent: 'center'}}>
            <Col>
              <Card style={{padding: '2rem', borderRadius: '15px'}}>
                <Card.Title style={{textAlign: 'center'}}>{t("basicDetail")}</Card.Title>
                <Card.Body>
                  <Row>
                    <Col lg='6' md='12' sm='12' style={{margin: '0 auto'}}>
                      <Formik
                        validationSchema={schema}
                        onSubmit={onSubmitHandler}
                        initialValues={{
                          username: adminUsername,
                          name: adminName,
                          password: adminPassword,
                          phone: adminPhone,
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
                              {/* {[t("username"), t("name")].map((el) => (
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
                              ))} */}
                              <FormikFormControlGroup
                                  xl='6'
                                  lg='12'
                                  md='12'
                                  sm='12'
                                  xs='12'
                                  name={t("username")}
                                  value={adminUsername}
                                  handleChange={(e) => setAdminUsername(e.target.value)}
                                  touched={touched.username}
                                  errors={errors.username}
                                  placeholder={
                                    "Username"
                                  }
                                  type='text'
                                  key={values.username}
                                />
                                <FormikFormControlGroup
                                  xl='6'
                                  lg='12'
                                  md='12'
                                  sm='12'
                                  xs='12'
                                  name={t("name")}
                                  value={adminName}
                                  handleChange={(e) => setAdminName(e.target.value)}
                                  touched={touched.name}
                                  errors={errors.name}
                                  placeholder={
                                    "Name"
                                  }
                                  type='text'
                                  key={values.name}
                                />
                            </Row>
                            <Row className='mb-3'>
                              {[t("password")].map((el) => (
                                <FormikFormControlGroup
                                  xl='6'
                                  lg='12'
                                  md='12'
                                  sm='12'
                                  xs='12'
                                  name={el}
                                  value={adminPassword}
                                  handleChange={onHandleChangePassword}
                                  touched={touched[el]}
                                  errors={errors[el]}
                                  placeholder={
                                    el.charAt(0).toUpperCase() + el.slice(1)
                                  }
                                  type='password'
                                  key={el}
                                />
                              ))}

                              {[t("phone")].map((el) => (
                                <FormikFormControlGroup
                                  xl='6'
                                  lg='12'
                                  md='12'
                                  sm='12'
                                  xs='12'
                                  name={el}
                                  value={adminPhone}
                                  handleChange={onHandleChangePassword}
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
                              <center>
                                <Button
                                  variant='primary'
                                  type='submit'
                                  size='lg'
                                  style={{width: '70%'}}
                                >
                                  {t("save")}
                                </Button>
                              </center>
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
      ) 
}