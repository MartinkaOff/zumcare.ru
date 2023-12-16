import React from "react";
import { ButtonGroup, Nav, ToggleButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";

export function ManagerNav({ component }) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Nav
        className="me-auto"
        style={{
          flex: 3,
          margin: "0 3rem 0 1rem",
        }}
      >
        <LinkContainer to="/manager/statistics">
          <Nav.Link>{t("statistics")}</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/manager/usersinfo">
          <Nav.Link>{t("usersInfo")}</Nav.Link>
        </LinkContainer>
      </Nav>
      {React.createElement(component)}
      <ButtonGroup>
        <ToggleButton
          id="en-toggle"
          type="radio"
          variant="outline-primary"
          name="language"
          value="en"
          checked={i18n.language === "en"}
          onChange={() => changeLanguage("en")}
        >
          EN
        </ToggleButton>
        <ToggleButton
          id="kz-toggle"
          type="radio"
          variant="outline-primary"
          name="language"
          value="kz"
          checked={i18n.language === "kz"}
          onChange={() => changeLanguage("kz")}
        >
          KZ
        </ToggleButton>
        <ToggleButton
          id="ru-toggle"
          type="radio"
          variant="outline-primary"
          name="language"
          value="ru"
          checked={i18n.language === "ru"}
          onChange={() => changeLanguage("ru")}
        >
          RU
        </ToggleButton>
      </ButtonGroup>
    </>
  );
}
