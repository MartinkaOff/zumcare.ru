import React from 'react';
import { Row, Container, Table, Card } from 'react-bootstrap';
import { Loading } from '../../components/Loading/Loading';
import { useMultipleSpecialists } from '../../../helpers/hooks/useMultipleSpecialists';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export function SpecialistsTable() {
  const { t } = useTranslation();
  const { specialists, isSpecialistsLoading } = useMultipleSpecialists();
  let history = useHistory();

  const navigateToSpecialistPage = (specialistId: string) => {
    history.push(`specialists/${specialistId}`);
  };

  return !isSpecialistsLoading ? (
    <Container>
      <h2 style={{ padding: '2rem 0 1rem 0' }}>{t('allSpecialists')}</h2>
      <Card>
        <Card.Body>
          <Row>
            {specialists?.length ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>{t("name")}</th>
                    <th>{t("surname")}</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {specialists.map((s, index) => (
                    <tr key={s.userId}>
                      <td>{index + 1}</td>
                      <td>{s._id}</td>
                      <td>{s.name}</td>
                      <td>{s.surname}</td>
                      <td>{s.email}</td>
                      <td>
                        <Button
                          onClick={() => navigateToSpecialistPage(s.userId)}
                        >
                          {t("details")}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              'No specialists for this specialization'
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <Loading />
  );
}
