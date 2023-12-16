import React, { useState } from 'react';
import { Row, Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { schema } from './schema';
import Swal from 'sweetalert2';
import { Loading } from '../../../components/Loading/Loading';
import { ErrorMessage } from 'formik';
import { useMultipleSchedules } from '../../../../helpers/hooks/useMultipleSchedules';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/ru';

export function Reception({
  specialist,
  client,
  // session,
  // sessions,
  isLoading,
  onHideModal,
  // openSchedule,
  selectedDays,
}) {
  const [handleLoading, setHandleLoading] = useState(false);

  const { schedules } = useMultipleSchedules();

  const currentSchedule = schedules.filter(item => item.specialistUserId === specialist?.userId);

  const { t } = useTranslation();

  const onSubmitHandler = async (form) => {
    setHandleLoading(true);

    const messageForSpec = {
      from: 'Zoomcare - Психологическая поддержка сотрудников <zn@healthbalance.kz>',
      to: specialist?.email,
      subject: 'К вам записались на прием',
      text: `К вам записались на прием
Клиент: ${client?.name}
Дата сеанса: ${selectedDays[0].start.toLocaleString("kk-KZ", { timeZone: 'Asia/Almaty' })}
Комментарий: ${form.comments}
Онлайн: ${form.online === 'yes' ? t('yes') : t('no')}
Убедитесь что у вас работают наушники, микрофон и видеокамера`,
    };
    const messageForClient = {
      from: 'Zoomcare - Психологическая поддержка сотрудников <zn@healthbalance.kz>',
      to: client?.email,
      subject: 'Запись на прием',
      text: `Вы записались на прием
Специалист: ${specialist?.name}
Дата сеанса: ${selectedDays[0].start.toLocaleString("kk-KZ", { timeZone: 'Asia/Almaty' })}
Онлайн: ${form.online === 'yes' ? t('yes') : t('no')}
Пожалуйста, убедитесь что у вас работают наушники, микрофон, видеокамера и качество связи
Переносить прием можно ТОЛЬКО ЗА 24 ЧАСА, тогда оплата не удерживается и можно перенести
По всем вопросам к администратору по номеру +7 707 310 6734`,
    };
    const messageForAdmin = {
      from: 'Zoomcare - Психологическая поддержка сотрудников <zn@healthbalance.kz>',
      to: 'zumcare@gmail.com',
      subject: 'Запись на прием',
      text: `Запись на прием специалиста ${specialist?.name} и клиента ${client?.name
        }
Дата сеанса: ${selectedDays[0].start.toLocaleString("kk-KZ", { timeZone: 'Asia/Almaty' })}
Комментарий: ${form.comments}
Онлайн: ${form.online === 'yes' ? t('yes') : t('no')}
Пожалуйста, свяжитесь с Клиентом - ${client?.phone} и Специалистом - ${specialist?.phone
        }`,
    };

    let sessionID = '';

    let roomUrl = '';
    await new Promise<void>((resolve, reject) => {
      Meteor.call('videoConnection.create', (error, response) => {
        //  if (error) {
        //   console.error('Error making HTTP request:', error);
        //   reject(error);
        // } else {
        //   roomUrl += 'https://www.video.zoomcare.kz/' + response;
        //   resolve();
        // } 
        roomUrl += 'https://video-zumcare-service.up.railway.app/';
        resolve();
      });
    });
    const roomData = {
      room: roomUrl,
      status: 'active',
      StartTime: new Date(),
      endTime: new Date(),
      schedule: selectedDays[0]?.start,
      step: currentSchedule[0]?.step,
      specialist: specialist?.email,
      client: client?.email,
      sessionID: sessionID,
    };

    await new Promise<void>((resolve, reject) => {
      form.clientId = client.userId;
      form.specialistId = specialist.userId;

      Meteor.call(
        'sessions.insert',
        form,
        roomData,
        messageForSpec,
        messageForClient,
        messageForAdmin,
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            sessionID = res;
            Swal.fire({
              title: 'Success!',
              text: 'Ваша заявка принята! Перед сессией вам придет уведомление на почту с ссылкой на сеанс!',
              icon: 'success',
              preConfirm: () => {
                onHideModal();
                window.location.reload();
              },
            });
            resolve();
          }
        },
      );
    });

    const clientName = client.name;
    const specialistName = specialist.name;
    const booked = () => {
      return selectedDays;
    };
    const data = {
      client: clientName,
      clientUserId: form.clientId,
      specialist: specialistName,
      specialistUserId: form.specialistId,
      booked: selectedDays[0],
    };
    if (selectedDays.length > 0) {
      Meteor.call('schedule.booked', data);
    }

    setHandleLoading(false);
  };

  return !isLoading ? (
    <div id='payBlock'>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmitHandler}
        initialValues={{
          clientName: client?.name,
          specialistName: specialist?.name,
          schedule: selectedDays,
          comments: '',
          online: 'yes',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Form.Group
                as={Col}
                xl='6'
                lg='12'
                md='12'
                sm='12'
                xs='12'
                controlId='clientName'
              >
                <Form.Label>{t("client")}</Form.Label>
                <Form.Control
                  type='text'
                  name='clientName'
                  defaultValue={values.clientName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                xl='6'
                lg='12'
                md='12'
                sm='12'
                xs='12'
                controlId='specialistName'
              >
                <Form.Label>{t('specialist')}</Form.Label>
                <Form.Control
                  type='text'
                  name='specialistName'
                  value={values.specialistName}
                  disabled
                />
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group
                as={Col}
                xl='6'
                lg='12'
                md='12'
                sm='12'
                xs='12'
                controlId='comments'
              >
                <Form.Label>{t('comment')}</Form.Label>
                <Form.Control
                  type='text'
                  name='comments'
                  placeholder={t('comment')}
                  value={values.comments}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                xl='6'
                lg='6'
                md='12'
                sm='12'
                xs='12'
                controlId='online'
              >
                <Form.Label>{t('online')}</Form.Label>
                <Form.Select
                  name='online'
                  defaultValue={values.online}
                  aria-label='Select'
                  onChange={handleChange}
                  isValid={touched.online && !errors.online}
                  isInvalid={!!errors.online}
                >
                  <option selected={true} value='yes'>{t('yes')}</option>
                  <option value='no'>{t('no')}</option>
                </Form.Select>
                <span className='error-message'>
                  <ErrorMessage name='online' />
                </span>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group
                as={Col}
                xl='6'
                lg='12'
                md='12'
                sm='12'
                xs='12'
                controlId='schedule'
              >
                <Form.Label>{t("date")}</Form.Label>
                <Form.Control
                  type='text'
                  name='schedule'
                  value={moment(selectedDays[0].start).format('MMMM Do YYYY, HH:mm')}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Button
              style={{ width: '45%', display: 'block', margin: '0 auto' }}
              size='lg'
              type='submit'
              disabled={handleLoading}
              variant='success'
            >
              {t("confirm")}
              <span>{handleLoading && <Loading />}</span>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <Loading />
  );
}
