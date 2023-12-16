import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { WhyZumcareItem, casesZumcare } from './WhyZumcareItem';

export function WhyZumcare() {
  const { t } = useTranslation();

  return (
    <Row className='about-whyZumcare center'>
      <Col md={8}>
        <h4>{t('whyZumcare.title')}</h4>
      </Col>
      <Col style={{ marginBottom: '1rem' }} md={8}>
        {t('whyZumcare.description1')}
        <br /> <br />
        {t('whyZumcare.description2')}
      </Col>
      <Row>
        {casesZumcare.map((item) => (
          <WhyZumcareItem {...item} key={item.order} />
        ))}
      </Row>
      <Col md={8} style={{ paddingTop: '3rem' }}>
        {t('whyZumcare.additionalDescription')}
        <br />
        {t('whyZumcare.diplomaRequirement')}
        <br />
        {t('whyZumcare.practicalExperience')}
        <br />
        <br />
        {t('whyZumcare.imagePlaceholder')}
      </Col>
    </Row>
  );
}
