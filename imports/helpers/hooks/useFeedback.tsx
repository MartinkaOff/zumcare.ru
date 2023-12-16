import { useTracker } from 'meteor/react-meteor-data';
import { FeedbackDB } from '../../api/feedback/Feedback';
import { Feedback } from '../types/types';

export function useFeedback(_id?: string) {
  const { feedback, isFeadbackLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('feedback.sessionID', _id);
    const feedback = FeedbackDB.findOne({ sessionID: _id }) as Feedback;
    return { feedback, isFeadbackLoading: !subscription.ready() };
  }, [_id]);

  return { feedback, isFeadbackLoading };
}

export function useFeedbacks() {
  const { feedbacks, isFeadbacksLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('feedback.all');
    const feedbacks = FeedbackDB.find().fetch() as Feedback[];
    return { feedbacks, isFeadbacksLoading: !subscription.ready() };
  });

  return { feedbacks, isFeadbacksLoading };
}
