import React, {useState} from "react"
import { BasicDetails } from "./BasicDetail/BasicDetail"
import { Statistics } from "../StatisticsForUsers/Statistics";
import {Container, Row, Nav} from 'react-bootstrap';
import { useTranslation } from "react-i18next";

import { useClient } from "../../../helpers/hooks/useClient"

export function ClientCabinet() {
    const {client, isClientLoading} = useClient();
    const [part, setPart] = useState('basic_details');
    const {t} = useTranslation();

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
                <Nav.Link eventKey='statistics'>{t("statistics")}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>

            {part === 'basic_details' ? (
              <BasicDetails
              client={client}
              isLoading={isClientLoading}
              />
            ) : (<Statistics/>)
          }
          </Row>
        </Container>
      );
}