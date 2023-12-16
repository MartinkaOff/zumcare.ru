import React, { useState } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import { useQuestions } from '../../../helpers/hooks/useQuestions';
import { Loading } from '../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import PaginationComponent from '../../components/Pagination/Pagination';
import { AddQuestion } from './AddContent';
import { PopupModal } from '../../components/PopupModal/PopupModal';

export function AdmimFAQ() {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const { questions, isQuestionsLoading } = useQuestions();

  console.log(questions);
  const handleClick = (_id: string) => {
    history.push(`/question/${_id}`);
  };

  const [currentPage, setCurrentPage] = useState(1); // current page number
  const itemsPerPage = 10; // number of items to show per page

  // calculate the total number of pages
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  // slice the array of items based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = questions.slice(startIndex, endIndex);

  // handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return !isQuestionsLoading ? (
    <Container>
      <PopupModal
        show={show}
        onHide={() => setShow(false)}
        content={<AddQuestion onHide={() => setShow(false)} />}
        title='Add Question'
        closeButton={true}
      />
      <Card style={{ padding: '1rem' }}>
        <Card.Body>
          <Row className='heading-ribbon'>
            <Col>
              <h2>Вопросы</h2>
            </Col>
            <Col>
              <Button
                variant='primary'
                size='lg'
                style={{ float: 'right' }}
                onClick={() => setShow(true)}
              >
                + New
              </Button>
            </Col>
          </Row>
          <Row>
            <ListGroup>
              {currentItems.map((question, index) => (
                <ListGroup.Item
                  key={index}
                  eventKey={index as any}
                  onClick={() => handleClick(question._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {question.question}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>

          <Row style={{ marginTop: '1rem' }}>
            <Col>
              <PaginationComponent
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                data={questions}
                onPageChange={handlePageChange}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <Loading />
  );
}
