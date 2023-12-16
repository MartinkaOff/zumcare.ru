import React from 'react';
import { Col } from 'react-bootstrap';

import './EnrollStepCard.css'

export function EnrollStepCard({
  order,
  title,
  text,
}: {
  order: number;
  title: string;
  text: string;
}) {
  return (
    <Col className='enroll-step-card-block' style={{ justifyContent: 'center', paddingBottom: '1rem' }}>
      <div className='enroll-step-card'>
        {/* <img src={`steps/0${order}.png`} /> */}
        <div className="enroll-step-card-order">
          {`0${order}`}
        </div>
        <div className='enroll-step-card-wrapper'>
          <h4 className='enroll-step-card-order-title'>{title}</h4>
          <p className='enroll-step-card-order-text'>{text}</p>
        </div>
      </div>
    </Col>
  );
}
