import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { SpecialistCabinet } from '../../components/SpecialistCabinet/SpecialistCabinet';
import { AdminCabinet } from '../../components/AdminCabinet/AdminCabinet';
import { ClientCabinet } from '../../components/ClientCabinet/ClientCabinet';
import { ManagerCabinet } from '../../components/ManagerCabinet/ManagerCabinet';
import { useTranslation } from 'react-i18next';
import {useHistory} from 'react-router-dom'

export function Cabinet() {
  const { t } = useTranslation();
  const user = Meteor.user();
  // @ts-ignore
  const userType = user?.profile?.userType;

  let history = useHistory();

  function setUserCabinet() {
    if (userType === 'specialist') {
      return <SpecialistCabinet />;
    } else if (userType === 'admin') {
      return <AdminCabinet />;
    } else if(userType === 'manager') {
      history.push('/manager/statistics');
    }else {
      return <ClientCabinet />;
    }
  }

  return (
    <div>
      <Container>
        <Row style={{ padding: '2rem 0 0 0' }}>
          <h4>{t('cabinet')}</h4>
        </Row>
      </Container>
      {/* {userType === 'specialist' ? (
        <SpecialistCabinet />
      ) : (
        <h4 style={{marginTop: '2rem'}}>Other</h4>
      )} */}
      {setUserCabinet()}
    </div>
  );
}
