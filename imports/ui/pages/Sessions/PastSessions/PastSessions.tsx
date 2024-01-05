import React from "react"
import { Container, Row, Table } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { PastSessionCard } from "../../../components/SessionCard/PastSessionCard"
import { useMultipleSessions } from "../../../../helpers/hooks/useMultipleSessions"
import { Loading } from "../../../components/Loading/Loading"
import { useClient } from '../../../../helpers/hooks/useClient';
import { useSpecialist } from '../../../../helpers/hooks/useSpecialist';

export function PastSessions({ specialistManager }) {
  const { specialist } = useSpecialist();
  const { client } = useClient();
  //@ts-ignore
  const user = Meteor.user()?.profile?.userType;
  const { sessions, isSessionLoading } = useMultipleSessions(
    user === 'manager' ? undefined : specialist ? specialist?.userId : client?.userId,
    specialist ? 'specialist' : 'client',
  );

  sessions.reverse();

  const { t } = useTranslation();

  function validationSessions(arr) {
    const completeSessions = arr.filter(item => item.clientId === client?.userId && item.status === 'end' && item.clear !== 'true'
      || item.specialistId === specialist?.userId && item.status === 'end' && item.clear !== 'true')

    const completeSessionsForAdmin = arr.filter(item => item.status === 'end');

    return (
      <Table className="table table-bordered" style={{ 'marginTop': '1em' }}>
        <thead style={{ 'textAlign': 'center' }}>
          <tr style={{ border: 'none' }}>
            {user === 'admin' ? <th className='sessions-table-title' scope='col'>{t("sessionId")}</th> : undefined}
            <th className='sessions-table-title' scope="col">{t('client')}</th>
            <th className='sessions-table-title' scope="col">{t('specialist')}</th>
            <th className='sessions-table-title' scope="col">{t('date')}</th>
            <th className='sessions-table-title' scope="col">{t('online')}</th>
            <th className='sessions-table-title' scope="col">{t('comment')}</th>
            {/* <th className='sessions-table-title' scope='col'></th> */}
            {/* {user === 'specialist' && <th scope="col">{t('remove')}</th>} */}
          </tr>
        </thead>
        {user === 'admin' ?
          <tbody>
            {completeSessionsForAdmin.map((s, i) => (
              <PastSessionCard {...s} key={i} />
            ))}
          </tbody> :
          user === 'manager' ?
            <tbody>
              {completeSessions.map((s, i) => (
                <PastSessionCard {...s} key={i} />
              ))}
            </tbody> :
            user === 'client' || user === 'specialist' ?
              <tbody>
                {completeSessions.map((s, i) => (
                  <PastSessionCard {...s} key={i} />
                ))}
              </tbody> :
              <h3 style={{ textAlign: 'center' }}>
                {t('noSessions')}
              </h3>
        }
      </Table>
    )
  }


  return !isSessionLoading ? (
    <Container>
      <Row className='heading-ribbon'>
      </Row>
      {validationSessions(sessions)}
    </Container>
  ) : (<Loading />)
}