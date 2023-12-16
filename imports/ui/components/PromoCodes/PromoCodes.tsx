import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Table,
  Row,
  Card,
  Col,
} from 'react-bootstrap';
import { useTranslation } from "react-i18next"
import { Meteor } from 'meteor/meteor';
import { usePromoCodes } from '../../../helpers/hooks/usePromoCodes';
import { EnterPromoCode } from './EnterPromoCode';
import { Loading } from '../Loading/Loading';

export function PromoCodes() {
  const { promoCodes, isPromoCodesLoading } = usePromoCodes();
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [maxUses, setMaxUses] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [company, setCompany] = useState('');

  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Meteor.call('promoCodes.insert', {
      code,
      discount,
      maxUses,
      startDate,
      endDate,
      company,
    });
    setCode('');
    setDiscount(0);
    setMaxUses(0);
    setStartDate(new Date());
    setEndDate(new Date());
    setCompany('');
  };

  return !isPromoCodesLoading ? (
    <Container>
      <Row style={{ padding: '2rem 0 1rem 0' }}>
        <h1>{t("addPromoCode")}</h1>
      </Row>
      <Row>
        <Card>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>{t("promoCode")}</th>
                  <th>{t("discount")}</th>
                  <th>{t("numberOfUses")}</th>
                  <th>{t("start")}</th>
                  <th>{t("сompletion")}</th>
                  <th>{t("dateOfFirstUse")}</th>
                  <th>{t("organization")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {promoCodes.map((promoCode) => (
                  <tr key={promoCode._id}>
                    <td>{promoCode.code}</td>
                    <td>{promoCode.discount}</td>
                    <td>{promoCode.maxUses}</td>
                    <td>{promoCode.startDate.toLocaleDateString()}</td>
                    <td>{promoCode.endDate.toLocaleDateString()}</td>
                    <td>{promoCode.firstUseDate?.toLocaleDateString()}</td>
                    <td>{promoCode.company}</td>
                    <td>
                      <Button
                        variant='danger'
                        style={{ float: 'right' }}
                        onClick={() => {
                          Meteor.call('promoCodes.remove', promoCode._id);
                        }}
                      >
                        Удалить
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
      <br />
      <Row>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>{t("promoCode")}</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder={t("promoCode") as string}
                      defaultValue={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>{t("discount")}</Form.Label>
                    <Form.Control
                      type='number'
                      defaultValue={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>{t("numberOfUses")}</Form.Label>
                    <Form.Control
                      type='number'
                      defaultValue={maxUses}
                      onChange={(e) => setMaxUses(Number(e.target.value))}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>{t("start")}</Form.Label>
                    <Form.Control
                      type='date'
                      value={startDate.toISOString().slice(0, 10)}
                      onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>{t("сompletion")}</Form.Label>
                    <Form.Control
                      type='date'
                      value={endDate.toISOString().slice(0, 10)}
                      onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>{t("organization")}</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder={t("enterCompanyName") as string}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col style={{ textAlign: 'center' }}>
                  <Button
                    variant='primary'
                    type='submit'
                    style={{ margin: '1rem', width: '70%' }}
                  >
                    {t("addPromoCode")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <br />
      <Row>
        <EnterPromoCode />
      </Row>
      <br />
    </Container>
  ) : (
    <Loading />
  );
}
