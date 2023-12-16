import React from "react"
import { Container, Row, Table } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { CancelSessionCard } from "../../../components/SessionCard/CancelSessionCard"
import { useMultipleSessions } from "../../../../helpers/hooks/useMultipleSessions"
import { Loading } from "../../../components/Loading/Loading"
import { useClient } from '../../../../helpers/hooks/useClient';
import { useSpecialist } from '../../../../helpers/hooks/useSpecialist';


export function CancelSessions({ specialistManager }) {
  const { specialist } = useSpecialist();
  const { client } = useClient();

  //@ts-ignore
  const user = Meteor.user()?.profile?.userType;
  const { sessions, isSessionLoading } = useMultipleSessions(
    user === 'manager' ? undefined : specialist ? specialist?.userId : client?.userId,
    specialist ? 'specialist' : 'client',
  );

  const { t } = useTranslation();

  sessions.reverse();

  function validationSessions(arr) {
    const cancelSessions = arr.filter(item => item.clientId === client?.userId && item.cancel
      || item.specialistId === specialist?.userId && item.cancel)
    const allCancelSessions = arr.filter(item => item.cancel);
    const allSpec = arr.filter(item => item.specialistId === specialistManager?.userId && item.cancel)

    return (
      <Table className="table table-bordered" style={{ 'marginTop': '1em' }}>
        <thead style={{ 'textAlign': 'center' }}>
          <tr>
            {user === 'admin' ? <th scope='col'>{t("sessionId")}</th> : undefined}
            <th scope="col">{t('client')}</th>
            <th scope="col">{t('specialist')}</th>
            <th scope="col">{t('date')}</th>
            <th scope="col">{t('online')}</th>
            <th scope="col">{t('comment')}</th>
            <th scope='col'></th>
            {/* {user === 'specialist' && <th scope="col">{t('remove')}</th>} */}
          </tr>
        </thead>
        {user === 'admin' ?
          <tbody>
            {allCancelSessions.map((s, i) => (
              <CancelSessionCard {...s} key={i} />
            ))}
          </tbody> :
          user === 'manager' ?
            <tbody>
              {allSpec.map((s, i) => (
                <CancelSessionCard {...s} key={i} />
              ))}
            </tbody> :
            user === 'client' || user === 'specialist' ?
              <tbody>
                {cancelSessions.map((s, i) => (
                  <CancelSessionCard {...s} key={i} />
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