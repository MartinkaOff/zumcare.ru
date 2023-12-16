import { Meteor } from 'meteor/meteor';
import { RoomDB } from '../Room';

Meteor.publish('room.all', function () {
  return RoomDB.find();
});

Meteor.publish('room.sessionID', function (sessionID: string) {
  return RoomDB.find({ sessionID: sessionID });
});

Meteor.publish('room.id', function (roomID) {
  const room = RoomDB.find(roomID);
  return room;
});
