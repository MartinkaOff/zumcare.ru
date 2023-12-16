import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './SpecialistPortfolioStyle.css';

export function LowerRibbon({ specialist, isSpecialistLoading }) {
  const { t } = useTranslation();

  return !isSpecialistLoading ? (
    <Row className='lower-ribbon-container'>
      <h4 className='lower-ribbon-section-header'>{t('achievements')}</h4>
      <p style={{ wordWrap: 'break-word' }}>
        {specialist && specialist.descriptor
          ? specialist.descriptor
          : 'Нет данных'}
      </p>

      <h4 className='lower-ribbon-section-header'>
        {t('experienceBackground')}
      </h4>
      <p style={{ wordWrap: 'break-word' }}>
        {t('experience')}:{' '}
        {specialist && specialist.experience
          ? specialist?.experience + ' ' + t('years')
          : 'Нет данных по опыту'}
        <br />
        {specialist && specialist.background
          ? specialist.background
          : 'Нет данных по образованию'}
      </p>

      <h4 className='lower-ribbon-section-header'>{t('specializations')}</h4>
      <p style={{ wordWrap: 'break-word' }}>
        {specialist?.specializations
          ? specialist?.specializations.map(
              (s: { label: string }, index: number) =>
                index === specialist?.specializations.length - 1
                  ? s.label
                  : s.label + ', ',
            )
          : 'Нет данных по специализации'}
      </p>
    </Row>
  ) : (
    <Spinner animation='grow' />
  );
}
