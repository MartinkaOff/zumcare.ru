import {Meteor} from 'meteor/meteor';
import {Methodics} from '../Methodics';

Meteor.publish('methodics.all', function () {
  const cursor = Methodics.find();
  if (cursor) return cursor;
  return this.ready();
});

Meteor.publish('methodics.id', function (methodicsId) {
  const cursor = Methodics.find(methodicsId);
  return cursor;
});
