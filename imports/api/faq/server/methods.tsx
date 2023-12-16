import { check, Match } from "meteor/check";
import { FAQs } from "../FAQ";
import { Question } from "../../../helpers/types";

Meteor.methods({
	"userQuestions.insert"(data: Question) {
		check(data, {
			question: String,
			name: String,
			email: String,
			answer: Match.Optional(String),
			faq: Match.Optional(Boolean),
		});

		if (typeof data.faq === "undefined") {
			data.faq = false;
		}

		FAQs.insert(data);
	},

	"userQuestions.remove"(questionID: string): void {
		check(questionID, String);

		const question = FAQs.findOne({ _id: questionID });
		FAQs.remove(question?._id);
	},

	"userQuestions.AdminUpdate"(userData: Question) {
		check(userData, {
			_id: String,
			question: String,
			answer: String,
			name: Match.Optional(String),
			email: Match.Optional(String),
			faq: Boolean,
		});

		const question = FAQs.findOne({ _id: userData._id });
		if (question) FAQs.update(question._id, { $set: { ...userData } });
	},

	"userQuestions.AdminCreate"(data: Question) {
		check(data, {
			question: String,
			name: Match.Optional(String),
			email: Match.Optional(String),
			answer: String,
			faq: Boolean,
		});

		FAQs.insert(data);
	},
});
