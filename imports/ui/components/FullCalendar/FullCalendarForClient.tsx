import React, { useState } from 'react'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';
import ruLocale from '@fullcalendar/core/locales/ru';
import { useMultipleSchedules } from '../../../helpers/hooks/useMultipleSchedules';
import { EventInput } from '@fullcalendar/core'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { tooltipsObject } from '../../../helpers/services/tooltipsObject'

import './FullCalendarComponent.css'
import { ModWorkDays } from './ModWorkDays'

export function FullCalendarForClient({ updateData }) {

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const { specialist } = useSpecialist();

  const userSpecialistId = specialist.userId;
  const currentUserid = Meteor.user()?._id;

  const { schedules } = useMultipleSchedules();
  const currentSpecSchedule = schedules.filter(item => item.specialistUserId === specialist.userId)
  const bookedDaysData = schedules.filter(item => item.specialistUserId === userSpecialistId && item.booked);
  const bookedDays = bookedDaysData.map(item => item.booked)
  const bookedDaysCurrentClient = bookedDaysData.filter(item => item.clientUserId === currentUserid).map(item => item.booked);
  const timeWorkData = schedules.filter(item => item.specialistUserId === userSpecialistId)
  const minTime = timeWorkData[0]?.minTime;
  const maxTime = timeWorkData[0]?.maxTime;
  const step = timeWorkData[0]?.step;
  const initialEvents: EventInput[] = [];
  const workDaysDates = currentSpecSchedule[0]?.workDays.map(item => item)

  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  const [dateInfo, setDateInfo] = useState(workDaysDates[0])

  const optionsForModWorkDays = {
    workDaysDates: workDaysDates,
    dateInfo: dateInfo,
  }

  //Получение html элементов по дата атрибутам - для смены цвета бэкграунда

  // const dataDateElements = document.querySelectorAll('[data-date]')
  // dataDateElements.forEach(item => {
  //   if (workDaysDates !== undefined) {
  //     workDaysDates.forEach(work => {
  //       //@ts-ignore
  //       if (item.dataset.date === work.title) {
  //         item.classList.add('fc-active')
  //       }
  //     })
  //   }
  // })
  const dataDateElements = document.querySelectorAll('[data-date]')
  dataDateElements.forEach(item => {
    if (workDaysDates !== undefined) {
      workDaysDates.forEach(work => {
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

  // Событие при котором события сохраняются в currentEvents
  const handleEvents = (events: EventApi[]) => {
    //@ts-ignore
    setCurrentEvents(events)
  }

  // Передача выбранных дней к родителю
  updateData(selectedDays)

  let eventGuid = 0

  function createEventId() {
    return String(eventGuid++)
  }


  // Перебор занятых дат для отображения их в календаре клиента

  function eventCreateSlots(item, type) {
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
      backgroundColor: type === 'their' ? 'rgba(60, 179, 113, 1)' : 'rgba(128, 128, 128, 0.5)',
      borderColor: 'white'
    }
    initialEvents.push(event)
  }

  bookedDaysData.forEach(item => {
    if (item.clientUserId === currentUserid) {
      eventCreateSlots(item.booked, 'their')
    } else {
      eventCreateSlots(item.booked, 'another')
    }
  })

  // bookedDays?.map(item => {
  //   eventCreateSlots(item, 'green')
  // })

  // События при клике на дату

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log(selectInfo)
    const selectInfoStartDate = selectInfo.start.toDateString();
    const selectInfoStartStr = selectInfo.startStr;
    const dataDateElements = document.querySelectorAll('[data-date]')
    const now = new Date();

    let calendarApi = selectInfo.view.calendar;

    //Если не undefined и время пользователя меньше времени сессии, то можно создать сессиюъ
    //(сделал для того чтоб нельзя было выбирать прошедшее время)

    if (workDaysDates !== undefined && selectInfo.start.toLocaleDateString() > now.toLocaleDateString() ||
      selectInfoStartDate === now.toDateString() &&
      selectInfo.start.toLocaleTimeString() > now.toLocaleTimeString() && step !== null) {

      workDaysDates.forEach(item => {
        //@ts-ignore
        if (item.start.toDateString() === selectInfoStartDate && !selectInfo.allDay && selectedDays.length === 0) {
          calendarApi.addEvent({
            id: createEventId(),
            title: selectInfo.startStr,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            editable: false,
            backgroundColor: 'rgba(60, 179, 113, 1)',
            display: 'block',
            borderColor: 'white'
          })

          dataDateElements.forEach(item => {
            //@ts-ignore
            if (item.dataset.date === selectInfoStartStr) {
              item.classList.add('fc-booked')
            }
          })
          //@ts-ignore
          setSelectedDays(oldArray => [...oldArray, selectInfo])
        }
      })
    }

    calendarApi.unselect() // clear date selection
  }

  //События при клике на ивент

  const handleEventClick = (clickInfo: EventClickArg) => {
    //@ts-ignore
    if (selectedDays[0]?.startStr === clickInfo.event.startStr) {
      if (confirm(`Вы уверены что хотите удалить '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
        setSelectedDays([])
      }
    }
  }

  //Рендеры

  function renderEventContent(eventContent: EventContentArg) {
    const eventContentHour = eventContent.event.start?.getHours();
    const eventContentMinutes = eventContent.event.start?.getMinutes();
    if (eventContentHour && eventContentMinutes !== undefined) {
      return (
        <>
          <b>{`${eventContentHour}:${eventContentMinutes < 10 ? '00' : eventContentMinutes}`}</b>
          {/* <i>{eventContent.event.title}</i> */}
        </>
      )
    }
  }

  return (
    <div className='demo-app'>
      <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip">{tooltipsObject.guideCalendarForClient}</Tooltip>}>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            height={650}
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
            locale={ruLocale}
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
          />
        </div>
      </OverlayTrigger>
    </div>
  )

}




