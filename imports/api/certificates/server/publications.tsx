import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Certificates } from '../Certificates';

Meteor.publish('certificates.specialist_id', function (userId) {
  check(userId, String);

  return Certificates.find({ specialistUserId: userId });
});
