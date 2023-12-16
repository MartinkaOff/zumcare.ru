import {useTracker} from 'meteor/react-meteor-data';
import {Specializations} from '../../api/specializations/Specializations';
import {Specialization} from '../types';

export function useSpecializations() {
  const {specializations, isSpecializationsLoading} = useTracker(() => {
    const subscription = Meteor.subscribe('specializations.all');
    const specializations = Specializations.find(
      {},
      {
        sort: {specializationId: 1},
      }
    ).fetch() as Specialization[];

    return {specializations, isSpecializationsLoading: !subscription.ready()};
  });

  return {specializations, isSpecializationsLoading};
}
