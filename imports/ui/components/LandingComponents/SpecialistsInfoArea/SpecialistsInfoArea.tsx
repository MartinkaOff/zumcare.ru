import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useMultipleSpecialists } from "../../../../helpers/hooks/useMultipleSpecialists";
import { SpecialistCard } from "../../SpecialistCard/SpecialistCard";
import { Loading } from "../../Loading/Loading";
import { Specialist } from "../../../../helpers/types";
import { useTranslation } from "react-i18next";

import './SpecialistsInfoArea.css'

export function SpecialistsInfoArea() {
  const { t } = useTranslation();
  const withPhoto = true;
  const { specialists, isSpecialistsLoading } =
    useMultipleSpecialists();
  let history = useHistory();

  return !isSpecialistsLoading ? (
    <Container>
      <div style={{ position: 'relative' }}>
        <h1 className="specialists-info-area title" style={{ textAlign: "center", padding: "5rem 0" }}>
          {t("specialistInfoTitle")}
        </h1>
        <Row className="specialists-info-area-wrapper" xs={1} sm={2} md={2} lg={4}>
          {specialists.slice(0, 3).map((specialist: Specialist) => (
            <div key={specialist.userId}>
              <SpecialistCard {...specialist} />
            </div>
          ))}
        </Row>
        <div className="specialists-info-area-arrow" onClick={() => history.push("/specialists")}>
          <img className="arrow" src="Arrow.svg" alt="arrow" />
        </div>
      </div>
    </Container>
  ) : (
    <Loading />
  );
}
