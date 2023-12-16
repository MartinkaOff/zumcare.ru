import {check} from 'meteor/check';
import {PageElements} from '../PageElements';

Meteor.methods({
  'pageElements.insert'(data: object) {
    check(data, {
      userId: String,
      name: String,
      surname: String,
      photo: String,
    });

    const elementInDb = PageElements.findOne({userId: data.userId});
    if (elementInDb)
      PageElements.update({userId: elementInDb.userId}, {$set: data});
    else PageElements.insert(data);
  },
});
