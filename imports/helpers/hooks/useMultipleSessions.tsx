import { useTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/sessions/Sessions';
import { Session } from '../types';

export function useMultipleSessions(userId?: string, userType?: string) {
  const { sessions, isSessionLoading } = useTracker(() => {
    const subscription = Meteor.subscribe(
      userId ? 'sessions.user' : 'sessions.all',
      userType && userType,
    );
    const sessions = Sessions.find().fetch() as Session[];
    return { sessions, isSessionLoading: !subscription.ready() };
  });
  return { sessions, isSessionLoading };
}
