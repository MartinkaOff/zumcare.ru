import React, { useState } from 'react';
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';
import { Container, Row, Col, Card, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useMultipleSchedules } from '../../../helpers/hooks/useMultipleSchedules';
import { useSchedule } from '../../../helpers/hooks/useSchedule';
import { DayPicker, DayClickEventHandler } from 'react-day-picker';
import isSameDay from 'date-fns/isSameDay';
import ru from 'date-fns/locale/ru'
import en from 'date-fns/locale/en-US';
import { registerLocale } from "react-datepicker";
import { Formik, ErrorMessage } from 'formik';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { PopupModal } from '../../components/PopupModal/PopupModal';
import { FullCalendarComponent } from '../../components/FullCalendar/FullCalendarComponent';
import { tooltipsObject } from '../../../helpers/services/tooltipsObject';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import "react-datepicker/dist/react-datepicker.css";
import { Loading } from '../../components/Loading/Loading';

export function Schedule({ onHide }) {

  const { t } = useTranslation();

  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const { specialist } = useSpecialist();
  const { schedules } = useMultipleSchedules();
  // const currentSpecSchedule = schedules.filter(item => item.specialistUserId === userSpecialistId)
  const { isScheduleLoading } = useSchedule()

  const userSpecialistId = Meteor.user()?._id;


  const disabledDaysData = schedules.filter(item => item.specialistUserId === userSpecialistId && item.disable);
  const bookedDaysData = schedules.filter(item => item.specialistUserId === userSpecialistId && item.booked);
  const timeWorkData = schedules.filter(item => item.specialistUserId === userSpecialistId)

  const [testStep, setTestStep] = useState(timeWorkData[0]?.step);

  registerLocale('ru', ru)

  console.log(schedules)

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    const newSelectedDays = [...selectedDays];
    if (modifiers.selected) {
      const index = selectedDays.findIndex((selectedDay) =>
        isSameDay(day, selectedDay)
      );
      newSelectedDays.splice(index, 1);
    } else {
      newSelectedDays.push(day);
    }
    setSelectedDays(newSelectedDays);
  };


  const handleResetClick = () => setSelectedDays([]);


  const acceptDayPicker = () => {
    const specialistUserId = specialist.userId;
    const specialistName = specialist.name;
    const disable = selectedDays;
    const data = {
      specialist: specialist.name,
      specialistUserId: specialistUserId,
      disable: [...selectedDays]
    }
    Meteor.call(
      'schedule.insert',
      data,
      specialistName,
      specialistUserId,
      disable
    )
    setSelectedDays([]);
  }

  let footer = <Button id='schedule-btn'
    variant='primary'
    onClick={() => handleDisableDays()}
    className='btn-change-schedule'>
    {t('scheduleSpecialist.changeScheduleTypes')}
  </Button>

  if (selectedDays.length > 0)
    footer = (
      <div>
        <p>
          You selected {selectedDays.length} days.{' '}
        </p>
        <Button variant='primary' style={{ marginRight: '1em' }} onClick={handleResetClick}>Reset</Button>
        <Button variant='primary' onClick={acceptDayPicker}>Accept</Button>
      </div>
    );

  function concatBookedDaysFunction() {
    const allArray = bookedDaysData.map((item) => item.booked).join()
    const stringToArray = allArray.split(',');
    const newDateArray = stringToArray.map(item => new Date(item))

    return newDateArray
  }

  const disabledDays = disabledDaysData[0]?.disable;
  const [allDisabledDays, setAllDisabledDays] = useState({});
  if (disabledDays !== undefined && Object.keys(allDisabledDays).length === 0) {
    //@ts-ignore
    const allArray = disabledDays.concat(concatBookedDaysFunction())
    setAllDisabledDays(allArray)
  }

  const [styleDisableDays, setStyleDisableDays] = useState('black')

  const handleDisableDays = () => {
    let btn = document.querySelector('#schedule-btn');
    if (btn !== null && btn.classList.contains('btn-change-schedule')) {
      btn.classList.toggle('btn-change-schedule-active')
      setAllDisabledDays(disabledDays || styleDisableDays)
      btn.textContent = t('weekend');
      setStyleDisableDays('blue');
    }

    if (btn !== null && btn.classList.contains('btn-change-schedule-active')) {
      setAllDisabledDays(concatBookedDaysFunction() || styleDisableDays);
      btn.textContent = t('sessions');
      setStyleDisableDays('rgba(60, 179, 113, 1)');
    }
  }

  const setTimeStep = () => {
    const specialistUserId = specialist.userId;
    testStep === undefined || null ?
      Meteor.call(
        'schedule.timeSteps',
        timeWorkData[0]?.step,
        specialistUserId
      ) :
      Meteor.call(
        'schedule.timeSteps',
        testStep,
        specialistUserId
      );
  }
  //@ts-ignore
  const [minTime, setMinTime]: Date = useState();
  //@ts-ignore
  const [maxTime, setMaxTime]: Date = useState();

  const defaultMaxTime = new Date('Wed May 31 2023 23:00:00 GMT+0600 (Восточный Казахстан)')

  function viewInputValue(timeWork) {
    if (timeWork !== undefined) {
      return `${timeWork.getHours()}:${timeWork.getMinutes() < 10 ? '00' : timeWork.getMinutes()}`
    }
  }

  const [clickState, setClickState] = useState(false);

  function setTimeWork(func) {
    if (clickState === true) {
      const timeWork = {
        minTime: minTime,
        maxTime: maxTime
      }
      const specialistUserId = specialist?.userId;
      Meteor.call(
        'schedule.setTimeWork',
        timeWork,
        specialistUserId,

        Swal.fire({
          title: 'Success!',
          text: 'Данные изменены',
          icon: 'success',
        })
      );
      func();
    }
  }

  function handleClickState(func) {
    setTimeWork(func)
  }

  function validScheduleTime(timeWork) {
    if (timeWork === undefined) {

      if (timeWorkData[0]?.minTime !== undefined) {
        return timeWorkData[0]?.minTime
      } else {
        return new Date('Wed May 31 2023 00:00:00 GMT+0600 (Восточный Казахстан)')
      }
    } else {
      return timeWork
    }
  }

  function hideAcceptBtn() {
    if (timeWorkData !== undefined && maxTime !== undefined && minTime !== undefined || timeWorkData.length > 0) {
      return (
        <Button
          style={{
            margin: '3em auto',
            width: '15em'
          }}
          variant='primary'
          type='submit'
          // onClick={() => setTimeWork(handleClickState)}
          onClick={() => (setClickState(true), handleClickState())}
        >
          {t('accept')}
        </Button>
      )
    } else {
      return
    }
  }

  // console.log(timeWorkData)

  return !isScheduleLoading ? (
    <Container>
      <Row style={{ padding: '2rem', justifyContent: 'center' }}>
        <Col>
          <Card style={{ borderRadius: '15px', paddingTop: '1em' }}>
            <Card.Title style={{ textAlign: 'center' }}>{t('schedule')}</Card.Title>
            <Card.Body>
              <Row>
                <FullCalendarComponent timeWorkData={timeWorkData} handleClickState={handleClickState} />
                <Col lg='28' md='12' sm='12'>
                  <Formik
                    onSubmit={setTimeStep}
                    initialValues={{
                      step: testStep
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      errors,
                    }) => (
                      <Form style={{
                        width: '80%', margin: '1em auto',
                        display: /* `${timeWorkData.length > 0 ? 'flex' : 'none'}` */'flex',
                        flexWrap: 'wrap'
                      }}
                        noValidate onSubmit={handleSubmit}>
                        <Row style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                          <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.step}</Tooltip>}>
                            <Form.Group
                              as={Col}
                              lg='3'
                              md='6'
                              sm='12'
                              controlId='step'
                            >
                              <Form.Label>{t('step')}</Form.Label>
                              <Form.Select
                                name='step'
                                defaultValue={timeWorkData[0]?.step}
                                aria-label='Select'
                                onChange={(e) => setTestStep(e.target.value)}
                                isValid={touched.step && !errors.step}
                                isInvalid={!!errors.step}
                              >
                                <option>{t('timeSteps.notChosen')}</option>
                                <option value='15'>{t('timeSteps.15min')}</option>
                                <option value='30'>{t('timeSteps.30min')}</option>
                                <option value='60'>{t('timeSteps.60min')}</option>
                                <option value='75'>{t('timeSteps.75min')}</option>
                                <option value='90'>{t('timeSteps.90min')}</option>
                              </Form.Select>
                              <span className='error-message'>
                                <ErrorMessage name='step' />
                              </span>
                            </Form.Group>
                          </OverlayTrigger>
                          <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.workTime}</Tooltip>}>
                            <Form.Group
                              as={Col}
                              lg='3'
                              md='6'
                              sm='12'
                              controlId='step'
                            >
                              <Form.Label>{t('scheduleSpecialist.schedule')}</Form.Label>
                              <div>
                                <DatePicker
                                  locale={ru}
                                  selected={minTime}
                                  onChange={(date) => setMinTime(date)}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={testStep}
                                  timeCaption="Time"
                                  dateFormat="p"
                                  customInput={
                                    <Form>
                                      <Form.Control
                                        defaultValue={viewInputValue(timeWorkData[0]?.minTime)}
                                        value={viewInputValue(minTime)}
                                        style={{ cursor: 'pointer', width: '100%' }} />
                                    </Form>} />
                                <DatePicker
                                  locale={ru}
                                  selected={maxTime}
                                  onChange={(date) => setMaxTime(date)}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={testStep}
                                  timeCaption="Time"
                                  dateFormat="p"
                                  minTime={validScheduleTime(minTime)}
                                  maxTime={defaultMaxTime}
                                  customInput={
                                    <Form>
                                      <Form.Control
                                        defaultValue={viewInputValue(timeWorkData[0]?.maxTime)}
                                        value={viewInputValue(maxTime)}
                                        style={{ cursor: 'pointer', width: '100%' }} />
                                    </Form>} />
                              </div>
                            </Form.Group>
                          </OverlayTrigger>
                        </Row>
                        <OverlayTrigger placement='top' overlay={<Tooltip>{tooltipsObject.acceptSettings}</Tooltip>}>
                          {() => hideAcceptBtn()}
                        </OverlayTrigger>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (<Loading />);
}