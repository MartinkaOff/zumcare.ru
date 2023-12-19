import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import './AboutService.css';

export function AboutService() {
  const { t } = useTranslation();

  return (
    <Row style={{ textAlign: 'start' }} className='about-service'>
      <div>
        <Col md={12}>
          <div className='about-service-text'>
            {t('aboutService.title')}
            {t('aboutService.description')}
            <br />
            <br />
            {t('aboutService.subdescription')}
          </div>
        </Col>
        <Col className='about-service-wrapper' md={12}>
          <div className='about-service-text-21px'>Идея о сервисе родилась из личного опыта основателей, когда им не было ясно, к кому обратиться за помощью</div>
          <div className='about-service-img'><img src="about-us/about-service.png" style={{ width: '100%' }} alt="about-service" /></div>
        </Col>
      </div>
    </Row>
  );
}
