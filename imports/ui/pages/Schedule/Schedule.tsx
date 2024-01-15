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
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (<Loading />);
}