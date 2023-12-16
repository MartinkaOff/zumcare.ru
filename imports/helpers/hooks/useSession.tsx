import { useTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/sessions/Sessions';
import { Session } from '../types';

export function useSession(sessionId?: string) {
  const { session, isSessionLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('sessions.id', sessionId);
    const session = Sessions.findOne() as Session;
    return { session, isSessionLoading: !subscription.ready() };
  });

  return { session, isSessionLoading };
}
