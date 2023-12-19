import React from 'react';
import { Card, Container } from 'react-bootstrap';

import { Title } from '../../components/AboutUsComponents/Title/Title';
import { AboutService } from '../../components/AboutUsComponents/AboutService/AboutService';
import { WhichCases } from '../../components/AboutUsComponents/WhichCases/WhichCases';
import { WhyZumcare } from '../../components/AboutUsComponents/WhyZumcare/WhyZumcare';
import { HowWork } from '../../components/AboutUsComponents/HowWork/HowWork';

import './Aboutus.css';

export function Aboutus() {
  return (
    <Container style={{ textAlign: 'center' }}>
      <Card style={{ padding: '0 10rem', background: 'rgb(242, 245, 255)' }}>
        <Title />
        <AboutService />
        <WhichCases />
        <WhyZumcare />
        <HowWork />
      </Card>
    </Container>
  );
}
