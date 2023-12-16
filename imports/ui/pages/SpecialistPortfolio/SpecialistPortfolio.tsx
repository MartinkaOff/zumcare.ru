import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';
import { useMultipleSchedules } from '../../../helpers/hooks/useMultipleSchedules';
import { usePhoto } from '../../../helpers/hooks/usePhoto';
import { TopRibbon } from './TopRibbon';
import { LowerRibbon } from './LowerRibbon';
import './SpecialistPortfolioStyle.css';

export function SpecialistPortfolio() {
  const { userId } = useParams();
  const { specialist, isSpecialistLoading } = useSpecialist(userId);
  const { schedules } = useMultipleSchedules();
  const { photo, isPhotoLoading } = usePhoto(userId);

  return (
    <Container className='main-container'>
      <TopRibbon
        photo={photo?.photo}
        isPhotoLoading={isPhotoLoading}
        specialist={specialist}
        isSpecialistLoading={isSpecialistLoading}
        specialistUserId={userId}
        schedules={schedules}
      />
      <LowerRibbon
        specialist={specialist}
        isSpecialistLoading={isSpecialistLoading}
      />
    </Container>
  );
}
