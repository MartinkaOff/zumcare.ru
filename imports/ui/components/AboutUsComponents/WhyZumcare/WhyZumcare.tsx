import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { WhyZumcareItem, casesZumcare } from './WhyZumcareItem';

import '../AboutService/AboutService.css'

export function WhyZumcare() {
  const { t } = useTranslation();

  return (
    <Row className='about-whyZumcare center'>
      <Col className='about-whyZumcare-wrapper'>
        <Col style={{ margin: '0 auto' }} md={8}>
          <h4 className='about-title'>{t('whyZumcare.title')}</h4>
        </Col>
        <Col className='about-whyZumcare-trust' style={{ marginBottom: '1rem', textAlign: 'start' }} md={8}>
          <div style={{ padding: '40px 40px' }}>
            <div className='about-title-20px'>
              {t('whyZumcare.description1')}
            </div>
            <br /> <br />
            <div className='about-text-outline'>
              {t('whyZumcare.description2')}
            </div>
          </div>
        </Col>
      </Col>
      <Row>
        {casesZumcare.map((item) => (
          <WhyZumcareItem {...item} key={item.order} />
        ))}
      </Row>
      <Col className='about-whyZumcare-fact' md={8} style={{ paddingTop: '3rem' }}>
        <div className='about-title'>
          {t('whyZumcare.additionalDescription')}
        </div>
        <div className='about-whyZumcare-fact-block'>
          <div className='about-list-item about-whyZumcare-fact-item' style={{ color: '#2C3599', width: '31rem', marginLeft: '27rem' }}>
            Наличие диплома важно, но не всегда гарантирует профессионализм.
            Диплом свидетельствует о заинтересованности человека в психотерапии,
            его глубоких знаниях и готовности посвятить всю жизнь помощи окружающим.
            Однако практический опыт также играет важную роль, показывая, насколько специалист
            готов решать различные проблемы, как много опыта он уже имеет и может ли он эффективно решать сложные случаи.
          </div>
        </div>
      </Col>
    </Row>
  );
}
