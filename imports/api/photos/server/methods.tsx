import {check} from 'meteor/check';
import {Photos} from '../Photos';
import {Photo} from '../../../helpers/types';
import {Specialists} from '../../specialists/Specialists';

Meteor.methods({
  'photos.insert'(data: Photo) {
    check(data, {
      userId: String,
      name: String,
      surname: String,
      photo: String,
    });

    const photoInDb = Photos.findOne({userId: data.userId});
    if (photoInDb) Photos.update({userId: photoInDb.userId}, {$set: data});
    else {
      Photos.insert(data);
      Specialists.update({userId: data.userId}, {$set: {photo: true}});
    }
  },
});
