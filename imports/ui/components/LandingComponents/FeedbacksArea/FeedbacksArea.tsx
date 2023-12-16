import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import './FeedbacksArea.css';

export function FeedbacksArea() {
  const { t } = useTranslation();
  return (
    <Container>
      <Row style={{ justifyContent: 'center' }}>
        <Col md={10} lg={8}>
          <h1 className='feedbacks-area-title title' style={{ textAlign: 'center', paddingBottom: '5rem' }}>
            {t('feedbackTitle')}
          </h1>
        </Col>
      </Row>
      <Row>
        <Carousel as={Col} variant='dark' style={{ justifyContent: 'center' }}>
          {[...Array(6).keys()].map((_, index) => (
            <Carousel.Item interval={3000} key={index}>
              <center>
                <img
                  style={{ width: '100%', height: 'auto', maxWidth: 400 }}
                  src={`feedbacks/${index + 1}.jpg`}
                  alt='First feedback'
                />
              </center>
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
    </Container>
  );
}
