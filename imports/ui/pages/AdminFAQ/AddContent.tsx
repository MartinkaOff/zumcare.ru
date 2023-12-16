import React from "react";

import { Button, Col, Form, Row } from "react-bootstrap";

import Swal from "sweetalert2";
import { ErrorMessage, Formik } from "formik";
import { FormikFormControlGroup } from "../../components/FormikFormControlGroup/FormikFormControlGroup";

import { questionSchema } from "./schema";

export function AddQuestion({ onHide }: { onHide(): void }) {
	function handleSubmit(values) {
		Meteor.call("userQuestions.AdminCreate", values, (error) => {
			if (error) {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: error.reason,
				});
			} else {
				Swal.fire({
					icon: "success",
					title: "Success!",
					text: "Question has been created.",
				});
			}
		});
	}

	const fields = [
		{
			name: "question",
			placeholder: "Question",
			type: "text",
		},
		{
			name: "answer",
			placeholder: "Answer",
			type: "textarea",
		},
	];

	return (
		<Formik
			initialValues={{
				question: "",
				answer: "",
				faq: false,
			}}
			validationSchema={questionSchema}
			onSubmit={handleSubmit}
		>
			{({ values, errors, touched, handleChange, handleSubmit }) => (
				<Form onSubmit={handleSubmit}>
					{fields.map((field) => (
						<FormikFormControlGroup
							key={field.name}
							name={field.name}
							placeholder={field.placeholder}
							type={field.type}
							value={values[field.name]}
							handleChange={handleChange}
							touched={touched[field.name]}
							errors={errors[field.name]}
							xl={12}
							lg={12}
							md={12}
							sm={12}
							xs={12}
						/>
					))}

					<Form.Group
						as={Col}
						controlId="faq"
						style={{ paddingBottom: "1rem" }}
					>
						<Form.Check
							type="switch"
							label="Is this question an FAQ?"
							checked={values.faq}
							onChange={handleChange}
						/>
						<span className="error-message">
							<ErrorMessage name="faq" />
						</span>
					</Form.Group>
					<Row>
						<Col>
							<Button type="submit">Save</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	);
}
