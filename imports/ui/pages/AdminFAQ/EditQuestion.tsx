import React from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuestion } from "../../../helpers/hooks/useQuestion";
import { Loading } from "../../components/Loading/Loading";
import { QuestionForm } from "./editContent";

export function Question() {
	const { id } = useParams();

	const { question, isQuestionLoading } = useQuestion(id);
	let history = useHistory();

	function handleSubmit(values) {
		values._id = question._id;

		Meteor.call("userQuestions.AdminUpdate", values, (error) => {
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
					text: "Question has been updated.",
				});
			}
		});
	}

	function handleDelete() {
		Meteor.call("userQuestions.remove", question._id, (error) => {
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
					text: "Question has been deleted.",
				});

				history.push("admin/faqs");
			}
		});
	}

	return !isQuestionLoading ? (
		<Container>
			<Row className="heading-ribbon">
				<Col md={8}>
					<Card border="primary">
						<Card.Title>
							<h2 className="heading">Edit Question</h2>
						</Card.Title>
						<Card.Body>
							<QuestionForm
								question={question}
								send={handleSubmit}
								handleClick={handleDelete}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	) : (
		<Loading />
	);
}
