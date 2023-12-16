import React from "react";
import { ErrorMessage, Formik } from "formik";
import { FormikFormControlGroup } from "../../components/FormikFormControlGroup/FormikFormControlGroup";
import { Button, Col, Form, Row } from "react-bootstrap";

import { questionSchema } from "./schema";

export function QuestionForm({ question, send, handleClick }) {
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
			initialValues={question}
			validationSchema={questionSchema}
			onSubmit={send}
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
						<Col style={{ textAlign: "right" }}>
							<Button variant="danger" onClick={handleClick}>
								Delete
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	);
}
