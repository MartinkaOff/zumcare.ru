import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { PopupModal } from "./../../PopupModal/PopupModal";
import { ConsultationEnrollContent } from "../../ConsultationEnrollContent/ConsultationEnrollContent";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "./WallpaperAreaStyle.css";

export function WallpaperArea() {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);

  const saveClientData = (form: object) => {
    Meteor.call("inqueries.insert", form, (err: object) => {
      if (err) console.log(err);
    });
    Swal.fire({
      title: "Success!",
      text: i18n.language === 'en' ? "Your form was submitted!" : "Ваша форма была отправлена!",
      icon: "success",
      confirmButtonText: "Ok",
    });
    setShow(false);
  };

  return (
    <Container
      className="wallpaper-wrapper"
      // style={{ backgroundImage: "url(wallpaper-photo.png)" }}
      fluid
    >
      <div className="wallpaper-ellipse"></div>
      <PopupModal
        show={show}
        onHide={() => setShow(false)}
        content={
          <ConsultationEnrollContent
            onSubmit={(data) => saveClientData(data)}
          />
        }
        title={t("enrollTitle")}
        closeButton={true}
      />
      <div className="wallpaper-wrapper-items">
        <div className="wallpaper-wrapper-top">
          <Row className="wallpaper-upper-bullets">
            <Col xl={3} lg={3} md={4} sm={4} className="wallpaper-upper-bullet wallpaper-upper-bullet-lock">
              {t("confidentialText")}
            </Col>
            <Col xl={4} lg={6} md={5} sm={6} className="wallpaper-upper-bullet wallpaper-upper-bullet-consulting">
              {t("onlineOfflineText")}
            </Col>
          </Row>
          <Row className="wallpaper-heading">
            <Col xl={7} lg={7} md={7} sm={8} xs={10}>
              <h2 className="wallpaper-heading-text">
                {t("wallpaperHeadingText")}
              </h2>
            </Col>
          </Row>
        </div>
        <div className="wallpaper-wrapper-bottom">
          <Row className="wallpaper-subheader">
            <Col>
              <h2 className="wallpaper-subheader-text">{t("subheaderText")}</h2>
            </Col>
          </Row>
          <Row className="wallpaper-button">
            <Col>
              <Button className="btn-btn-big" onClick={() => setShow(true)}>
                {t("buttonText")}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
