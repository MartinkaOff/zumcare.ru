import React from 'react';
import {Col} from 'react-bootstrap';
import './OnlineTherapyStyle.css';

export function OnlineTherapyCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <Col className='therapy-element-wrapper'>
      <div className='therapy-element'>
        <h5 className='therapy-element-header'>{title}</h5>
        <p className='therapy-element-text'>{text}</p>
      </div>
    </Col>
  );
}
