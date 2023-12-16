import React from 'react';
import { Col, Card } from 'react-bootstrap';

import './RequestCard.css'

export function RequestCard({ title, text }: { title: string; text: string }) {
  return (
    // <Col className='request-card-wrapper' style={{ width: 'auto', justifyContent: 'center', paddingBottom: '1rem' }}>

    // </Col>
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className='request-card'
        style={{ paddingLeft: '30px' }}
      >
        <div className='request-card-title'>{title}</div>
        <p className='request-card-text'>{text}</p>
      </div>
    </div>
  );
}
