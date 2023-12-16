import React from "react";
import { Container, Row } from "react-bootstrap";
import { Source } from "./Source";
import { useTranslation } from "react-i18next";

import './WroteAboutUsArea.css'

const sources = [
  {
    order: 1,
    img: "sources/24khabar.png",
    link: "https://24.kz/ru/",
  },
  {
    order: 2,
    img: "sources/forbes.png",
    link: "https://forbes.kz/process/medicine/drger_men_patsient_arasyindayi_onlayn-kees_alay_yizmet_eted/",
  },
  {
    order: 3,
    img: "sources/31-channel.png",
  },
  {
    order: 4,
    img: "sources/inform_buro.png",
    link: "https://informburo.kz/novosti/v-kazahstane-poyavilsya-servis-dlya-podbora-psihologov-s-uchyotom-individualnosti-cheloveka.html",
  },
  {
    order: 5,
    img: "sources/kaztrk.png",
  },
  {
    order: 6,
    img: "sources/atameken.png",
  },
];

export function WroteAboutUsArea() {
  const { t } = useTranslation();

  return (
    <Container style={{ textAlign: "center", padding: "5rem 0 5rem 0" }}>
      <h1 className="title">{t("wroteAboutUsHeadingText")}</h1>
      <Row
        xs={1}
        sm={2}
        md={2}
        lg={4}
        className="wrote-about-us-area-wrapper"
        style={{ alignItems: "baseline", justifyContent: "center" }}
      >
        <div className="wrote-about-us-area-background"></div>
        {sources.map((s) => (
          <Source {...s} key={s.order} />
        ))}
      </Row>
      <h4
        className="wrote-about-us-area-text"
        style={{
          textAlign: "left",
          padding: "2rem 0 2rem 0",
          fontWeight: 300,
        }}
      >
        {t("wroteAboutUsDescriptionText")}
      </h4>
    </Container>
  );
}
