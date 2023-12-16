import { Meteor } from 'meteor/meteor';
import { FeedbackDB } from '../Feedback';

Meteor.publish('feedback.all', function () {
  return FeedbackDB.find();
});

Meteor.publish('feedback.sessionID', function (sessionID: string) {
  return FeedbackDB.find({ sessionID: sessionID });
});

Meteor.publish('feedback.id', function (feedbackID) {
  const feedback = FeedbackDB.find(feedbackID);
  return feedback;
});
