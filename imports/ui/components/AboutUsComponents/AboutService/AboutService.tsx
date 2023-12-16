import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function AboutService() {
  const { t } = useTranslation();

  return (
    <Row className='about-service center'>
      <Col md={8}>
        {t('aboutService.title')}
        {t('aboutService.description')}
        <br />
        <br />
        {t('aboutService.idea')}
      </Col>
    </Row>
  );
}
