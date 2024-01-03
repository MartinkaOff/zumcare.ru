import React from 'react';
import { Specialist } from '../../../helpers/types';
import { useHistory, useLocation } from 'react-router-dom';
import { Col, Card, Button } from 'react-bootstrap';
import { usePhoto } from '../../../helpers/hooks/usePhoto';
import { Photos } from '../../../api/photos/Photos';
import { Loading } from '../Loading/Loading';
import { useTranslation } from 'react-i18next';

import './SpecialistCard.css';

export function SpecialistCard({
  name,
  experience,
  background,
  userId
}: Specialist) {
  const { t } = useTranslation();
  let history = useHistory();
  let location = useLocation();
  const { isPhotoLoading } = usePhoto(userId);
  const specialistPhoto = Photos.findOne({ userId: userId });

  const redirectToSpecialistPage = (userId: string) => {
    if (location.pathname === '/specialists/picker_results')
      history.push(`${userId}`);
    else history.push(`specialists/${userId}`);
  };

  return (
    <Col style={{ paddingBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
      <Card className='specialist_card'>
        <div className='specialist_card-top'>
          {!isPhotoLoading ? (
            <Card.Img className='specialist_card_img' variant='top' src={specialistPhoto?.photo} />
          ) : <Loading />}
        </div>
        {/* <Card.Img variant='top' src={specialistPhoto?.photo} /> */}
        <Card.Body className='specialist_card_body'>
          <Card.Title>{name}</Card.Title>
          <hr />
          <p>
            <b>{t('experience')}:</b> {experience}
          </p>
          <p className='specialist_card_text'>
            <b>{t('background')}:</b> <br /> {background}
          </p>
        </Card.Body>
        <Button
          className='btn-btn-opacity'
          variant='none'
          style={{ margin: '1rem' }}
          onClick={() => redirectToSpecialistPage(userId)}
        >
          {t('view')}
        </Button>
      </Card>
    </Col>
  )
}
