import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Login } from '../Login/Login';
import { Reception } from './Reception/Reception';
import { PopupModal } from '../../components/PopupModal/PopupModal';
import { useClient } from '../../../helpers/hooks/useClient';
// import {useSession} from '../../../helpers/hooks/useSession';
// import { useMultipleSessions } from '../../../helpers/hooks/useMultipleSessions';
import { Signup } from '../Signup/Signup';

export const AuthorizedClient = ({
  specialist,
  onHideModal,
  specialistUserId,
  // openSchedule,
  selectedDays,
}) => {
  const { client, isClientLoading } = useClient();
  // const {session} = useSession();
  // const { sessions } = useMultipleSessions();
  const currentUser = useTracker(() => Meteor.user());
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  function checkLogged() {
    if (currentUser) {
      return (
        <Reception
          specialist={specialist}
          client={client}
          //   session={session}
          // sessions={sessions}
          isLoading={isClientLoading}
          onHideModal={onHideModal}
          // openSchedule={openSchedule}
          selectedDays={selectedDays}
        />
      );
    } else {
      return (
        <div>
          <Login specialistUserId={specialistUserId} />
          <div style={{ textAlign: 'center', marginTop: '1em' }}>
            <a onClick={openModal} style={{ textDecorationLine: 'none' }}>
              Или же зарегистрируйтесь
            </a>
            <PopupModal
              show={showModal}
              onHide={closeModal}
              content={<Signup />}
              title={
                currentUser
                  ? 'Запись на прием'
                  : 'Пожалуйста, зарегистрируйтесь'
              }
              closeButton={true}
            />
          </div>
        </div>
      );
    }
  }
  return <div>{checkLogged()}</div>;
};
