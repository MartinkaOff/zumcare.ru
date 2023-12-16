import {Meteor} from 'meteor/meteor';
import {PageElements} from '../PageElements';

Meteor.publish('pageElements.all', function () {
  return PageElements.find();
});
