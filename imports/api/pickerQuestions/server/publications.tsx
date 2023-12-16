import { Meteor } from 'meteor/meteor';
import { PickerQuestions } from '../PickerQuestions';


Meteor.publish('pickerQuestions.all', function () {
  const cursor = PickerQuestions.find();
  return cursor;
});


