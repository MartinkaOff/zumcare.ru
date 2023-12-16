import { Meteor } from 'meteor/meteor';
import { Specialists } from '../Specialists';
import { Specialization } from '../../../helpers/types';

Meteor.publish('specialists.all', function (specialization: Specialization) {
  if (!specialization) {
    const cursor = Specialists.find();
    if (cursor) return cursor;
  } else {
    const queryParams = {
      value: specialization.specializationId,
      label: specialization.title,
    };
    const cursor = Specialists.find({ specializations: { $in: [queryParams] } });
    if (cursor) return cursor;
    
  }
  return this.ready();
});

Meteor.publish('specialists.picker', function (specialization: Specialization) {
  const cursor = Specialists.find({ specializations: { $in: [specialization] } });
  if (cursor) return cursor;
});

Meteor.publish('specialists.user', function () {
  if (this.userId) {
    const cursor = Specialists.find({ userId: this.userId });
    if (cursor) return cursor;
  }
  return this.ready();
});

Meteor.publish('specialists.getByUserId', function (userId: string) {
  const cursor = Specialists.find({ userId: userId });
  if (cursor) return cursor;
  return this.ready();
});

Meteor.publish('specialists.withPhoto', function () {
  const cursor = Specialists.find({ photo: true });
  if (cursor) return cursor;
  return this.ready();
});

// Meteor.publish('docsByService', function publishTasks(serviceType) {
//   let convertedService = '';
//   for (let i = 0; i < serviceType.length; i++) {
//     if (serviceType[i] != '.') convertedService += serviceType[i];
//   }

//   // db.users.findOne({"username" : {$regex : ".*son.*"}});

//   let cursor = Specialists.find({ oked : { $regex : new RegExp('^' + convertedService)}});
//   return cursor;
// });
