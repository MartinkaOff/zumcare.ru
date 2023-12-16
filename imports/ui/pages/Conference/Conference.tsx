import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ClientConference } from './Client/Client';
import { SpecialistConference } from './Specialist/Specialist';
import { Loading } from '../../components/Loading/Loading';
import { useRoom } from '../../../helpers/hooks/useRoom';
import { useSession } from '../../../helpers/hooks/useSession'
import { Room } from '../../../helpers/types';
import { Session } from '../../../helpers/types';
import { useMultipleSessions } from '../../../helpers/hooks/useMultipleSessions';
import { useHistory } from 'react-router-dom';

export function Conference() {

  const { id } = useParams();
  let history = useHistory();
  // @ts-ignore
  const user = Meteor.user()?.profile?.userType;
  // const { room, isRoomLoading } = useRoom(id as string);
  // const { session, isSessionLoading } = useSession(id as string);
  const { sessions, isSessionLoading } = useMultipleSessions();

  const urlParams = new URLSearchParams(window.location.search);
  const sessionParams = urlParams.get('sessionId');

  const currentSession = sessions.filter(session => session._id === id)

  const renderComponent = () => {
    if (!isSessionLoading) {
      if (user === 'specialist') {
        return <SpecialistConference ID={id as string} session={currentSession[0]} history={history} /* Room={room as Room} */ />;
      } else if (user === 'client') {
        return <ClientConference ID={id as string} session={currentSession[0]} history={history} sessionParams={sessionParams} />;
      }
    } else {
      return <Loading />;
    }
  };

  return (
    <Container>
      <Row className='heading-ribbon'>{renderComponent()}</Row>
    </Container>
  );
}
