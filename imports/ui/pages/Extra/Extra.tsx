import React, { useState } from 'react';
import { Card, Container, Nav } from 'react-bootstrap';
import { SpecializationsEditor } from '../../components/SpecializationsEditor/SpecializationsEditor';
import { MethodicsEditor } from '../../components/MethodicsEditor/MethodicsEditor';
import { useTranslation } from 'react-i18next';

export function Extra() {
  const { t } = useTranslation();
  const [part, setPart] = useState('specializations');

  return (
    <Container>
      <Nav
        variant='tabs'
        activeKey={part}
        onSelect={(s: any) => setPart(s)}
        style={{ padding: '2rem 0 0 0' }}
      >
        <Nav.Item>
          <Nav.Link eventKey='specializations'>{t('specializations')}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='methodics'>{t('methodics')}</Nav.Link>
        </Nav.Item>
      </Nav>
      <Card style={{ margin: '1rem 0 0 0' }}>
        <Card.Body>
          {part === 'specializations' ? (
            <SpecializationsEditor />
          ) : (
            <MethodicsEditor />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
