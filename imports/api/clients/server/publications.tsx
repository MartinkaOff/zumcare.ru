import {Meteor} from 'meteor/meteor';
import {Clients} from '../Clients';

Meteor.publish('clients', function () {
  return Clients.find();
});

Meteor.publish('clients.user', function () {
  if (this.userId) {
    const cursor = Clients.find({userId: this.userId});
    if (cursor) return cursor;
  }
  return this.ready();
});

Meteor.publish('clients.getByUserId', function (userId: string) {
  const cursor = Clients.find({userId: userId});
  if (cursor) return cursor;
  return this.ready();
});

