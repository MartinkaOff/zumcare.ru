import {useTracker} from 'meteor/react-meteor-data';
import {Photos} from '../../api/photos/Photos';
import {Photo} from '../types';

export function usePhoto(userId?: string) {
  const {photo, isPhotoLoading} = useTracker(() => {
    const subscription = Meteor.subscribe('photos.id', userId);
    const photo = Photos.findOne() as Photo;
    return {photo, isPhotoLoading: !subscription.ready()};
  });

  return {photo, isPhotoLoading};
}
