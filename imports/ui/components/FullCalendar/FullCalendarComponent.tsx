import React, { useState } from 'react'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg
} from '@fullcalendar/core'
import { Button, OverlayTrigger } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';
import ruLocale from '@fullcalendar/core/locales/ru';
import kkLocale from '@fullcalendar/core/locales/kk';
import { useMultipleSchedules } from '../../../helpers/hooks/useMultipleSchedules';
import { EventInput } from '@fullcalendar/core'
import { uniqBy } from 'lodash';
import { nanoid } from 'nanoid';
import { Tooltip } from 'react-bootstrap';
import { tooltipsObject } from '../../../helpers/services/tooltipsObject';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import './FullCalendarComponent.css'

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
          item.classList.add('fc-active')
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


  //События при клике на дату

  const handleDateSelect = (selectInfo: DateSelectArg) => {

    const selectInfoStartStr = selectInfo.startStr;
    const dataDateElements = document.querySelectorAll('[data-date]')

    if (deleteMod) {
      //@ts-ignore
      const removeWorkDays = uniqWorkDaysDates.filter(item => item.title === selectInfoStartStr)
      //@ts-ignore
      const removeCurrentDays = currentEvents.filter(item => item.startStr !== selectInfoStartStr);
      setCurrentEvents(removeCurrentDays)
      dataDateElements.forEach(item => {
        //@ts-ignore
        if (item.dataset.date === selectInfoStartStr) {
          item.classList.remove('fc-active')
        }
      })
      Meteor.call(
        'schedule.removeWorkDay',
        removeWorkDays[0]
      )
    }
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (!deleteMod && selectInfo.allDay) {
      calendarApi.addEvent({
        id: createEventId(),
        title: undefined,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        editable: false,
        backgroundColor: 'green',
        display: 'block',
        borderColor: 'green'
      })

      dataDateElements.forEach(item => {
        //@ts-ignore
        if (item.dataset.date === selectInfoStartStr) {
          item.classList.add('fc-active')
        }
      })
    }
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

          <OverlayTrigger placement='right' overlay={<Tooltip id="tooltip">{tooltipsObject.delete}</Tooltip>}>
            <label style={{ 'marginLeft': '3em' }}>
              <input
                type='checkbox'
                checked={deleteMod}
                onChange={handleDeleteModeToggle}
              ></input>
              {t('remove')}
            </label>
          </OverlayTrigger>

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
      </>
    )
  }

  //Манипуляции со временем и датой

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    // return hours + ':' + minutes;
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '00' : minutes}:00`;
  };

  function convertMinAndMaxTime(time) {
    if (time !== undefined) {
      const hour = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      // {`${eventContentHour}:${eventContentMinutes < 10? '00' : eventContentMinutes}`}
      return `${hour}:${minutes < 10 ? '00' : minutes}:${seconds < 10 ? '00' : seconds}`
    }
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

  return (
    <div className='demo-app'>
      {renderSidebar()}
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
            slotMinTime={workDaysDates !== undefined ? convertMinAndMaxTime(minTime) : '08:00:00'}
            slotMaxTime={workDaysDates !== undefined ? convertMinAndMaxTime(maxTime) : '23:00:00'}
            slotDuration={workDaysDates !== undefined ? getTimeFromMins(step) : '01:00:00'}
            slotLabelInterval={workDaysDates !== undefined ? getTimeFromMins(step) : '01:00:00'}
            slotLabelFormat={{
              hour: 'numeric',
              minute: '2-digit'
            }}
            eventsSet={handleEvents}
            validRange={{ start: new Date() }}
          />
        </div>
      </OverlayTrigger>

      {/* <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.acceptSettings}</Tooltip>}>
        <Button style={{ display: 'block', width: '15em', margin: '2em auto' }} onClick={!deleteMod ? onSubmitChanges : undefined}>{t('accept')}</Button>
      </OverlayTrigger> */}
    </div>
  )

}




