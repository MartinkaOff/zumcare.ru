import React, { useState, useEffect } from 'react'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg
} from '@fullcalendar/core'
import { Button, OverlayTrigger, Row, Form, Col } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';
import ruLocale from '@fullcalendar/core/locales/ru';
import kkLocale from '@fullcalendar/core/locales/kk';
import { useMultipleSchedules } from '../../../helpers/hooks/useMultipleSchedules';
import { EventInput } from '@fullcalendar/core'
import { set, unescape, uniqBy } from 'lodash';
import { nanoid } from 'nanoid';
import { Tooltip } from 'react-bootstrap';
import { tooltipsObject } from '../../../helpers/services/tooltipsObject';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { PopupModal } from '../PopupModal/PopupModal';
import { ErrorMessage, Formik } from 'formik';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru'
import { ModWorkDays } from './ModWorkDays';
import { convertDateToString } from '../../../helpers/services/convertDateToString';
import './FullCalendarComponent.css'
import { convertMinAndMaxTime } from '../../../helpers/services/convertMinAndMaxTime';

export function FullCalendarComponent({ timeWorkData, handleClickState }) {

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const { specialist } = useSpecialist();
  const userSpecialistId = Meteor.user()?._id;

  const { t, i18n } = useTranslation();

  const { schedules } = useMultipleSchedules();
  const currentSpecSchedule = schedules.filter(item => item.specialistUserId === userSpecialistId)
  const currentSpecBooked = schedules.filter(item => item.specialistUserId === userSpecialistId && item.booked);
  const bookedDays = currentSpecBooked.map(item => item.booked)
  const minTime = timeWorkData[0]?.minTime;
  const maxTime = timeWorkData[0]?.maxTime;
  const step = timeWorkData[0]?.step;
  const workDaysDates = currentSpecSchedule[0]?.workDays.map(item => item)
  const uniqWorkDaysDates = uniqBy(workDaysDates, 'title')
  const [deleteMod, setDeleteMod] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalSettings, setShowModalSettings] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModalSettings = () => {
    setShowModalSettings(false);
  };

  const openModalSettings = () => {
    setShowModalSettings(true);
  };
  // Переключение на deleteMod
  const handleDeleteModeToggle = () => {
    setDeleteMod(!deleteMod)
  }
  // Переключение на показ выходных
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  }
  // Событие при котором события сохраняются в currentEvents
  const handleEvents = (events: EventApi[]) => {

    //@ts-ignore
    setCurrentEvents(events)
  }

  //Получение html элементов по дата атрибутам - для смены цвета бэкграунда

  const dataDateElements = document.querySelectorAll('[data-date]')
  dataDateElements.forEach(item => {
    if (uniqWorkDaysDates !== undefined) {
      uniqWorkDaysDates.forEach(work => {
        //@ts-ignore
        if (item.dataset.date === work.title) {
          if (work.class === 'fc-active') {
            item.classList.add('fc-active')
          } else {
            item.classList.add('fc-mod')
          }
        }
      })
    }
  })

  //Получние определенного дня с бэкграундом

  //@ts-ignore
  const currentDay = currentEvents.filter(item => item.backgroundColor)
  let eventGuid = 0
  function createEventId() {
    return String(eventGuid++)
  }

  const initialEvents: EventInput[] = [];

  // Перебор занятых дат для отображения их в календаре специалиста

  bookedDays?.forEach(item => {
    const event: EventInput = {
      id: createEventId(),
      //@ts-ignore
      title: item.startStr,
      //@ts-ignore
      start: item.startStr,
      //@ts-ignore
      end: item.endStr,
      display: 'block',
      overlap: false,
      editable: false,
      backgroundColor: 'green',
      borderColor: 'green'
    }
    initialEvents.push(event)
  })

  const [selectInfoState, setSelectInfoState] = useState('');

  //События при клике на дату
  const handleDateSelect = async (selectInfo: DateSelectArg) => {

    await setSelectInfoState(selectInfo)
    let selectTest;
    selectTest = selectInfo

    if (convertMinAndMaxTime(selectTest.start) === '0:00:00') {
      openModal();

      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (!deleteMod && selectInfo.allDay) {
        calendarApi.addEvent({
          id: createEventId(),
          title: selectInfo.startStr,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          editable: false,
          backgroundColor: 'green',
          display: 'block',
          borderColor: 'white'
        })

        // dataDateElements.forEach(item => {
        //   //@ts-ignore
        //   if (item.dataset.date === selectInfoStartStr) {
        //     item.classList.add('fc-active')
        //   }
        // })
      }
    } else {
      return
    }
  }

  const removeWorkDay = () => {
    const selectInfoStartStr = selectInfoState.startStr;
    const dataDateElements = document.querySelectorAll('[data-date]')
    //@ts-ignore
    const removeWorkDays = uniqWorkDaysDates.filter(item => item.title === selectInfoStartStr)
    //@ts-ignore
    const removeCurrentDays = currentEvents.filter(item => item.startStr !== selectInfoStartStr);
    // setCurrentEvents(removeCurrentDays)
    dataDateElements.forEach(item => {
      //@ts-ignore
      if (item.dataset.date === selectInfoStartStr) {
        item.classList.remove('fc-active')
        item.classList.remove('fc-mod')
      }
    })
    Meteor.call(
      'schedule.removeWorkDay',
      removeWorkDays[0],
      Swal.fire({
        title: 'Success!',
        text: 'День удален из вашего расписания',
        icon: 'success',
        preConfirm: () => {
          closeModal();
        },
      }),
    )
  }


  //События при клике на ивент

  const handleEventClick = (clickInfo: EventClickArg) => {
    //@ts-ignore
    const currentEvent = currentEvents.filter(item => item.startStr === clickInfo.event.startStr)
    //@ts-ignore
    const sessionsClientBooked = bookedDays.filter(item => item.startStr === clickInfo.event.startStr)

    if (sessionsClientBooked.length === 0) {
      if (confirm(`Вы уверены что хотите удалить'${clickInfo.event.startStr}'`)) {
        clickInfo.event.remove()
        currentEvent.shift()
      }

      dataDateElements.forEach(item => {
        //@ts-ignore
        if (clickInfo.event.startStr === item.dataset.date) {
          item.classList.remove('fc-active')
        }
      })
    }
  }

  //Рендеры интерфейса

  function renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          {/* <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.showWeekend}</Tooltip>}> 
          <label>
              <input
                type='checkbox'
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              ></input>
                Показывать выходные дни
          </label>
        </OverlayTrigger> */}

          {/* <OverlayTrigger placement='right' overlay={<Tooltip id="tooltip">{tooltipsObject.delete}</Tooltip>}>
            <label style={{ 'marginLeft': '3em' }}>
              <input
                type='checkbox'
                checked={deleteMod}
                onChange={handleDeleteModeToggle}
              ></input>
              {t('remove')}
            </label>
          </OverlayTrigger> */}

        </div>
      </div>
    )
  }

  function renderEventContent(eventContent: EventContentArg) {
    const eventContentHour = eventContent.event.start?.getHours();
    const eventContentMinutes = eventContent.event.start?.getMinutes();
    return (
      <>
        <b>{eventContent.event.allDay ? undefined :
          //@ts-ignore
          `${eventContentHour}:${eventContentMinutes < 10 ? '00' :
            eventContentMinutes}`}</b>
        {/* <b>{`${eventContent.event.title}-${eventContent.event.title}`}</b> */}
      </>
    )
  }

  //Событие подтверждения. Сохранение измений внесенные в календарь

  function onSubmitChanges() {
    if (!deleteMod) {
      const specialistUserId = specialist.userId;
      const specialistName = specialist.name;
      const workDaysArray: object[] = uniqWorkDaysDates;

      currentDay.forEach(item => {
        const obj = {
          id: nanoid(),
          //@ts-ignore
          title: item.startStr,
          //@ts-ignore
          start: item.start,
          //@ts-ignore
          end: item.endStr,
          class: 'fc-active'
        }
        workDaysArray.push(obj)
      })

      const uniqWorkDaysArray = uniqBy(workDaysArray, 'title');

      const data = {
        specialist: specialist.name,
        specialistUserId: specialistUserId,
        workDays: uniqWorkDaysArray
      }
      Meteor.call(
        'schedule.insert',
        data,
        specialistName,
        specialistUserId,
        Swal.fire({
          title: 'Success!',
          text: 'Ваше расписание успешно изменено',
          icon: 'success',
        })
      )
    }
  }

  handleClickState(onSubmitChanges);

  const [testStep, setTestStep] = useState(timeWorkData[0]?.step);
  const [workRange, setWorkRange] = useState('')

  const [minTimeSelect, setMinTimeSelect]: Date = useState();
  //@ts-ignore
  const [maxTimeSelect, setMaxTimeSelect]: Date = useState();

  function viewInputValue(timeWork) {
    if (timeWork !== undefined) {
      return `${timeWork.getHours()}:${timeWork.getMinutes() < 10 ? '00' : timeWork.getMinutes()}`
    }
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

  const defaultMaxTime = new Date('Wed May 31 2023 23:00:00 GMT+0600 (Восточный Казахстан)')

  const [dateInfo, setDateInfo] = useState('')

  function customWorkDay() {
    if (!deleteMod) {
      const specialistUserId = specialist.userId;
      const workDaysArray: object[] = uniqWorkDaysDates;

      currentDay.forEach(item => {
        const obj = {
          id: nanoid(),
          //@ts-ignore
          title: item.startStr,
          //@ts-ignore
          start: item.start,
          //@ts-ignore
          end: item.endStr,
          minTime: minTimeSelect,
          maxTime: maxTimeSelect,
          step: testStep,
          class: 'fc-mod'
        }
        workDaysArray.push(obj)
      })

      const uniqWorkDaysArray = uniqBy(workDaysArray, 'title');

      const data = {
        specialist: specialist.name,
        specialistUserId: specialistUserId,
        workDays: uniqWorkDaysArray,
      }
      Meteor.call(
        'schedule.customWorkDay',
        data,
        specialistUserId,
        Swal.fire({
          title: 'Success!',
          text: 'Ваше расписание успешно изменено',
          icon: 'success',
          preConfirm: () => {
            closeModal();
          },
        }),
      )
    }
  }

  const optionsForModWorkDays = {
    workDaysDates: workDaysDates,
    dateInfo: dateInfo,
  }

  const [arrayDays, setArrayDays] = useState([]);

  const dayCellContent = (arg) => {

    if (arrayDays.length === 0) {
      setArrayDays((prevArrayDays) => [...prevArrayDays, arg.date]);
    }
    const options = { weekday: 'short' };

    const shortDayOfWeek = new Intl.DateTimeFormat('en-US', options).format(arg.date);

    return <div className="inactive-day">{arg.dayNumberText}</div>;
  };

  const WorkRangeCheckbox = ({ value, label, onChange, isChecked }) => (
    <div>
      <input
        type="checkbox"
        id={`workRange-${value}`}
        value={value}
        onChange={onChange}
        checked={isChecked}
      />
      <label htmlFor={`workRange-${value}`}>{label}</label>
    </div>
  );

  const [selectedWorkRanges, setSelectedWorkRanges] = useState([]);
  const filterWorkToRange = arrayDays.filter((item) => {
    const options = { weekday: 'short' };
    //@ts-ignore
    const dayShortName = new Intl.DateTimeFormat('en-US', options).format(item)
    //@ts-ignore
    return selectedWorkRanges.includes(dayShortName);
  });


  const handleCheckboxChange = (value) => {
    if (selectedWorkRanges.includes(value)) {
      setSelectedWorkRanges(selectedWorkRanges.filter((item) => item !== value));
    } else {
      setSelectedWorkRanges([...selectedWorkRanges, value]);
    }
  };


  const workRanges = [
    { value: 'Mon', label: 'Понедельник' },
    { value: 'Tue', label: 'Вторник' },
    { value: 'Wed', label: 'Среда' },
    { value: 'Thu', label: 'Четверг' },
    { value: 'Fri', label: 'Пятница' },
    { value: 'Sat', label: 'Суббота' },
    { value: 'Sun', label: 'Воскресенье' },
  ];

  function submitActiveWorkDays() {
    if (!deleteMod) {
      const specialistUserId = specialist.userId;
      const specialistName = specialist.name;
      const workDaysArray: object[] = uniqWorkDaysDates;

      filterWorkToRange.forEach(item => {
        const obj = {
          id: nanoid(),
          //@ts-ignore
          title: convertDateToString(item),
          //@ts-ignore
          start: item,
          //@ts-ignore
          end: convertDateToString(item),
          minTime: minTimeSelect,
          maxTime: maxTimeSelect,
          step: testStep,
          class: 'fc-active'
        }
        workDaysArray.push(obj)
      })

      const uniqWorkDaysArray = uniqBy(workDaysArray, 'title');

      const data = {
        specialist: specialist.name,
        specialistUserId: specialistUserId,
        workDays: uniqWorkDaysArray
      }
      Meteor.call(
        'schedule.insert',
        data,
        specialistName,
        specialistUserId,
        Swal.fire({
          title: 'Success!',
          text: 'Ваше расписание успешно изменено',
          icon: 'success',
        })
      )
    }
  }

  function resetDays() {
    const specialistUserId = specialist.userId;
    Meteor.call(
      'schedule.resetDays',
      specialistUserId,
      Swal.fire({
        title: 'Success!',
        text: 'Ваше расписание сброшено',
        icon: 'success',
      })
    )
  }

  function hideAcceptBtn(func) {
    if (testStep !== undefined && minTimeSelect !== undefined && maxTimeSelect !== undefined) {
      return (
        <Button
          style={{
            margin: '3em auto',
            width: '15em'
          }}
          variant='primary'
          type='submit'
          // onClick={() => setTimeWork(handleClickState)}
          // onClick={() => (setClickState(true), setTimeWork())}
          onClick={func}
        >
          {t('accept')}
        </Button>
      )
    } else {
      return
    }
  }

  function hideDeleteBtn() {
    return (
      <Button
        style={{
          margin: '3em auto',
          width: '15em'
        }}
        variant='primary'
        type='submit'
        // onClick={() => setTimeWork(handleClickState)}
        // onClick={() => (setClickState(true), setTimeWork())}
        onClick={removeWorkDay}
      >
        Удалить
      </Button>
    )
  }

  return (
    <div className='demo-app'>
      {renderSidebar()}
      <Button style={{ display: 'block', margin: '0 auto' }} onClick={() => openModalSettings()}>Настроить расписание</Button>
      <PopupModal
        show={showModal}
        onHide={closeModal}
        content={
          <Col lg='28' md='12' sm='12'>
            <Formik
              onSubmit={hideAcceptBtn}
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
                          defaultValue={''}
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
                            selected={minTimeSelect}
                            onChange={(date) => setMinTimeSelect(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={testStep}
                            timeCaption="Time"
                            dateFormat="p"
                            customInput={
                              <Form>
                                <Form.Control
                                  defaultValue={viewInputValue(timeWorkData[0]?.minTime)}
                                  value={viewInputValue(minTimeSelect)}
                                  style={{ cursor: 'pointer', width: '100%' }} />
                              </Form>} />
                          <DatePicker
                            locale={ru}
                            selected={maxTimeSelect}
                            onChange={(date) => setMaxTimeSelect(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={testStep}
                            timeCaption="Time"
                            dateFormat="p"
                            minTime={validScheduleTime(minTimeSelect)}
                            maxTime={defaultMaxTime}
                            customInput={
                              <Form>
                                <Form.Control
                                  defaultValue={viewInputValue(timeWorkData[0]?.maxTime)}
                                  value={viewInputValue(maxTimeSelect)}
                                  style={{ cursor: 'pointer', width: '100%' }} />
                              </Form>} />
                        </div>
                      </Form.Group>
                    </OverlayTrigger>
                  </Row>
                  <OverlayTrigger placement='top' overlay={<Tooltip>{tooltipsObject.acceptSettings}</Tooltip>}>
                    {() => hideAcceptBtn(() => customWorkDay())}
                  </OverlayTrigger>
                  {hideDeleteBtn()}
                </Form>
              )}
            </Formik>
          </Col>
        }
        title={selectInfoState.startStr}
        closeButton={true}
      />
      <PopupModal
        show={showModalSettings}
        onHide={closeModalSettings}
        content={
          <Col lg='28' md='12' sm='12'>
            <Formik
              // onSubmit={}
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
                          defaultValue={''}
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
                    <Form.Group
                      as={Col}
                      lg='3'
                      md='6'
                      sm='12'
                      controlId='workRange'
                    >
                      <Form.Label>График работы</Form.Label>
                      {/* <Form.Select
                        name='workRange'
                        defaultValue={''}
                        aria-label='CheckBox'
                      // onChange={(e) => setWorkRange(e.target.value)}
                      // isValid={touched.step && !errors.step}
                      // isInvalid={!!errors.step}
                      >
                      </Form.Select> */}
                      {workRanges.map((range) => (
                        WorkRangeCheckbox({
                          key: range.value,
                          value: range.value,
                          label: range.label,
                          onChange: () => handleCheckboxChange(range.value),
                          isChecked: selectedWorkRanges.includes(range.value),
                        })
                      ))}
                      <span className='error-message'>
                        <ErrorMessage name='workRange' />
                      </span>
                    </Form.Group>
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
                            selected={minTimeSelect}
                            onChange={(date) => setMinTimeSelect(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={testStep}
                            timeCaption="Time"
                            dateFormat="p"
                            customInput={
                              <Form>
                                <Form.Control
                                  defaultValue={viewInputValue(timeWorkData[0]?.minTime)}
                                  value={viewInputValue(minTimeSelect)}
                                  style={{ cursor: 'pointer', width: '100%' }} />
                              </Form>} />
                          <DatePicker
                            locale={ru}
                            selected={maxTimeSelect}
                            onChange={(date) => setMaxTimeSelect(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={testStep}
                            timeCaption="Time"
                            dateFormat="p"
                            minTime={validScheduleTime(minTimeSelect)}
                            maxTime={defaultMaxTime}
                            customInput={
                              <Form>
                                <Form.Control
                                  defaultValue={viewInputValue(timeWorkData[0]?.maxTime)}
                                  value={viewInputValue(maxTimeSelect)}
                                  style={{ cursor: 'pointer', width: '100%' }} />
                              </Form>} />
                        </div>
                      </Form.Group>
                    </OverlayTrigger>
                  </Row>
                  <OverlayTrigger placement='top' overlay={<Tooltip>{tooltipsObject.acceptSettings}</Tooltip>}>
                    {() => hideAcceptBtn(() => submitActiveWorkDays())}
                  </OverlayTrigger>
                  <Button style={{ width: '15em', margin: '3em auto' }} onClick={() => resetDays()}>Сброс</Button>
                </Form>
              )}
            </Formik>
          </Col>
        }
        title={'Настройка расписания'}
        closeButton={true}
      />
      <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.guideCalendar}</Tooltip>}>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            height={800}
            handleWindowResize={true}
            editable={true}
            longPressDelay={1}
            //@ts-ignore
            selectable={handleDateSelect}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={initialEvents} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventTimeFormat={{ hour12: false }}
            locale={i18n.language === 'ru' ? ruLocale : i18n.language === 'kz' ? kkLocale : undefined}
            showNonCurrentDates={false}
            navLinks={true}
            // events={initialEvents}
            slotMinTime={ModWorkDays(optionsForModWorkDays, 'minTime')}
            slotMaxTime={ModWorkDays(optionsForModWorkDays, 'maxTime')}
            slotDuration={ModWorkDays(optionsForModWorkDays, 'step')}
            slotLabelInterval={ModWorkDays(optionsForModWorkDays, 'step')}
            slotLabelFormat={{
              hour: 'numeric',
              minute: '2-digit'
            }}
            eventsSet={handleEvents}
            validRange={{ start: new Date() }}
            datesSet={(info) => {
              //@ts-ignore
              if (dateInfo.startStr !== info.startStr) {
                //@ts-ignore
                setDateInfo(info);
              }
            }}
            dayCellContent={dayCellContent}
          />
        </div>
      </OverlayTrigger>

      {/* <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.acceptSettings}</Tooltip>}>
        <Button style={{ display: 'block', width: '15em', margin: '2em auto' }} onClick={!deleteMod ? onSubmitChanges : undefined}>{t('accept')}</Button>
      </OverlayTrigger> */}
    </div>
  )

}




