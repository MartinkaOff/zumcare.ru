import React, { useState } from 'react';
import { Container, Row, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';
// @ts-ignore
import { BasicDetails } from './BasicDetails/BasicDetails.tsx';
// @ts-ignore
import { AdvancedDetails } from './AdvancedDetails/AdvancedDetails.tsx';
import { Preferences } from '../Preferences/Preferences';
import { Statistics } from '../StatisticsForUsers/Statistics';

export function SpecialistCabinet() {
  const { specialist, isSpecialistLoading } = useSpecialist();
  const [part, setPart] = useState('basic_details');

  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        <Nav
          variant='pills'
          activeKey={part}
          onSelect={(s) => setPart(s ? s : '')}
        >
          <Nav.Item>
            <Nav.Link eventKey='basic_details'>{t('basicDetail')}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='advanced_details'>
              {t('advancedDetail')}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='preferences'>{t('preferences')}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='statistics'>{t('statistics')}</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
        {part === 'basic_details' ? (
          <BasicDetails
            specialist={specialist}
            isLoading={isSpecialistLoading}
          />
        ) : part === 'advanced_details' ? (
          <AdvancedDetails
            specialist={specialist}
            isLoading={isSpecialistLoading}
          />
        ) : part === 'statistics' ? (
          <Statistics/>
        ) : (
          <Preferences />
        )}
      </Row>
    </Container>
  );
}
