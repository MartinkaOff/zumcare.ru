import {Meteor} from 'meteor/meteor';
import {Specializations} from '../Specializations';

Meteor.publish('specializations.all', function () {
  const cursor = Specializations.find();
  if (cursor) return cursor;
  return this.ready();
});

// Meteor.publish("specializations.id", function (specializationId) {
//   const cursor = Specializations.find(specializationId);
//   return cursor;
// });
