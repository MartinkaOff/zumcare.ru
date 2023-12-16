import React, { useState } from 'react';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import { useClient } from '../../../helpers/hooks/useClient';
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';
import { useParams } from 'react-router-dom';
import { useSession } from '../../../helpers/hooks/useSession';
import { Loading } from '../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { SessionChat } from './SessionChat';
import { useTranslation } from 'react-i18next';
import { useMultipleSchedules } from '../../../helpers/hooks/useMultipleSchedules';
import { PopupModal } from '../../components/PopupModal/PopupModal';
import Swal from 'sweetalert2';
import moment from 'moment';

export function SessionPage() {
  const { _id } = useParams();
  const { session, isSessionLoading } = useSession(_id);
  const { client } = useClient(session?.clientId);
  const { specialist } = useSpecialist(session?.specialistId);
  const history = useHistory();
  //@ts-ignore
  const user = Meteor.user()?.profile?.userType;
  const { t } = useTranslation();
  const { schedules } = useMultipleSchedules();
  const [showModalCancle, setShowModalCancle] = useState(false);

  function navigateToSession() {
    history.push(`/sessions`);
  }

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
          closeModalCancle();
        }
      }));
  }

  const cancelSession = () => {
    if (session.cancel !== true) {
      history.push(`/admin/sessions`);
      Meteor.call('sessions.cancel', session._id, true);
      Meteor.call('schedule.remove', currentBookedDay[0]?._id)
    }
  };

  return !isSessionLoading ? (
    <Container style={{ padding: '2rem' }} fluid>
      <Card style={{ padding: '2rem' }}>
        <Row>
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
            title={t("confirmCancelSession")}
            closeButton={true}
          />
          <Col sm={12} md={6} lg={1}>
            <Button onClick={navigateToSession} className="btn btn-primary" style={{ width: '100%' }} type="submit">{t('back')}</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          <Col sm={12} md={6} lg={8}>
            <Card>
              <Card.Header>{t('sessionPage.sessionData')}</Card.Header>
              <Card.Body>
                <h4>
                  <span style={{ fontWeight: 300 }}>{t('sessionPage.clientData')}:</span>{' '}
                  {client?.name} {client?.surname}
                </h4>
                <br />
                <h4>
                  <span style={{ fontWeight: 300 }}>{t('sessionPage.specData')}:</span>{' '}
                  {specialist && specialist.name}
                </h4>
                <br />
                <h4>
                  <span style={{ fontWeight: 300 }}>{t('comment')}:</span>{' '}
                  {session.comments}
                </h4>
                <br />
                <h4>
                  <span style={{ fontWeight: 300 }}>{t('time')}:</span>{' '}
                  {moment(session.schedule).format('MMMM Do YYYY, HH:mm')}
                </h4>
                {user === 'admin' ? <Button onClick={openModalCancle} style={{ marginTop: '1em' }}>Отменить сессию</Button> : undefined}
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <SessionChat
              sessionId={_id}
              userIsClient={!!client}
              userIsSpecialist={!!specialist}
              clientId={client?.userId}
              specialistId={specialist?.userId}
            />
          </Col>
        </Row>
      </Card>
    </Container>
  ) : (
    <Loading />
  );
}
