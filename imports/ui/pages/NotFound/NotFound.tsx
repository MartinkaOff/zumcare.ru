import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <Container>
      <div style={{ padding: "25% 0 25% 0", textAlign: "center" }}>
        <h1>{t("notFound")}</h1>
      </div>
    </Container>
  );
}
