import { useTracker } from 'meteor/react-meteor-data';
import { RoomDB } from '../../api/room/Room';
import { Room } from '../types';

export function useRoom(_id?: string) {
  const { room, isRoomLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('room.sessionID', _id);
    const room = RoomDB.findOne({ sessionID: _id }) as Room;
    return { room, isRoomLoading: !subscription.ready() };
  }, [_id]);

  return { room, isRoomLoading };
}

export function useRooms() {
  const { rooms, isRoomsLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('room.all');
    const rooms = RoomDB.find().fetch() as Room[];
    return { rooms, isRoomsLoading: !subscription.ready() };
  });

  return { rooms, isRoomsLoading };
}
