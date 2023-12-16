import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Messages } from '../Messages';

Meteor.methods({
  'messages.insert'(message) {
    check(message, {
      senderId: String,
      recipientId: String,
      content: String,
      files: Array,
    });

    const messageId = Messages.insert({
      ...message,
      createdAt: new Date(),
    });

    return messageId;
  },

  'messages.send'(content, userId, sessionId, clientId, specialistId) {
    check(content, String);
    check(userId, String);
    check(sessionId, String);

    Messages.insert({
      content,
      userId,
      sessionId,
      clientId,
      specialistId,
      createdAt: new Date(),
      read: false
    });
  },

  'messages.remove'(messageId) {
    check(messageId, String);

    Messages.remove(messageId);
  },
  'messages.read'(messageId, user) {
    const messages = Messages.findOne({ sessionId: messageId, read: false })
    if (messages !== undefined && messages.userId !== user._id) {
      Messages.update(messages._id, { $set: { read: true } });
    }
  }
});
