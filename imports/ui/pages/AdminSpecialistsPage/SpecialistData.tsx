import React, { useState } from 'react';
import { Col, Card, Button, Form, Row, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import { FormikFormControlGroup } from '../../components/FormikFormControlGroup/FormikFormControlGroup';
import { PopupModal } from '../../components/PopupModal/PopupModal';
import { schemaSpecialists } from '../../components/Table/schema';
import { usePhoto } from '../../../helpers/hooks/usePhoto';
import { useTranslation } from 'react-i18next';
import { Sessions } from '../Sessions/Sessions';
import Swal from 'sweetalert2';
import { Loading } from '../../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';

export function SpecialistData() {
  const { userId } = useParams();
  const { specialist, isSpecialistLoading } = useSpecialist(userId);
  //@ts-ignore
  const user = Meteor.user()?.profile?.userType;
  const [showModal, setShowModal] = useState(false);
  const [showModalManager, setShowModalManager] = useState(false);
  const { photo, isPhotoLoading } = usePhoto(userId);
  const { t } = useTranslation();

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModalManager = () => {
    setShowModalManager(false);
  };
  const openModalManager = () => {
    setShowModalManager(true);
  };

  const removeSpecialist = () => {
    history.back()
    Meteor.call('specialists.remove', specialist.userId,
    Swal.fire({
      title: 'Success!',
      text: `Пользователь успешно удален!`,
      icon: 'success',
      preConfirm: () => {
        closeModal()
      }
    }));

  };

  const onSubmitHandler = (form: any) => {
    Meteor.call(
      'specialists.updateTableData',
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

  return !isPhotoLoading && !isSpecialistLoading ? (
    <Col style={{ justifyContent: 'center', paddingBottom: '1rem' }}>
      <PopupModal
        show={showModal}
        onHide={closeModal}
        content={
          <Formik
            validationSchema={schemaSpecialists}
            onSubmit={onSubmitHandler}
            initialValues={{
              name: specialist && specialist.name,
              surname: specialist && specialist.surname,
              age: specialist && specialist.age,
              gender: specialist && specialist.gender,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className='mb-3'>
                  {['name', 'surname', 'age', 'gender'].map((el) => (
                    <FormikFormControlGroup
                      xl='4'
                      lg='4'
                      md='4'
                      sm='12'
                      xs='12'
                      name={el}
                      value={values[el] || ''}
                      handleChange={handleChange}
                      touched={touched[el]}
                      errors={errors[el]}
                      placeholder={el.charAt(0).toUpperCase() + el.slice(1)}
                      type='text'
                      key={el}
                    />
                  ))}
                </Row>
                <div className='d-grid gap-2' style={{ paddingTop: '2rem' }}>
                  <center
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Button
                      variant='primary'
                      type='submit'
                      size='lg'
                      style={{ width: '40%' }}
                    >
                      Сохранить
                    </Button>
                    <Button
                      variant='danger'
                      size='lg'
                      style={{ width: '40%' }}
                      onClick={removeSpecialist}
                    >
                      Удалить
                    </Button>
                  </center>
                </div>
              </Form>
            )}
          </Formik>
        }
        title='Настройки'
        closeButton={true}
      />
      <PopupModal
        show={showModalManager}
        onHide={closeModalManager}
        content={<Sessions specialist={specialist} />}
        title='Info'
        closeButton={true}
      />
      <Container>
        <Card style={{ padding: '1rem' }}>
          <Card.Body style={{ padding: '1rem' }}>
            <Card.Title>
              {specialist.name} {specialist.surname}
            </Card.Title>
            <Row>
              <Col sm={12} md={4}>
                {photo && (
                  <Card.Img
                    style={{ maxWidth: 300 }}
                    variant='top'
                    src={photo?.photo}
                  />
                )}
              </Col>
              <Col md={8}>
                <Row>
                  <p>
                    <b>Email:</b> <br /> {specialist.email}
                  </p>
                  <p>
                    <b>{t('age')}:</b> <br /> {specialist.age}
                  </p>
                  <p>
                    <b>{t('gender')}:</b> <br /> {specialist?.gender === 'male' ? t("male") : t("female") }
                  </p>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'center' }}>
                    {user === 'admin' ? (
                      <Button onClick={openModal}>{t('settings')}</Button>
                    ) : (
                      <Button onClick={openModalManager}>{t('info')}</Button>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Col>
  ) : (
    <Loading />
  );
}
