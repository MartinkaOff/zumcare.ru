import { Meteor } from 'meteor/meteor';
import { Sessions } from '../Sessions';
import { check } from 'meteor/check';

Meteor.publish('sessions.all', function () {
  return Sessions.find({});
});

Meteor.publish('sessions.user', function (userType: string) {
  if (this.userId) {
    return Sessions.find(
      userType === 'client'
        ? { clientId: this.userId }
        : { specialistId: this.userId },
    );
  }
});

Meteor.publish('sessions.id', function (sessionId: string) {
  check(sessionId, String);

  return Sessions.find(sessionId);
});
