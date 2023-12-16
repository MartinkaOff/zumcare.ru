import { check, Match } from 'meteor/check';
import { RoomDB } from '../Room';
import { Room } from '../../../helpers/types';

Meteor.methods({
  'room.insert'(data: Room) {
    check(data, {
      room: String,
      status: Match.Optional(String),
      StartTime: Match.Optional(Date),
      endTime: Match.Optional(Date),
      schedule: Date,
      step: String,
      specialist: String,
      client: String,
      sessionID: String,
    });

    return RoomDB.insert(data);
  },
  'room.update'(data: Room) {
    check(data, {
      _id: String,
      room: String,
      status: String,
      StartTime: Date,
      endTime: Match.Optional(Date),
      schedule: Date,
      step: String,
      specialist: String,
      client: String,
      sessionID: String,
    });

    const room = RoomDB.findOne({ _id: data._id });
    if (room) RoomDB.update(room._id, { $set: { ...data } });
  },
});
