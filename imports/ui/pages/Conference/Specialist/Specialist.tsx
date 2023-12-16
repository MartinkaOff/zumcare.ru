import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { StartConference } from '../Startconference';

export function SpecialistConference({ ID, session, history }) {

  const renderComponent = () => {
    // if ((ID.room.status as string) === 'start') {
    //   console.log('yes')
    //   history.push(`/`);
    // } else {
    //   return <StartConference ID={ID as string} Room={ID.room} />;
    // }
    if ((session.status as string) !== 'end') {
      return <StartConference ID={ID as string} Session={session} />;
    } else {
      history.push('/')
    }

  };

  return (
    <Container>
      <Row className='heading-ribbon'>{renderComponent()}</Row>
    </Container>
  );
}
