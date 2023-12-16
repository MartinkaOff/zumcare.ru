import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Container, Row, Nav} from 'react-bootstrap';
import { Statistics } from './Statistics/Statistics';
import { UsersInfo } from './Statistics/UsersInfo';

export function ManagerInfo() {
  const [part, setPart] = useState('statistics_default');
  
  //@ts-ignore
  const user = Meteor.user()?.profile?.userType;

  const { t } = useTranslation();

  function checkPart() {
    if(part === 'statistics_default') {
      return <Statistics/>
    } else if(part === 'stastics_users') {
      return <UsersInfo/>
    }
  }

  function checkNav() {
    if(user === 'manager') {
      return (
      <Nav
        variant='pills'
        activeKey={part}
        onSelect={(s) => setPart(s ? s : '')}
      >
        <Nav.Item>
          <Nav.Link eventKey='statistics_default'>{t("allStatistics")}</Nav.Link>
        </Nav.Item>
      </Nav>
      )
    }
  }

  return (
    <Container>
      <Row>
        <h2 
          style={{marginTop: '1em'}}
          className='heading'>
          {t("statistics")}
        </h2>
        {checkNav()}
      </Row>
      <Row>
        {checkPart()}
      </Row>
    </Container>
  );
}
