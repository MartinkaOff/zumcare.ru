import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { Loading } from "../../components/Loading/Loading";
import { useSpecializations } from "../../../helpers/hooks/useSpecializations";
import { SpecialistsList } from "./SpecialistsList";
import { Specialization } from "../../../helpers/types";
import { useTimezones } from '../../../helpers/hooks/useTimezones';
import { useGenders } from "../../../helpers/hooks/useGenders";
import { useCities } from "../../../helpers/hooks/useCities";
import { useTranslation } from "react-i18next";

import "./FindSpecialistStyle.css";

export function FindSpecialist() {

  let history = useHistory();

  const { specializations, isSpecializationsLoading } = useSpecializations();
  const { timezones, isTimezonesLoading } = useTimezones();
  const { genders, isGendersLoading } = useGenders();
  const { cities, isCitiesLoading } = useCities();

  const [specialization, setSpecialization] = useState<Specialization>();
  const [timezone, setTimezone] = useState();
  const [gender, setGender] = useState();
  const [city, setCity] = useState();

  const { t, i18n } = useTranslation();


  const pickSpecialization = (specialization: Specialization) => {
    setSpecialization(specialization);
  };

  const pickTimezone = (timezone) => {
    setTimezone(timezone);
  };

  const pickGender = (gender) => {
    setGender(gender)
  }

  const pickCity = (city) => {
    setCity(city)
  }

  const redirectToPickSpecialist = () => {
    history.push("/specialists/picker");
  };

  function translationGenders(gender) {
    return i18n.language === 'ru' ? gender === 'Male' ? "Мужской" : "Женский" : gender
  }

  return (
    <Container>
      <Row className="heading-ribbon" style={{ padding: '1rem 0 1rem 0' }}>
        <Col md={8}>
          <h2 className="heading">{t("findSpecialistHeaderText")}</h2>
        </Col>
      </Row>
      <Row className="specializations-ribbon row-cols-2 row-cols-lg-6">
        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle className="btn-btn-opacity" variant="none">
              {specialization ? specialization.title : t('requests')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSpecialization(undefined)} href="#/action-1">Все</Dropdown.Item>
              {!isSpecializationsLoading ? (
                specializations.map((s) => (
                  <Dropdown.Item onClick={() => pickSpecialization(s)} href="#/action-1">{s.title}</Dropdown.Item>
                ))
              ) : (
                <Loading />
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle className="btn-btn-opacity" variant="none">
              {timezone ? timezone : t('timezone')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setTimezone(undefined)} href="#/action-1">Все</Dropdown.Item>
              {!isTimezonesLoading ? (
                timezones.map((s, id) => (
                  <Dropdown.Item onClick={() => pickTimezone(s.timezone)} href="#/action-1">{s.timezone}</Dropdown.Item>
                ))
              ) : (
                <Loading />
              )}

            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle className="btn-btn-opacity" variant="none">
              {city ? city : t('city')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setCity(undefined)} href="#/action-1">{t('all')}</Dropdown.Item>
              {!isCitiesLoading ? (
                cities.map((s, id) => (
                  <Dropdown.Item onClick={() => pickCity(s.city)} href="#/action-1">{s.city}</Dropdown.Item>
                ))
              ) : (
                <Loading />
              )}

            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle className="btn-btn-opacity" variant="none">
              {gender ? gender : t('gender')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setGender(undefined)} href="#/action-1">Все</Dropdown.Item>
              {!isGendersLoading ? (
                genders.map((s, id) => (
                  <Dropdown.Item onClick={() => pickGender(s.gender)} href="#/action-1">{translationGenders(s.gender)}</Dropdown.Item>
                ))
              ) : (
                <Loading />
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={2} className="specialization-button-container">
          <Button
            variant="primary"
            className="btn-btn-main"
            onClick={redirectToPickSpecialist}
          >
            {t("pickforme")}
          </Button>
        </Col>
      </Row>
      <SpecialistsList specialization={specialization} timezone={timezone} gender={gender} city={city} />
    </Container>
  );
}
