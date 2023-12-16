import React from 'react';
import { Col } from 'react-bootstrap';

export function Source({ img, link }: { img: string; link?: string }) {
  return (
    <Col style={{ padding: '2rem' }}>
      <a href={link} target='_blank'>
        <img className='source-img' src={img} style={{ maxWidth: 220 }} />
      </a>
    </Col>
  );
}
