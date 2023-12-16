import React, { useState } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { usePromoCodes } from '../../../helpers/hooks/usePromoCodes';
import { isWithinInterval } from 'date-fns';
import { useClient } from '../../../helpers/hooks/useClient';
import { useTranslation } from 'react-i18next';

export function EnterPromoCode() {
  const { client } = useClient();
  const { promoCodes } = usePromoCodes();
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { t } = useTranslation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCodeInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const promoCode = promoCodes.find(
      (promoCode) => promoCode.code === promoCodeInput,
    );
    if (!promoCode) {
      setShowAlert(true);
      setShowSuccess(false);
    } else if (
      !isWithinInterval(new Date(), {
        start: promoCode.startDate,
        end: promoCode.endDate,
      })
    ) {
      setShowAlert(true);
      setShowSuccess(false);
    } else if (promoCode.maxUses > 0) {
      Meteor.call(
        'promoCodes.apply',
        promoCodeInput,
        { userId: client.userId, email: client.email, company: client.company },
        (err, res) => {
          if (err) {
            setShowAlert(true);
            setShowSuccess(false);
          } else {
            setShowAlert(false);
            setShowSuccess(true);
            // some action when the promo code is triggered
          }
        },
      );
    } else {
      setShowAlert(true);
      setShowSuccess(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group>
              <Form.Label>{t("enterPromoCode")}</Form.Label>
              <Form.Control
                type='text'
                placeholder={t("enterPromoCode") as string}
                value={promoCodeInput}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <Button
                variant='primary'
                type='submit'
                style={{ width: '70%', margin: '1rem' }}
              >
                {t('confirm')}
              </Button>
            </Col>
          </Row>
        </Form>
        {showAlert && (
          <Alert variant='danger'>
            This promo code is invalid or has expired.
          </Alert>
        )}
        {showSuccess && (
          <Alert variant='success'>
            This promo code has been successfully applied!
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}
