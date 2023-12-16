import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function StartConference({ ID, Session }) {
  //@ts-ignore
  const user = Meteor.user()?.profile?.userType;

  const { t } = useTranslation();
  const redirect = () => {
    Session.StartTime = new Date();
    if ((Session.status as string) === 'active') {
      Session.status = 'wait';
    } else {
      Session.status = 'start';
    }

    Meteor.call('sessions.update', Session, (error) => {
      if (error) {
        console.error('Error inserting assessment:', error);
      } else {
        console.log('Assessment inserted successfully!');
      }
    });

    const dataToSend = {
      ID: ID,
    };

    const redirectUrl = `${Session.room}room/${Session._id}`;

    location.href = redirectUrl;
  };

  return (
    <Container>
      <Row style={{ textAlign: 'center' }}>
        <Col></Col>
        <Col md={2} className='specialization-button-container'>
          <Button
            style={{ "minWidth": "10em" }}
            variant='primary'
            className='specialization-button'
            onClick={redirect}
          >
            {t("join")}
          </Button>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
