import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function BeforeConference({ ID, Session, sessionParams }) {
  const history = useHistory();
  const [rating, setRating] = useState(0);
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const feadbackData = {
      before: rating,
      sessionID: ID,
    };
    Meteor.call('feedback.insert', feadbackData, (error) => {
      if (error) {
        console.error('Error inserting assessment:', error);
      } else {
        console.log('Assessment inserted successfully!');
      }
    });

    Session.StartTime = new Date();
    Session.status = 'connect';


    Meteor.call('sessions.update', Session, (error) => {
      if (error) {
        console.error('Error inserting assessment:', error);
      } else {
        console.log('Assessment inserted successfully!');
      }
    });

    history.push(`/conference/` + ID);
  };

  return (
    <Card className='text-center'>
      <Card.Body>
        <Card.Title style={{ fontSize: '15px' }}>{t("assessment")}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='rating'>
            <Form.Label style={{ fontSize: '20px' }}>{t("feelingBeforeSession")}</Form.Label>
            <div style={{ fontSize: "20px" }} className='d-flex justify-content-center'>
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className='mx-2'>
                  <Form.Check
                    type='radio'
                    id={`rating-${value}`}
                    label={value}
                    name='rating'
                    value={value}
                    checked={rating === value}
                    onChange={handleRatingChange}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <Button variant='primary' type='submit' disabled={rating === 0}>
            {t("submit")}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
