import { check } from 'meteor/check';
import { Methodics } from '../Methodics';

Meteor.methods({
  'methodics.insert'(data) {
    check(data, {
      title: String,
      description: String,
      methodicsId: String,
    });

    Methodics.insert(data);
  },

  // "methodics.remove"(methodicsId) {
  //   check(methodicsId, String);

  //   if (!this.userId) {
  //     throw new Meteor.Error("Not authorized.");
  //   }

  //   const methodics = Methodics.findOne(methodicsId);
  //   Methodics.remove(methodics._id);
  // }
});
