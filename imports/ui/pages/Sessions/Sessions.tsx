import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
// @ts-ignore
import { SessionsDefault } from './SessionsDefault/SessionsDefault';
// @ts-ignore
import { PastSessions } from './PastSessions/PastSessions';
import { CancelSessions } from './CancelSessions/CancelSessions';
import { Specialist } from '../../../helpers/types';
import { tooltipsObject } from '../../../helpers/services/tooltipsObject';
import { useHistory } from 'react-router-dom';

export function Sessions({ specialist }: { specialist: Specialist }) {
  const [part, setPart] = useState('sessions_default');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  //@ts-ignore
  const user = Meteor.user()?.profile?.userType;
  const { t } = useTranslation();
  let history = useHistory();

  return (
    <Container>
      <Row>
        {user !== 'manager' || history.location.pathname === `/manager/specialists/${specialist?.userId}` ? (
          <h2 style={{ marginTop: '1em' }} className='heading'>
            {t('sessions')}
          </h2>
        ) : history.push(`/manager/usersinfo`)}
        {user === 'client' ? (
          <Nav
            variant='pills'
            activeKey={part}
            onSelect={(s) => setPart(s ? s : '')}
          >
            <Nav.Item>
              <Nav.Link eventKey='sessions_default'>{t('sessions')}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='past_sessions'>{t('pastSessions')}</Nav.Link>
            </Nav.Item>
          </Nav>
        ) : (
          <Nav
            variant='pills'
            activeKey={part}
            onSelect={(s) => setPart(s ? s : '')}
          >
            <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.sessions}</Tooltip>}>
              <Nav.Item>
                <Nav.Link eventKey='sessions_default'>{t('sessions')}</Nav.Link>
              </Nav.Item>
            </OverlayTrigger>

            <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.pastSessions}</Tooltip>}>
              <Nav.Item>
                <Nav.Link eventKey='past_sessions'>{t('pastSessions')}</Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.cancelSessions}</Tooltip>}>
              <Nav.Item>
                <Nav.Link eventKey='cancel_sessions'>{t("cancelSessions")}</Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
          </Nav>
        )}
      </Row>
      <Row>
        {part === 'cancel_sessions' && user !== 'client' ? (
          <CancelSessions specialistManager={specialist} />
        ) : part === 'past_sessions' ? (
          <PastSessions specialistManager={specialist} />
        ) : (
          <SessionsDefault specialistManager={specialist} />
        )}
      </Row>
    </Container>
  );
}
