import React, { useState } from 'react';
import { Container, Row, Nav } from 'react-bootstrap';
import { SessionsDefault } from '../Sessions/SessionsDefault/SessionsDefault';
import { PastSessions } from '../Sessions/PastSessions/PastSessions';
import { useTranslation } from 'react-i18next';
import { CancelSessions } from '../Sessions/CancelSessions/CancelSessions';

export function SessionsTable() {
  const { t } = useTranslation();

  const [part, setPart] = useState('sessions_default');

  function checkPart() {
    if (part === 'sessions_default') {
      return <SessionsDefault />;
    } else if (part === 'past_sessions') {
      return <PastSessions />;
    } else if (part === 'cancel_sessions') {
      return <CancelSessions />;
    }
  }

  return (
    <Container>
      <Row>
        <h2 style={{ textAlign: 'center' }}>{t('allSessions')}</h2>
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
          <Nav.Item>
            <Nav.Link eventKey='cancel_sessions'>{t('cancelSessions')}</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>{checkPart()}</Row>
    </Container>
  );
}

{
  /* <Container>
      <h2 style={{textAlign: 'center'}}>All sessions</h2>
      <SessionsDefault/>
</Container> */
}

// const [part, setPart] = useState('sessions_default');

//   return (
//     <Container>
//       <Row>
//         <h2
//           style={{marginTop: '1em'}}
//           className='heading'>
//           Sessions
//         </h2>
//         <Nav
//           variant='pills'
//           activeKey={part}
//           onSelect={(s) => setPart(s ? s : '')}
//         >
//           <Nav.Item>
//             <Nav.Link eventKey='sessions_default'>Sessions</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey='past_sessions'>Past sessions</Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </Row>
//       <Row>
//         {part === 'sessions_default' ? (
//           <SessionsDefault/>
//         ):(
//           <PastSessions/>
//         )}
//       </Row>
//     </Container>
//   );
