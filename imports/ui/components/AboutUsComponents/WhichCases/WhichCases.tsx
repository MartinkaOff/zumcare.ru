import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

import { WhichCasesAdult, casesAdults } from './WhichCasesAdults';
import { WhichCasesChildren, casesChildrens } from './WhichCasesChildren';

export function WhichCases() {
  const { t } = useTranslation();
  let history = useHistory();
  const goToFindSpec = () => {
    history.push("/specialists");
  };
  return (
    <Row style={{ marginTop: '50px' }} className='about-adult center'>
      <Col md={12}>
        <h4 className='about-title'>{t('whichCases.title')}</h4>
      </Col>
      <Col className='about-adult-wrapper' md={12}>
        <h5 style={{ color: 'rgba(39, 47, 134, 0.80)' }} className='about-title-20px'>{t('whichCases.adultTitle')}</h5>
        <ul className='about-list'>
          {casesAdults.map((item) => (
            <WhichCasesAdult {...item} key={item.order} />
          ))}
        </ul>
      </Col>
      <Col className='about-children-wrapper' md={12}>
        <h5 style={{ color: 'rgba(39, 47, 134, 0.80)' }} className='about-title-20px'>{t('whichCases.childrenTitle')}</h5>
        <ul className='about-list'>
          {casesChildrens.map((item) => (
            <WhichCasesChildren {...item} key={item.order} />
          ))}
        </ul>
      </Col>
      <Col style={{ display: 'flex', marginLeft: '40rem', paddingTop: '4rem' }} className="therapy-button-wrapper">
        <Button style={{ fontSize: '20px', height: '45px' }} className="btn-btn-big" onClick={() => goToFindSpec()}>
          {t("enrollButtonLabel")}
        </Button>
      </Col>
    </Row>
  );
}
