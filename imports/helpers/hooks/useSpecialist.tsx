import { useTracker } from 'meteor/react-meteor-data';
import { Specialists } from '../../api/specialists/Specialists';
import { Specialist } from '../types';

export function useSpecialist(userId?: string) {
  const { specialist, isSpecialistLoading } = useTracker(() => {
    const subscription = !!userId
      ? Meteor.subscribe('specialists.getByUserId', userId)
      : Meteor.subscribe('specialists.user');
    const specialist = Specialists.findOne() as Specialist;
    return { specialist, isSpecialistLoading: !subscription.ready() };
  });

  return { specialist, isSpecialistLoading };
}
