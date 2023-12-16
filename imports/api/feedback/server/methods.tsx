import { check, Match } from 'meteor/check';
import { FeedbackDB } from '../Feedback';
import { Feedback } from '../../../helpers/types/types';

Meteor.methods({
  'feedback.insert'(data: Feedback) {
    check(data, {
      after: Match.Optional(Number),
      before: Number,
      specialist: Match.Optional(Number),
      service: Match.Optional(Number),
      comment: Match.Optional(String),
      sessionID: String,
    });
    return FeedbackDB.insert(data);
  },
  'feedback.update'(data: Feedback) {
    check(data, {
      _id: String,
      after: Number,
      before: Match.Optional(Number),
      specialist: Number,
      service: Number,
      comment: String,
      sessionID: String,
    });

    const feedback = FeedbackDB.findOne({ _id: data._id });
    if (feedback) FeedbackDB.update(feedback._id, { $set: { ...data } });
  },
});