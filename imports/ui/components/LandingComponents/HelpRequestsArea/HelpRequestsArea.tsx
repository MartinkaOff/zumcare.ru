import React from "react";
import { Container, Row } from "react-bootstrap";
import { RequestCard } from "./RequestCard";
import { useTranslation } from "react-i18next";

import './HelpRequestsArea.css';

const requests = [
  {
    order: 1,
    key: "request1",
  },
  {
    order: 2,
    key: "request2",
  },
  {
    order: 3,
    key: "request3",
  },
  {
    order: 4,
    key: "request4",
  },
  {
    order: 5,
    key: "request5",
  },
];

export function HelpRequestsArea() {
  const { t } = useTranslation();

  return (
    <Container className="help-requests-area-wrapper">
      <h1 className="help-requests-area-title title" style={{ textAlign: "center", margin: "5rem 0" }}>
        {t("requestsHeadingText")}
      </h1>
      <Row className="help-requests-area-items" xs={1} sm={2} md={3} lg={3} style={{ justifyContent: "center" }}>
        {requests.map((req) => (
          <RequestCard
            title={t(`${req.key}Title`)}
            text={t(`${req.key}Text`)}
            key={req.order}
          />
        ))}
      </Row>
    </Container>
  );
}
