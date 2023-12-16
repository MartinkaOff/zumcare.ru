import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useFAQs } from '../../../helpers/hooks/useFAQ';
import { Loading } from '../../components/Loading/Loading';

export function Questions({}) {
  const { faquestions, isQuestionsLoading } = useFAQs();

  return !isQuestionsLoading ? (
    <Accordion defaultActiveKey='0'>
      {faquestions.map((faq, index) => (
        <Accordion.Item key={index} eventKey={index as any}>
          <Accordion.Header>{faq.question}</Accordion.Header>
          <Accordion.Body>{faq.answer}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  ) : (
    <Loading />
  );
}
