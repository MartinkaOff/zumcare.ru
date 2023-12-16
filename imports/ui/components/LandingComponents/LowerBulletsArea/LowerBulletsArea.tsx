import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Loading} from '../../Loading/Loading';
import {usePageElements} from '../../../../helpers/hooks/usePageElements';
import './LowerBulletsAreaStyle.css';

export function LowerBulletsArea() {
  const {pageElements, isPageElementsLoading} = usePageElements();

  return !isPageElementsLoading ? (
    <Container className='lower-bullets-container'>
      <Row xs={1} sm={2} md={3} lg={4} xl={5}>
        {pageElements.map((el) => (
          <Col key={el._id} className='lower-bullet'>
            <img
              className='lower-bullets-image'
              src={`lower-bullets/${el.order}.svg`}
            />
            <span>{el.text}</span>
          </Col>
        ))}
      </Row>
    </Container>
  ) : (
    <Loading />
  );
}
