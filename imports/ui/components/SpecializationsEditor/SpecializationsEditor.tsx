import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Specializations } from '../../../api/specializations/Specializations';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import AddSpecializationContent from './AddSpecializationContent';
import { Loading } from '../Loading/Loading';
import { PopupModal } from '../PopupModal/PopupModal';
import { useTranslation } from 'react-i18next';

export function SpecializationsEditor() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const { specializations, isLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('specializations.all');
    const specializations = Specializations.find(
      {},
      {
        sort: { specializationId: 1 },
      },
    ).fetch();

    return { specializations, isLoading: !subscription.ready() };
  });

  return (
    <Container>
      <PopupModal
        show={show}
        onHide={() => setShow(false)}
        content={<AddSpecializationContent onHide={() => setShow(false)} />}
        title={t("addSpecialization")}
        closeButton={true}
      />
      <Row style={{ flexDirection: 'row' }}>
        <Col md={8} sm={6} xs={6}>
          <h3>{t('specializations')}</h3>
        </Col>
        <Col md={4} sm={6} xs={6}>
          <Button
            variant='primary'
            size='lg'
            style={{ float: 'right' }}
            onClick={() => setShow(true)}
          >
            {t("add")}
          </Button>
        </Col>
      </Row>
      {!isLoading ? (
        specializations.length ? (
          <Row>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>{t("title")}</th>
                  <th>{t("description")}</th>
                </tr>
              </thead>
              <tbody>
                {specializations.map((s, i) => (
                  <tr key={s._id}>
                    <td>{i + 1}</td>
                    <td>{s.specializationId}</td>
                    <td>{s.title}</td>
                    <td>{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        ) : (
          'no specializations yet'
        )
      ) : (
        <Loading />
      )}
    </Container>
  );
}
