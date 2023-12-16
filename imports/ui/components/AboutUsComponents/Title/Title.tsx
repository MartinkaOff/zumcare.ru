import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function Title() {
  const { t } = useTranslation();

  return (
    <Row className='heading-ribbon'>
      <Col md={8}>
        <h2 className='about-title'>{t('about.title')}</h2>
      </Col>
    </Row>
  );
}
