import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Methodics } from '../../../api/methodics/Methodics';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { AddMethodicsContent } from './AddMethodicsContent';
import { Loading } from '../Loading/Loading';
import { PopupModal } from '../PopupModal/PopupModal';

export function MethodicsEditor() {
  const [show, setShow] = useState(false);

  const { methodics, isLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('methodics.all');
    const methodics = Methodics.find(
      {},
      {
        sort: { methodicsId: 1 },
      },
    ).fetch();

    return { methodics, isLoading: !subscription.ready() };
  });

  return (
    <Container>
      <PopupModal
        show={show}
        onHide={() => setShow(false)}
        content={<AddMethodicsContent onHide={() => setShow(false)} />}
        title='Add methodics'
        closeButton={true}
      />
      <Row style={{ flexDirection: 'row' }}>
        <Col md={8} sm={6} xs={6}>
          <h3>Methodics</h3>
        </Col>
        <Col md={4} sm={6} xs={6}>
          <Button
            variant='primary'
            size='lg'
            style={{ float: 'right' }}
            onClick={() => setShow(true)}
          >
            + New
          </Button>
        </Col>
      </Row>
      {!isLoading ? (
        methodics.length ? (
          <Row>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {methodics.map((m, i) => (
                  <tr key={m._id}>
                    <td>{i + 1}</td>
                    <td>{m.methodicsId}</td>
                    <td>{m.title}</td>
                    <td>{m.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        ) : (
          'no methodics yet'
        )
      ) : (
        <Loading />
      )}
    </Container>
  );
}
