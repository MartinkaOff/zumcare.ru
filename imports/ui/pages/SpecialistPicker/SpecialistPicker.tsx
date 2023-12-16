import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Row, Card, Col, Form, Button } from 'react-bootstrap';
import { Specializations } from '../../../api/specializations/Specializations';
import { PickerQuestion, Specialization } from '../../../helpers/types';
import { PickerQuestions } from '../../../api/pickerQuestions/PickerQuestions';
import { EditPickerQuestions } from '../../components/PickerQuestions/EditPIckerQuestions';
import { CreatePickerQuestions } from '../../components/PickerQuestions/CreatePickerQuestions';

class SpecialistPicker extends React.Component<{
  isQuestionsLoading: boolean;
  questions: PickerQuestion[];
  isSpecializationsLoading: boolean;
  specializations: Specialization[];
}> {
  constructor(props: {
    isQuestionsLoading: boolean;
    questions: PickerQuestion[];
    isSpecializationsLoading: boolean;
    specializations: Specialization[];
  }) {
    super(props);
    this.state = {
      specializations: [],
    };

    this.submitData = this.submitData.bind(this);
    this.setData = this.setData.bind(this);
    this.setSpecialization = this.setSpecialization.bind(this);
  }

  setData(value: string, name: string): void {
    this.setState({
      [name]: value,
    });
  }

  setSpecialization(s: Specialization): void {
    const specialization = {
      value: s.specializationId,
      label: s.title,
    };

    // @ts-ignore
    const inState = this.state.specializations.find(
      (inState: { value: string; label: string }) =>
        inState.value === s.specializationId,
    );

    if (!inState) {
      this.setState((prevState) => ({
        // @ts-ignore
        specializations: [...prevState.specializations, specialization],
      }));
    } else {
      this.setState((prevState) => ({
        // @ts-ignore
        specializations: prevState.specializations.filter(
          (s: { value: string; label: string }) =>
            s.value !== specialization.value,
        ),
      }));
    }
  }

  submitData(): void {
    // @ts-ignore
    const { history } = this.props;

    // if (Object.values(this.state).length === 5) {
    history.push({
      pathname: 'picker_results',
      state: {
        clientData: this.state,
      },
    });
    // }
  }

  render() {
    const {
      isQuestionsLoading,
      questions,
      isSpecializationsLoading,
      specializations,
    } = this.props;
    const user = Meteor.user();
    // @ts-ignore
    const userType = user?.profile?.userType;

    return (
      <Container style={{ padding: '3rem 0 5rem 0' }}>
        <Card style={{ padding: '2rem' }}>
          <Row>
            <h3 style={{ textAlign: 'center', paddingBottom: '2rem' }}>
              Подбор специалиста
            </h3>
          </Row>
          {/* <EditPickerQuestions />
          <CreatePickerQuestions /> */}
          {/* {userType === "admin" ? <CreatePickerQuestions /> : null}
          {userType === "admin" ? <EditPickerQuestions /> : null} */}
          {!isQuestionsLoading &&
            questions.map((q) => (
              <Row style={{ justifyContent: 'center' }} key={q.name}>
                <Col md='6' key={q.name} style={{ padding: '1rem' }}>
                  <h5 style={{ paddingBottom: '1rem' }}>{q.content}</h5>
                  {q.type === 'radio' ? (
                    <div>
                      {q.options.map((index) => (
                        <div key={index} className='mb-3'>
                          <Form.Check
                            type='radio'
                            id={`${q.name}-${index}`}
                            label={index}
                            name={q.name}
                            onChange={(e) =>
                              this.setData(e.target.value, q.name)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Form.Control
                      type='text'
                      name={q.name}
                      placeholder={`Enter ${q.name}`}
                      onChange={(e) => this.setData(e.target.value, q.name)}
                    />
                  )}
                </Col>
              </Row>
            ))}
          <Row style={{ justifyContent: 'center' }}>
            {!isSpecializationsLoading && (
              <Col md='6' style={{ padding: '1rem' }}>
                <h5 style={{ paddingBottom: '1rem' }}>
                  Выберите специализации
                </h5>
                {specializations.map((s: Specialization) => (
                  <div key={s.specializationId} className='mb-3'>
                    <Form.Check
                      type='checkbox'
                      id={s.specializationId}
                      label={s.title}
                      onChange={() => this.setSpecialization(s)}
                      checked={
                        // @ts-ignore
                        this.state.specializations.find(
                          (inState: { value: string; label: string }) =>
                            inState.value === s.specializationId,
                        )
                      }
                    />
                  </div>
                ))}
              </Col>
            )}
          </Row>
          <Row>
            <div className='d-grid gap-2' style={{ paddingTop: '2rem' }}>
              <center>
                <Button
                  style={{ width: '50%', marginBottom: '1rem' }}
                  variant='primary'
                  type='submit'
                  size='lg'
                  onClick={this.submitData}
                >
                  Подтвердить
                </Button>
              </center>
            </div>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default withTracker(() => {
  const pickerQuestionsSub = Meteor.subscribe('pickerQuestions.all');
  const isQuestionsLoading = !pickerQuestionsSub.ready();
  const questions = PickerQuestions.find().fetch() as PickerQuestion[];

  const specializationsSub = Meteor.subscribe('specializations.all');
  const isSpecializationsLoading = !specializationsSub.ready();
  const specializations = Specializations.find().fetch() as Specialization[];

  return {
    isQuestionsLoading,
    questions,
    isSpecializationsLoading,
    specializations,
  };
})(SpecialistPicker);
