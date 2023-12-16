import React, { useContext, useEffect } from 'react';
import { NavbarsContext } from '../../../helpers/store/context/navbar-context';
import { SpecialistsInfoArea } from '../../components/LandingComponents/SpecialistsInfoArea/SpecialistsInfoArea';
import { WallpaperArea } from '../../components/LandingComponents/WallpaperArea/WallpaperArea';
import { LowerBulletsArea } from '../../components/LandingComponents/LowerBulletsArea/LowerBulletsArea';
import { Footer } from '../../components/LandingComponents/Footer/Footer';
import { HelpRequestsArea } from '../../components/LandingComponents/HelpRequestsArea/HelpRequestsArea';
import { EnrollStepsArea } from '../../components/LandingComponents/EnrollStepsArea/EnrollStepsArea';
import { OnlineTherapyArea } from '../../components/LandingComponents/OnlineTherapyArea/OnlineTherapyArea';
import { Container } from 'react-bootstrap';
import { WroteAboutUsArea } from '../../components/LandingComponents/WroteAboutUsArea/WroteAboutUsArea';
import { FeedbacksArea } from '../../components/LandingComponents/FeedbacksArea/FeedbacksArea';

function LineBreak() {
  return (
    <Container style={{ padding: '1rem 0' }}>
      {/* <hr /> */}
    </Container>
  );
}

export function Landing({ setInqueryData }) {
  const modesCtx = useContext(NavbarsContext);

  useEffect(() => {
    modesCtx.changeToDark();
  }, [modesCtx]);

  useEffect(() => {
    return () => {
      modesCtx.changeToLight();
    };
  }, [modesCtx]);

  return (
    <div style={{ background: "#F2F5FF", overflow: "hidden" }}>
      <WallpaperArea />
      <LowerBulletsArea />
      <LineBreak />
      <SpecialistsInfoArea />
      <LineBreak />
      <HelpRequestsArea />
      <LineBreak />
      <EnrollStepsArea />
      <OnlineTherapyArea />
      <WroteAboutUsArea />
      <FeedbacksArea />
      <Footer />
    </div>
  );
}
