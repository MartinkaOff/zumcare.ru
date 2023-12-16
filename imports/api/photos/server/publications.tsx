import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Photos } from '../Photos';

Meteor.publish('photos.id', function (userId) {
  check(userId, String);

  return Photos.find({ userId: userId });
});
