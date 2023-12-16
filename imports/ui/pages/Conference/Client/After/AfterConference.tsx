import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import {
  useFeedback,
  useFeedbacks,
} from '../../../../../helpers/hooks/useFeedback';
import { Loading } from '../../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { useMultipleSessions } from '../../../../../helpers/hooks/useMultipleSessions';
import { useTranslation } from 'react-i18next';
import { useClient } from '../../../../../helpers/hooks/useClient';

export function AfterConference({ ID, Session }) {
  const history = useHistory();
  const [feelingRating, setFeelingRating] = useState(0);
  const [recommendSpecialistRating, setRecommendSpecialistRating] = useState(0);
  const [recommendServiceRating, setRecommendServiceRating] = useState(0);
  const [comments, setComments] = useState('');
  const { feedback, isFeadbackLoading } = useFeedback(ID);
  const { feedbacks, isFeadbacksLoading } = useFeedbacks();
  const { client } = useClient(Session.clientId)

  console.log(client)

  const { t } = useTranslation();

  const handleFeelingRatingChange = (event) => {
    setFeelingRating(parseInt(event.target.value, 10));
  };

  const handleRecommendSpecialistRatingChange = (event) => {
    setRecommendSpecialistRating(parseInt(event.target.value, 10));
  };

  const handleRecommendServiceRatingChange = (event) => {
    setRecommendServiceRating(parseInt(event.target.value, 10));
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    feedback.after = feelingRating;
    feedback.specialist = recommendServiceRating;
    feedback.service = recommendServiceRating;
    feedback.comment = comments;

    // Call the server-side method to insert the assessment data
    Meteor.call('feedback.update', feedback, (error) => {
      if (error) {
        // Handle the error
        console.error('Error inserting assessment:', error);
      } else {
        // Success message or any additional actions
        console.log('Assessment inserted successfully!');
      }
    });

    Session.StartTime = new Date();
    Session.status = 'end';

    Meteor.call('clients.completeSession', client.userId)

    console.log(client)

    Meteor.call('sessions.update', Session, (error) => {
      if (error) {
        // Handle the error
        console.error('Error inserting assessment:', error);
      } else {
        // Success message or any additional actions
        console.log('Assessment inserted successfully!');
      }
    });

    history.push(`/`);
  };

  return !isFeadbackLoading ? (
    <Card className='text-center'>
      <Card.Body>
        <Card.Text className='text-danger'>Если вы случайно закончили разговор видеозвонка, не заполняйте данную форму!</Card.Text>
        <Card.Title>{t("assessment")}</Card.Title>

        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>{t("feelingAfterSession")}</Card.Title>
            <Form onSubmit={handleSubmit}>
              <div className='d-flex justify-content-center'>
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className='mx-2'>
                    <Form.Check
                      type='radio'
                      id={`feeling-rating-${value}`}
                      label={value}
                      name='feelingRating'
                      value={value}
                      checked={feelingRating === value}
                      onChange={handleFeelingRatingChange}
                    />
                  </div>
                ))}
              </div>
            </Form>
          </Card.Body>
        </Card>

        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>
              {t("recommendThisSpecialist")}
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <div className='d-flex justify-content-center'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <div key={value} className='mx-2'>
                    <Form.Check
                      type='radio'
                      id={`recommend-specialist-rating-${value}`}
                      label={value}
                      name='recommendSpecialistRating'
                      value={value}
                      checked={recommendSpecialistRating === value}
                      onChange={handleRecommendSpecialistRatingChange}
                    />
                  </div>
                ))}
              </div>
            </Form>
          </Card.Body>
        </Card>

        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>
              {t("recommendOurService")}
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <div className='d-flex justify-content-center'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <div key={value} className='mx-2'>
                    <Form.Check
                      type='radio'
                      id={`recommend-service-rating-${value}`}
                      label={value}
                      name='recommendServiceRating'
                      value={value}
                      checked={recommendServiceRating === value}
                      onChange={handleRecommendServiceRatingChange}
                    />
                  </div>
                ))}
              </div>
            </Form>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>{t("anyComments")}</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='comments'>
                <Form.Control
                  as='textarea'
                  rows={3}
                  value={comments}
                  onChange={handleCommentsChange}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        <Button variant='primary' type='submit' onClick={handleSubmit}>
          {t("send")}
        </Button>
      </Card.Body>
    </Card>
  ) : (
    <Loading />
  );
}
