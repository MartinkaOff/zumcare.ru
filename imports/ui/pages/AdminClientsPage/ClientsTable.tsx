import React from 'react';
import { Row, Container, Table, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useMultipleClients } from '../../../helpers/hooks/useMultipleClients';
import { Loading } from '../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';

export function ClientsTable({ part }) {
  const { t } = useTranslation();
  const { clients, isClientsLoading } = useMultipleClients();
  let history = useHistory();

  const navigateToSpecialistPage = (clientId: string) => {
    history.push(`clients/${clientId}`);
  };

  const clientsFilter = clients.filter(client => {
    return part === 'corp_clients' ? client.company : !client.company
  })

  console.log(clients)

  return !isClientsLoading ? (
    <Container>
      <h2 style={{ padding: '2rem 0 1rem 0' }}>{t('allClients')}</h2>
      <Card>
        <Card.Body>
          <Row>
            {clientsFilter?.length ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>{t("name")}</th>
                    <th>{t("surname")}</th>
                    <th>Email</th>
                    <th>Количество сессий</th>
                    {part === 'corp_clients' ? <th>Компания</th> : ''}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clientsFilter.map((s, index) => (
                    <tr key={s.userId}>
                      <td>{index + 1}</td>
                      <td>{s._id}</td>
                      <td>{s.name}</td>
                      <td>{s.surname}</td>
                      <td>{s.email}</td>
                      <td>{s.completeSessions}</td>
                      {part === 'corp_clients' ? <td>{s.company}</td> : ''}
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
              'No clients'
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <Loading />
  );
}
