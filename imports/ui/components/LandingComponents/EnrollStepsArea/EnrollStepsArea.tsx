import React from "react";
import { Container, Row } from "react-bootstrap";
import { EnrollStepCard } from "./EnrollStepCard";
import { useTranslation } from "react-i18next";

import './EnrollStepsArea.css';

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
];

export function EnrollStepsArea() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingBottom: "5rem" }}>
      <h1 className="enroll-steps-area-title title" style={{ textAlign: "center", padding: "5rem 0" }}>
        {t("enrollHeadingText")}
      </h1>
      <Row className="enroll-steps-area-wrapper" xs={1} sm={3} md={3} lg={3} style={{ justifyContent: "center" }}>
        {steps.map((step) => (
          <EnrollStepCard
            order={step.order}
            title={t(`${step.key}Title`)}
            text={t(`${step.key}Text`)}
            key={step.order}
          />
        ))}
      </Row>
    </div>
  );
}
