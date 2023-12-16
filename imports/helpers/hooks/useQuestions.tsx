import { useTracker } from "meteor/react-meteor-data";
import { FAQs } from "../../api/faq/FAQ";
import { Question } from "../types";

export function useQuestions() {
	const { questions, isQuestionsLoading } = useTracker(() => {
		const subscription = Meteor.subscribe("userQuestions.all");
		const questions = FAQs.find().fetch() as Question[];
		return { questions, isQuestionsLoading: !subscription.ready() };
	});

	return { questions, isQuestionsLoading };
}
