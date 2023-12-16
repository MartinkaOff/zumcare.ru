import {useTracker} from 'meteor/react-meteor-data';
import {Specialists} from '../../api/specialists/Specialists';
import {Specialist, Specialization, Timezone} from '../types';

export function useMultipleSpecialists(
  withPhoto?: boolean | null,
  specialization?: Specialization | null
) {
  const {specialists, isSpecialistsLoading} = useTracker(() => {
    const subscription = withPhoto
      ? Meteor.subscribe('specialists.withPhoto')
      : Meteor.subscribe('specialists.all', specialization);
    const specialists = Specialists.find().fetch() as Specialist[];
    return {specialists, isSpecialistsLoading: !subscription.ready()};
    
  });
  return {specialists, isSpecialistsLoading};
}

