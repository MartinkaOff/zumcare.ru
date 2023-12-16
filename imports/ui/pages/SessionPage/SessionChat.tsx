import moment from 'moment/moment';
import React, { useState } from 'react';
import { Card, Col, Alert, Button } from 'react-bootstrap';
import { useMessages } from '../../../helpers/hooks/useMessages';
import { Loading } from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

export function SessionChat({ sessionId, userIsClient, userIsSpecialist, clientId, specialistId }) {
  const user = Meteor.user();
  const { messages, isMessagesLoading } = useMessages(sessionId);
  const [messageText, setMessageText] = useState('');
  const { t } = useTranslation();
  const messagesFilter = messages.filter(messages => messages.sessionId === sessionId);
  const messageSelf = messagesFilter.filter(messages => messages.userId !== user?._id)

  const handleMessageSend = () => {
    if (messageText.trim() !== '') {
      Meteor.call(
        'messages.send',
        messageText,
        Meteor.userId(),
        sessionId,
        clientId,
        specialistId,
        (error: any) => {
          if (error) {
            console.log(error);
          }
        },
      );
      setMessageText('');
    }
  };

  Meteor.call('messages.read', sessionId, user, clientId, specialistId)

  return userIsClient || userIsSpecialist ? (
    <Card style={{ height: '80vh' }}>
      <Card.Header>{t("messages")}</Card.Header>
      {!isMessagesLoading ? (
        <Card.Body style={{ overflow: 'auto' }}>
          {messages.length > 0 ? (
            messagesFilter.map((message) => (
              <div
                key={message._id}
                style={{
                  padding: '1rem',
                  marginTop: '0.5rem',
                  width: '70%',
                  backgroundColor:
                    message.userId === Meteor.userId()
                      ? 'lightgreen'
                      : '#f9d695',
                  borderRadius: 25,
                  float: message.userId === Meteor.userId() ? 'right' : 'left',
                }}
              >
                <p>{message.content}</p>
                <p
                  style={{
                    fontSize: 12,
                    marginBottom: '-0.5rem',
                    float: 'right',
                  }}
                >
                  {moment(message.createdAt).startOf('second').fromNow()}
                </p>
              </div>
            ))
          ) : (
            <Col xs={12}>
              <Alert variant='warning'>{t("noMessages")}</Alert>
            </Col>
          )}
        </Card.Body>
      ) : (
        <Loading />
      )}
      <Card.Body style={{ height: '20vh' }}>
        <textarea
          className='form-control mb-3'
          rows={2}
          value={messageText}
          //@ts-ignore
          placeholder={t("writeMessage")}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <div style={{ textAlign: 'center' }}>
          <Button variant='primary' onClick={handleMessageSend}>
            {t("sendMessage")}
          </Button>
        </div>
      </Card.Body>
    </Card>
  ) : (
    <Alert variant='warning'>Недостаточно прав для просмотра!</Alert>
  );
}
