import React, {useState, useEffect, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import {useTracker} from 'meteor/react-meteor-data';
import {Specialists} from '../../../api/specialists/Specialists';
import {Specialist, Specialization} from '../../../helpers/types';
import {Container, Row} from 'react-bootstrap';
import {SpecialistCard} from '../../components/SpecialistCard/SpecialistCard';
import {PopupModal} from '../../components/PopupModal/PopupModal';
import {ConsultationEnrollContent} from '../../components/ConsultationEnrollContent/ConsultationEnrollContent';
import {InqueryContext} from '../../../helpers/store/context/inquery-context';

export function SpecialistPickerResults({setInqueryData}) {
  let location = useLocation();
  const [show, setShow] = useState(true);
  const enrolledCtx = useContext(InqueryContext);
  // @ts-ignore
  const clientData = location?.state?.clientData;

  useEffect(() => {
    if (enrolledCtx.enrolled) setShow(false);
  }, [enrolledCtx]);

  const {specialists} = useTracker(() => {
    // review for refactoring
    // refactor using smartpublish
    clientData.specializations.map((s: Specialization) => {
      Meteor.subscribe('specialists.picker', s);
    });
    const specialists = Specialists.find().fetch() as Specialist[];
    return {specialists};
  });

  const saveClientData = (data: object) => {
    Object.assign(clientData, data);
    Meteor.call('inqueries.insert', clientData, (err: object) => {
      if (err) console.log(err);
      setInqueryData(clientData);
      enrolledCtx.enroll();
      setShow(false);
    });
  };

  return (
    <Container style={{padding: '3rem 0 5rem 0'}}>
      <PopupModal
        show={show}
        content={
          <ConsultationEnrollContent
            onSubmit={(data) => saveClientData(data)}
          />
        }
        title='Enroll first'
        closeButton={false}
      />
      <Row style={{paddingBottom: '2rem'}}>
        <h4 style={{textAlign: 'center'}}>Specialist picker results</h4>
      </Row>
      <Row xl={5} lg={4} md={3} sm={3} xs={1}>
        {specialists?.length
          ? specialists.map((s) => <SpecialistCard {...s} key={s.userId} />)
          : 'No specialists for this specialization'}
      </Row>
    </Container>
  );
}
