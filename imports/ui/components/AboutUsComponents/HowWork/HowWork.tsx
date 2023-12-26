import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

export function HowWork() {
  const { t } = useTranslation();

  let history = useHistory();

  const goToFindSpec = () => {
    history.push("/specialists");
  };

  return (
    <Row className='about-howWork center'>
      <Col md={8}>
        <Button style={{ fontSize: '20px', height: '45px' }} className="btn-btn-big" onClick={() => goToFindSpec()}>
          {t("enrollButtonLabel")}
        </Button>
        <h4 className='about-title'>
          {t('howWork.title')}
        </h4>
      </Col>
      <Col className='about-list-item' md={8}>
        {t('howWork.description')}
        <br />
        {/* Add your image or icon here */}
      </Col>
    </Row>
  );
}
