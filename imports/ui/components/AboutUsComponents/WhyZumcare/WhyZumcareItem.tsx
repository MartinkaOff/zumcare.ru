import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const casesZumcare = [
  {
    order: 1,
    textItems: [
      'checkEducation',
      'diplomaPsychologicalMedicalEducation',
      'additionalEducationLongTermPsychotherapy',
    ],
  }
];

export function WhyZumcareItem({ textItems, order }) {
  const { t } = useTranslation();

  return (
    <Col>
      <ul className='whyZumcareItems' style={{ textAlign: 'left' }}>
        {textItems.map((item, index) => (
          <div className='whyZumcareItem'>
            <li className='about-service-text-21px' style={{ listStyle: 'none', color: '#201132', width: '100%', fontSize: '19px' }} key={index}>
              {t(`whyZumcareItem.textItems.${index}`, { item: t(item) })}
            </li>
          </div>
        ))}
      </ul>
    </Col>
  );
}
