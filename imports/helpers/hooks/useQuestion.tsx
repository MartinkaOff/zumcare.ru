import { useTracker } from 'meteor/react-meteor-data';
import { FAQs } from '../../api/faq/FAQ';
import { Question } from '../types';

export function useQuestion(_id?: string) {
  const { question, isQuestionLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('userQuestions.getByQuestionId', _id);
    const question = FAQs.findOne({ _id: _id }) as Question;
    return { question, isQuestionLoading: !subscription.ready() };
  }, [_id]);

  return { question, isQuestionLoading };
}
