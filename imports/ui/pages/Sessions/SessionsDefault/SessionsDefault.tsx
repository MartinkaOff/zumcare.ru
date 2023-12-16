import React, { useRef } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SessionCard } from '../../../components/SessionCard/SessionCard';
import { useMultipleSessions } from '../../../../helpers/hooks/useMultipleSessions';
import { Loading } from '../../../components/Loading/Loading';
import { useClient } from '../../../../helpers/hooks/useClient';
import { useSpecialist } from '../../../../helpers/hooks/useSpecialist';

export function SessionsDefault({ specialistManager }) {
  const { specialist } = useSpecialist();
  const { client } = useClient();
  // @ts-ignore
  const user = Meteor.user()?.profile?.userType;
  const { sessions, isSessionLoading } = useMultipleSessions(
    user === 'manager' ? undefined : specialist ? specialist?.userId : client?.userId,
    specialist ? 'specialist' : 'client',
  );

  sessions.reverse();

  const { t } = useTranslation();

  function validationSessions(arr) {
    const res = arr.filter(
      (item) =>
        item.clientId === client?.userId && item.status !== 'end' ||
        item.specialistId === specialist?.userId && item.status !== 'end',
    );

    const arrForAdmin = arr.filter((item) => item.status !== 'end');

    return (
      <Table className='table table-bordered' style={{ marginTop: '1em' }}>
        <thead style={{ textAlign: 'center' }}>
          <tr>
            {user === 'admin' ? <th scope='col'>{t("sessionId")}</th> : undefined}
            <th scope='col'>{t('client')}</th>
            <th scope='col'>{t('specialist')}</th>
            <th scope='col'>{t('date')}</th>
            <th scope='col'>{t('online')}</th>
            <th scope='col'>{t('comment')}</th>
            <th scope='col'>{t('link')}</th>
            <th scope='col'></th>
            {user === 'specialist' && <th scope='col'></th>}
            {/* {hiddenCompleteButton()} */}
          </tr>
        </thead>
        {user === 'admin' ?
          <tbody>
            {arrForAdmin.map((s, i) => (
              <SessionCard {...s} key={i} />
            ))}
          </tbody> :
          user === 'manager' ?
            <tbody>
              {res.map((s, i) => (
                <SessionCard {...s} key={i} />
              ))}
            </tbody> :
            user === 'client' || user === 'specialist' ?
              <tbody>
                {res.map((s, i) => (
                  <SessionCard {...s} key={i} />
                ))}
              </tbody> :
              <h3 style={{ textAlign: 'center' }}>
                {t('noSessions')}
              </h3>
        }
      </Table>
    );
  }

  return !isSessionLoading ? (
    <Container>
      <Row className='heading-ribbon'></Row>
      {validationSessions(sessions)}
    </Container>
  ) : (
    <Loading />
  );
}
