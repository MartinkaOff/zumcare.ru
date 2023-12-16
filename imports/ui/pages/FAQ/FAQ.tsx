import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Questions } from './ListQuestions';
import { FAQContent } from './QuestionContent';
import { PopupModal } from '../../components/PopupModal/PopupModal';

export function FAQ() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <Container>
      <PopupModal
        show={show}
        onHide={() => setShow(false)}
        content={<FAQContent show={show} setShow={setShow} />}
        title='Задайте свой вопрос'
        closeButton={true}
      />
      <Row className='heading-ribbon'>
        <Col md={8}>
          <h2 className='heading'>
            Узнайте ответы на часто задаваемые вопросы
          </h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Questions />
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <Button variant='primary' onClick={handleShow}>
            Задайте свой вопрос
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
