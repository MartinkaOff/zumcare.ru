import * as Yup from "yup";

export const questionSchema = Yup.object().shape({
	question: Yup.string().required("Question is required"),
	answer: Yup.string().when("faq", {
		is: true,
		then: Yup.string().required("Answer is required"),
		otherwise: Yup.string(),
	}),
	faq: Yup.boolean().default(false),
});
