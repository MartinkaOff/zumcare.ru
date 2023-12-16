import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { StartConference } from '../Startconference';
import { BeforeConference } from './Before/BeforeConference';
import { AfterConference } from './After/AfterConference';
import { useHistory } from 'react-router-dom';

export function ClientConference({ ID, session, history, sessionParams }) {

  const renderComponent = () => {
    if ((session.status as string) === 'active' && session.status !== 'end' ||
      (session.status as string) === 'wait' && session.status !== 'end' && sessionParams === null) {
      return <BeforeConference ID={ID} Session={session} sessionParams={sessionParams} />;
    } else if ((session.status as string) === 'end' || sessionParams !== null && session.status !== 'end') {
      return <AfterConference ID={ID} Session={session} />;
    } else if ((session.status as string) === 'connect' && session.status !== 'end'
      || (session.status as string) === 'start' && session.status !== 'end' && sessionParams === null) {
      return <StartConference ID={ID as string} Session={session} />;
    }
    else {
      history.push(`/`);
    }
  };


  return (
    <Container>
      <Row className='heading-ribbon'>{renderComponent()}</Row>
    </Container>
  );
}
