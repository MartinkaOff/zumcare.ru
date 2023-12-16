import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { WhichCasesAdult, casesAdults } from './WhichCasesAdults';
import { WhichCasesChildren, casesChildrens } from './WhichCasesChildren';

export function WhichCases() {
  const { t } = useTranslation();

  return (
    <Row className='about-adult center'>
      <Col md={8}>
        <h4>{t('whichCases.title')}</h4>
      </Col>
      <Col md={8}>
        <h5>{t('whichCases.adultTitle')}</h5>
        <ul className='about-list'>
          {casesAdults.map((item) => (
            <WhichCasesAdult {...item} key={item.order} />
          ))}
        </ul>
      </Col>
      <Col md={8}>
        <h5>{t('whichCases.childrenTitle')}</h5>
        <ul className='about-list'>
          {casesChildrens.map((item) => (
            <WhichCasesChildren {...item} key={item.order} />
          ))}
        </ul>
      </Col>
    </Row>
  );
}
