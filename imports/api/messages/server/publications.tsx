import { Meteor } from 'meteor/meteor';
import { Messages } from '../Messages';
import { check } from 'meteor/check';

Meteor.publish('messages.chat', function (sessionId) {
  check(sessionId, String);

  if (this.userId) {
    return Messages.find({ sessionId: sessionId });
  }

  return this.ready();
});

Meteor.publish('messages.allChat', function () {
  return Messages.find({});
});
