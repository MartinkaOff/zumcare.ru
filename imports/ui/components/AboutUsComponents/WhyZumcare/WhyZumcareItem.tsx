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
  },
  {
    order: 2,
    textItems: [
      'checkProfessionalismExperience',
      'successfulCasesDeclaredSpecializations',
      'knowledgeWorkStructureMind',
      'levelEmpathyEthicalPrinciples',
      'consultationExperiencedColleagues',
      'totalConsultationHoursClientRecommendations',
    ],
  },
  {
    order: 3,
    textItems: [
      'clientsPriority',
      'considerAllSuggestionsInnovations',
      'analyzeFeedbackSpecialist',
      'findAlternativeTherapistIfNotSuitable',
      'confidentialityAgreement',
    ],
  },
];

export function WhyZumcareItem({ textItems, order }) {
  const { t } = useTranslation();

  return (
    <Col>
      {t('whyZumcareItem.order', { order })}
      <ul>
        {textItems.map((item, index) => (
          <li style={{ listStyle: 'none' }} key={index}>
            {t(`whyZumcareItem.textItems.${index}`, { item: t(item) })}
          </li>
        ))}
      </ul>
    </Col>
  );
}
