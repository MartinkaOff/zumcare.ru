import { Meteor } from 'meteor/meteor';
import { FAQs } from '../FAQ';

Meteor.publish('userQuestions.all', function () {
  return FAQs.find();
});

Meteor.publish('userQuestions.faq', function () {
  return FAQs.find({ faq: true });
});

Meteor.publish('userQuestions.id', function (questionID) {
  const question = FAQs.find(questionID);
  return question;
});

Meteor.publish('userQuestions.getByQuestionId', function (questionID: string) {
  const cursor = FAQs.find({ _id: questionID });
  if (cursor) return cursor;
  return this.ready();
});
