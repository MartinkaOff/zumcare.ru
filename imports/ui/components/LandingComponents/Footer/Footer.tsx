import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { year } from "../../../../helpers/dates";
import { useTranslation } from "react-i18next";

import "./FooterStyle.css";

const copyrightYear = () => {
  return year();
};

export function Footer() {
  const { t } = useTranslation();

  return (
    <div className="Footer-wrapper">
      <div className="Footer">
        <Container className="Footer-container">
          <Row style={{ justifyContent: 'center' }} className="Footer-container-row">
            <Col md={10} lg={8}>
              <h1 className='footer-title title' style={{ textAlign: 'center', paddingBottom: '5rem' }}>{t("freePsychologicalHelpText")}</h1>
            </Col>
            {/* <Col md={4} className="Footer-container-brand">
              <h5>&copy; {copyrightYear()} Zumcare-web</h5>
            </Col> */}
            {/*             <Col md={8}>
              <p className="Footer-container-notice">
                {t("footerNoticeText")}
                <a href="https://www.zumcare.kz/terms">
                  https://www.zumcare.kz/terms
                </a>
              </p>
            </Col> */}
          </Row>
          <Row className="Footer-container-row">
            <Col className="footer-text-block" sm={1} md={4}>
              <p className="footer-text">{t("callAstanaText")}</p>
            </Col>
            <Col className="footer-text-block" sm={1} md={4}>
              <p className="footer-text">{t("psychologicalHelpText")}</p>
            </Col>
            <Col className="footer-text-block" sm={1} md={4}>
              <p className="footer-text">{t("callKazakhstanText")}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
