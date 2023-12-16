import React, { useState } from 'react';
import { Row, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Formik } from 'formik';
import { FormikFormControlGroup } from '../FormikFormControlGroup/FormikFormControlGroup';
import { useTranslation } from 'react-i18next';
import { Session } from '../../../helpers/types';
import { PopupModal } from '../PopupModal/PopupModal';
import { useHistory } from 'react-router-dom';
import { schema } from './schema';
import { tooltipsObject } from '../../../helpers/services/tooltipsObject';
import { useMultipleSchedules } from '../../../helpers/hooks/useMultipleSchedules';
import Swal from 'sweetalert2';

export function SessionCard(session: Session) {
  const [cancelMessage, setCancelMessage] = useState('');
  const history = useHistory();
  const [showModalCancle, setShowModalCancle] = useState(false);
  const [showModalCanclePushAdmin, setShowModalCanclePushAdmin] =
    useState(false);
  const { t } = useTranslation();

  const { schedules } = useMultipleSchedules();
  const bookedDaysSpec = schedules.filter(item => item.specialistUserId === session.specialistId
    ||
    item.clientUserId === session.clientId);

  //@ts-ignore
  const currentBookedDay = bookedDaysSpec.filter(item => item?.booked?.start?.toLocaleString() === session?.schedule?.toLocaleString())

  const closeModalCancle = () => {
    setShowModalCancle(false);
  };

  const openModalCancle = () => {
    setShowModalCancle(true);
  };

  const closeModalCanclePushAdmin = () => {
    setShowModalCanclePushAdmin(false);
  };
  const openModalCanclePushAdmin = () => {
    setShowModalCanclePushAdmin(true);
  };

  //@ts-ignore
  const user = Meteor.user()?.profile?.userType;

  const cancelSession = () => {
    if (session.cancel !== true) {
      Meteor.call('sessions.cancel', session._id, true);
      Meteor.call('schedule.remove', currentBookedDay[0]?._id)
    }
  };

  const cancelMessageCall = () => {
    if (cancelMessage.length > 0) {
      const messageCancelForAdmin = {
        from: 'Zoomcare - Психологическая поддержка сотрудников <zn@healthbalance.kz>',
        to: 'zumcare@gmail.com',
        subject: `Отмена сессии ${user === 'specialist' ? `специалиста` : `клиента`}`,
        text: `Отмена сессии ${user === 'specialist' ? `специалистом ${session?.specialistName} у клиента ${session?.clientName} `
          : `клиентом ${session?.clientName} у специалиста ${session?.specialistName} `}
Дата сеанса: ${session?.schedule.toLocaleString()}
Причина отмены: ${cancelMessage}
Если причина является уважительной, отмените сессию 
http://dev.zoomcare.kz/session/${session._id}
`};
      Meteor.call('sessions.messageCancel', messageCancelForAdmin,
        Swal.fire({
          title: 'Success!',
          text: `Ваша заявка на отмену сессии принята! Админ рассмотрит ваш запрос и напишет решение!`,
          icon: 'success',
          showDenyButton: true,
          denyButtonText: 'Связаться с админом',
          denyButtonColor: '#7066e0',
          preConfirm: () => {
            closeModalCanclePushAdmin();
          }
        }).then((result => {
          if (result.isDenied) {
            window.open("https://jivo.chat/N5kp6jEW0T")
            closeModalCanclePushAdmin();
          }
        })));
    }
  };

  const cancelMessageForSpecAndClient = () => {

    const messageForClient = {
      from: 'Zoomcare - Психологическая поддержка сотрудников <zn@healthbalance.kz>',
      to: session.client,
      subject: 'Сессия успешно отменена',
      text: `Отмена сессии специалиста ${session?.specialistName} (id - ${session?.specialistId}) и клиента ${session?.clientName
        } (id - ${session?.clientId})
Дата сеанса: ${session?.schedule.toLocaleString()}
Сессия отменена
`};

    const messageForSpec = {
      from: 'Zoomcare - Психологическая поддержка сотрудников <zn@healthbalance.kz>',
      to: session.specialist,
      subject: 'Сессия успешно отменена',
      text: `Отмена сессии специалиста ${session?.specialistName} (id - ${session?.specialistId}) и клиента ${session?.clientName
        } (id - ${session?.clientId})
    Дата сеанса: ${session?.schedule.toLocaleString()}
    Сессия отменена
    `};

    Meteor.call('sessions.messageCancelForSpecAndClient', messageForClient, messageForSpec,
      Swal.fire({
        title: 'Success!',
        text: `Сессия успешно отменена`,
        icon: 'success',
        preConfirm: () => {
          closeModalCanclePushAdmin();
        }
      }));
  }

  function checkSessionDateAndUserDate() {
    if (session !== undefined) {
      const newDate = new Date();

      //@ts-ignore
      const monthSession = session?.schedule?.getMonth() + 1;
      //@ts-ignore
      const daySession = session?.schedule?.getDate();
      //@ts-ignore
      const hoursSession = session?.schedule?.getHours();
      const minutesSession = session?.schedule?.getMinutes();


      const monthUser = newDate.getMonth() + 1;
      const dayUser = newDate.getDate();
      const hoursUser = newDate.getHours();
      const minutesUser = newDate.getMinutes();

      if (dayUser > daySession && monthUser < monthSession || user === 'admin') {
        return (
          <td>
            <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.cancelSession}</Tooltip>}>
              <Button onClick={openModalCancle} variant='danger'>
                {t('cancel')}
              </Button>
            </OverlayTrigger>

          </td>
        );
      } else if (
        (dayUser + 1 === daySession && hoursSession < hoursUser) ||
        (dayUser === daySession && hoursSession > hoursUser || hoursSession === hoursUser && minutesSession > minutesUser)
      ) {
        return (
          <td>
            <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.cancelSession}</Tooltip>}>
              <Button variant='danger' onClick={openModalCanclePushAdmin}>
                {t('cancel')}
              </Button>
            </OverlayTrigger>

          </td>
        );
      }
      else {
        return (
          <td>
            <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.cancelSession}</Tooltip>}>
              <Button variant='danger' onClick={openModalCancle}>
                {t('cancel')}
              </Button>
            </OverlayTrigger>

          </td>
        );
      }
    }
  }

  function checkMessageAction() {
    if (cancelMessage.length === 0) {
      return;
    } else if (cancelMessage.length < 10) {
      return <div style={{ color: 'red' }}>Нужно больше 10 символов</div>;
    } else if (cancelMessage.length > 10) {
      return (
        <Button
          style={{ width: '45%', display: 'block', margin: '0 auto' }}
          size='lg'
          type='submit'
          variant='success'
        >
          Отправить
        </Button>
      );
    }
  }

  function navigateToSession() {
    history.push(`/session/${session._id}`);
  }

  function navigateToStartSession() {
    history.push(`/conference/${session._id}`);
  }


  function renderSpecialistCard() {

    const dateSession = session?.schedule;
    const now = new Date();
    const notificationFiveMinutes = new Date(session.schedule.getTime() - 5 * 60000);
    const linkForSession = <a style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
      onClick={() => navigateToStartSession()}>
      {t("sessionLink")}</a>
    const waitLinkForSession = 'Ссылка появится за 5 минут до сессии'

    if (user === 'manager') {
      return (
        <tr style={{ textAlign: 'center' }}>
          <td>{session.clientId}</td>
          <td>{session.specialistName}</td>
          <td>{session.schedule.toLocaleString()}</td>
          <td>{session?.online === 'yes' ? t('yes') : t('no')}</td>
        </tr>
      );
    } else if (user === 'admin') {
      return (
        <tr style={{ textAlign: 'center' }}>
          <PopupModal
            show={showModalCancle}
            onHide={closeModalCancle}
            content={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '3em',
                }}
              >
                <Button
                  className='btn btn-success'
                  style={{ width: '40%' }}
                  onClick={() => (cancelSession(), cancelMessageForSpecAndClient())}
                >
                  {t('yes')}
                </Button>
                <Button
                  className='btn btn-danger'
                  style={{ width: '40%' }}
                  onClick={closeModalCancle}
                >
                  {t('no')}
                </Button>
              </div>
            }
            title={t('confirmCancelSession')}
            closeButton={true}
          />
          <th scope='row'>{session?._id}</th>
          <th scope='row'>{session?.clientName}</th>
          <td>{session?.specialistName}</td>
          <td>{session.schedule.toLocaleString()}</td>
          <td>{session?.online === 'yes' ? t('yes') : t('no')}</td>
          <td>{session?.comments}</td>
          {checkSessionDateAndUserDate()}
        </tr>
      )
    }
    else {
      return (
        <tr style={{ textAlign: 'center' }}>
          <PopupModal
            show={showModalCancle}
            onHide={closeModalCancle}
            content={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '3em',
                }}
              >
                <Button
                  className='btn btn-success'
                  style={{ width: '40%' }}
                  onClick={() => (cancelSession(), cancelMessageForSpecAndClient())}
                >
                  {t('yes')}
                </Button>
                <Button
                  className='btn btn-danger'
                  style={{ width: '40%' }}
                  onClick={closeModalCancle}
                >
                  {t('no')}
                </Button>
              </div>
            }
            title={t('confirmCancelSession')}
            closeButton={true}
          />
          <PopupModal
            show={showModalCanclePushAdmin}
            onHide={closeModalCanclePushAdmin}
            content={
              <div>
                <Formik
                  validationSchema={schema}
                  onSubmit={cancelMessageCall}
                  initialValues={{
                    message: cancelMessage,
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
                      <Row>
                        <FormikFormControlGroup
                          xl='6'
                          lg='12'
                          md='12'
                          sm='12'
                          xs='12'
                          name={t("message")}
                          value={cancelMessage}
                          handleChange={(e) => setCancelMessage(e.target.value)}
                          touched={touched.message}
                          errors={errors.message}
                          placeholder={t("message")}
                          type='text'
                          key={values.message}
                        />
                      </Row>
                      {checkMessageAction()}
                    </Form>
                  )}
                </Formik>
              </div>
            }
            title={t("reasonForCancellation")}
            closeButton={true}
          />
          <th scope='row'>{session?.clientName}</th>
          <td>{session?.specialistName}</td>
          <td>{session.schedule.toLocaleString()}</td>
          <td>{session?.online === 'yes' ? t('yes') : t('no')}</td>
          <td>{session?.comments}</td>
          <td>{dateSession <= now || now >= notificationFiveMinutes ? linkForSession : waitLinkForSession}</td>
          <td>
            <Button style={{ width: '6em' }} onClick={navigateToSession}>{t('chat')}</Button>
          </td>
          {checkSessionDateAndUserDate()}
        </tr>
      );
    }
  }


  return !session.cancel ? (
    renderSpecialistCard()
  ) : (
    <div style={{ display: 'none' }}></div>
  );
}
