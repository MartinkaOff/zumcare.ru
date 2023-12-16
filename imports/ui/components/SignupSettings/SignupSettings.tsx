import React, { useState } from 'react';
import { Container, Row, Nav } from 'react-bootstrap';
import { Signup } from '../../pages/Signup/Signup';
import { CorpSignup } from '../../pages/Signup/CorpSignup';
import { useTranslation } from 'react-i18next';

export function SignupSettings() {
  const [part, setPart] = useState('basic_details');

  const { t } = useTranslation();

  return (
    <Container>
      <Row style={{ padding: '1rem 0 1rem 0' }}>
        <Nav
          variant='pills'
          activeKey={part}
          onSelect={(s) => setPart(s ? s : '')}
        >
          <Nav.Item>
            <Nav.Link eventKey='basic_details'>{t("users")}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='advanced_details'>{t("corporate")}</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
        {part === 'basic_details' ? (
          <Signup />
        ) : part === 'advanced_details' ? (
          <CorpSignup />
        ) : null}
      </Row>
    </Container>
  );
}
