import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { Session } from '../../../helpers/types';
import { PopupModal } from '../PopupModal/PopupModal';
import { useMultipleSchedules } from '../../../helpers/hooks/useMultipleSchedules'

export function CancelSessionCard(session: Session) {

  const { schedules } = useMultipleSchedules();
  const bookedDaysSpec = schedules.filter(item => item.specialistUserId === session.specialistId
    ||
    item.clientUserId === session.clientId);

  //@ts-ignore
  const currentBookedDay = bookedDaysSpec.filter(item => item?.booked?.start?.toLocaleString() === session?.schedule?.toLocaleString())

  //@ts-ignore
  const user = Meteor.user()?.profile?.userType;

  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }
  const openModal = () => {
    setShowModal(true)
  }

  if (new Date().getMonth() + 1 > session.schedule.getMonth() + 1) {
    Meteor.call('schedule.remove', currentBookedDay[0]?._id)
    Meteor.call('sessions.remove', session._id);
  }

  const removeSession = () => {
    //@ts-ignore
    Meteor.call('sessions.remove', session._id);
    Meteor.call('schedule.remove', currentBookedDay[0]?._id)
  }

  function hiddenRemoveButton() {
    if (user === 'specialist' || user === 'admin') {
      return <td><Button onClick={openModal}>{t('remove')}</Button></td>
    }
  }

  function renderSpecialistCancelCard() {
    if (user === 'manager') {

      return <tr style={{ 'textAlign': 'center' }}>
        <th scope='row'>{session.clientId}</th>
        <td>{session.specialistName}</td>
        <td>{session.schedule.toLocaleString()}</td>
        <td>{session?.online === 'yes' ? t('yes') : t('no')}</td>
      </tr>
    } else {
      return <tr style={{ 'textAlign': 'center' }}>
        <PopupModal
          show={showModal}
          onHide={closeModal}
          content={
            <div style={{ display: 'flex', justifyContent: 'space-between', 'height': '3em' }}>
              <Button
                className="btn btn-success"
                style={{ width: '40%' }}
                onClick={() => (removeSession(), closeModal())}>{t('yes')}</Button>
              <Button
                className="btn btn-danger"
                style={{ width: '40%' }}
                onClick={closeModal}>{t('no')}</Button>
            </div>
          }
          title={t('sessionsTable.confirmRemove')}
          closeButton={true}
        />
        {user === 'admin' ? <th scope='row'>{session._id}</th> : undefined}
        <th scope='row'>{session.clientName}</th>
        <td>{session.specialistName}</td>
        <td>{session.schedule.toLocaleString()}</td>
        <td>{session?.online === 'yes' ? t('yes') : t('no')}</td>
        <td>{session.comments}</td>
        {hiddenRemoveButton()}
      </tr>
    }
  }

  return (
    renderSpecialistCancelCard()
  )
}