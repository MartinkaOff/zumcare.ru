import { useTracker } from "meteor/react-meteor-data";
import { FAQs } from "../../api/faq/FAQ";
import { Question } from "../types";

export function useFAQs() {
	const { faquestions, isQuestionsLoading } = useTracker(() => {
		const subscription = Meteor.subscribe("userQuestions.faq");
		const faquestions = FAQs.find().fetch() as Question[];
		return { faquestions, isQuestionsLoading: !subscription.ready() };
	});

	return { faquestions, isQuestionsLoading };
}
