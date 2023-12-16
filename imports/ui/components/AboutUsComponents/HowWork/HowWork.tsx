import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function HowWork() {
  const { t } = useTranslation();

  return (
    <Row className='about-howWork center'>
      <Col md={8}>
        <h4>
          {t('howWork.title')}
          <br />
          {t('howWork.subtitle')}
        </h4>
      </Col>
      <Col md={8} style={{ paddingTop: '1rem' }}>
        {t('howWork.description')}
        <br />
        {/* Add your image or icon here */}
      </Col>
    </Row>
  );
}
