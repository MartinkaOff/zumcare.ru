import {check} from 'meteor/check';
import {Specializations} from '../Specializations';

Meteor.methods({
  'specializations.insert'(data) {
    check(data, {
      title: String,
      description: String,
      specializationId: String,
    });

    Specializations.insert(data);
  },

  // 'specializations.remove'(specializationId) {
  //   check(specializationId, String);

  //   if (!this.userId) {
  //     throw new Meteor.Error('Not authorized.');
  //   }

  //   const specialization = Specializations.findOne(specializationId);
  //   Specialists.remove(specialization._id);
  // },
});
