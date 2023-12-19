import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { OnlineTherapyCard } from "./OnlineTherapyCard";
import { PopupModal } from "./../../PopupModal/PopupModal";
import { ConsultationEnrollContent } from "../../ConsultationEnrollContent/ConsultationEnrollContent";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "./OnlineTherapyStyle.css";

const steps = [
  {
    order: 1,
    key: "step1",
  },
  {
    order: 2,
    key: "step2",
  },
  {
    order: 3,
    key: "step3",
  },
  {
    order: 4,
    key: "step4",
  },
];

export function OnlineTherapyArea() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const saveClientData = (form) => {
    Meteor.call("inqueries.insert", form, (err) => {
      if (err) console.log(err);
    });
    Swal.fire({
      title: "Success!",
      text: "Your form was submitted!",
      icon: "success",
      confirmButtonText: "Cool",
    });
    setShow(false);
  };

  return (
    <div
      className="therapy-container-wrapper"
    >
      <PopupModal
        show={show}
        onHide={() => setShow(false)}
        content={
          <ConsultationEnrollContent
            onSubmit={(data) => saveClientData(data)}
          />
        }
        title={t("enrollModalTitle")}
        closeButton={true}
      />
      <h1 className="therapy-desc-header title">{t("onlineTherapyHeaderText")}</h1>

      <div className="therapy-block">
        <div className="therapy-block-left">
          <div>
            <img className="therapy-block-img" src="online-therapy-img.png" alt="online-therapy-img.png" />
          </div>
          <Row>
            <Col className="therapy-button-wrapper">
              <Button className="btn-btn-big" onClick={() => setShow(true)}>
                {t("enrollButtonLabel")}
              </Button>
            </Col>
          </Row>
        </div>

        <div className="therapy-block-right">
          <Row xs={1} sm={2} md={4} lg={4} style={{ flexDirection: 'column', width: '453px' }}>
            {steps.map((step) => (
              <OnlineTherapyCard
                title={t(`OTA${step.key}Title`)}
                text={t(`OTA${step.key}Text`)}
                key={step.order}
              />
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
