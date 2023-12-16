import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Messages } from '../../../api/messages/Messages';

export function Chat({ userId, chatId }) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<string[] | never[]>([]);

  useEffect(() => {
    const handleMessages = Meteor.subscribe('messages', chatId);

    return () => {
      handleMessages.stop();
    };
  }, [chatId]);

  useEffect(() => {
    const messages = Messages.find({ chatId }).fetch();
    setChatMessages(messages.map((msg) => msg.content));
  }, [chatId]);

  const sendMessage = () => {
    const newMessage = {
      chatId: '',
      userId: '',
      content: message,
      createdAt: new Date(),
    };

    Meteor.call('messages.insert', newMessage, (error) => {
      if (error) {
        console.log('Error sending message:', error);
      } else {
        console.log('Message sent successfully!');
        // Additional actions after successful message send
      }
    });

    setMessage('');
  };

  console.log(chatMessages)

  return (
    <div>
      <div>
        {chatMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <InputGroup className='mb-3'>
        <Form.Control
          type='text'
          placeholder='Enter your message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant='primary' onClick={sendMessage}>
          Send
        </Button>
      </InputGroup>
    </div>
  );
}
