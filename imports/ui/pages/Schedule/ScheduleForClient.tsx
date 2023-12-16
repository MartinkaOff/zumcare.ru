import React, { useState } from 'react';
import { DayPicker, DayClickEventHandler } from 'react-day-picker';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';
import { useMultipleSchedules } from '../../../helpers/hooks/useMultipleSchedules';
import ru from 'date-fns/locale/ru';
import 'dayjs/locale/de';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './Schedule.css';

export function ScheduleForClient({ selectedDays, setSelectedDays, onHide }) {
  const { schedules } = useMultipleSchedules();
  const { specialist } = useSpecialist();

  const valid = schedules.filter(
    (item) => item.specialistUserId === specialist?.userId,
  );
  const bookedDaysData = schedules.filter(
    (item) => specialist?.userId === item.specialistUserId && item.booked,
  );

  const [disabledDays] = [valid[0]?.disable];
  const step = valid[0]?.step;

  //@ts-ignore
  const [time, setTime]: Date = useState();
  const minTime = valid[0]?.minTime;
  const maxTime = valid[0]?.maxTime;

  registerLocale('ru', ru);

  let afterMounth = new Date();
  afterMounth.setMonth(afterMounth.getMonth() + 1);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    const newSelectedDays = [day];
    setSelectedDays(newSelectedDays);
  };

  function checkSetTime() {
    if (time === undefined) {
      return (
        <Button style={{ width: '57%' }} variant='danger'>
          Установите время
        </Button>
      );
    } else {
      return (
        <Button
          style={{ width: '57%' }}
          variant='success'
          onClick={() => {
            onHide();
          }}
        >
          Применить
        </Button>
      );
    }
  }

  const handleResetClick = () => setSelectedDays([]);

  let footer = <p>Выберите день</p>;

  if (selectedDays.length > 0)
    footer = (
      <p style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          style={{ width: '40%' }}
          variant='primary'
          onClick={handleResetClick}
        >
          Сбросить
        </Button>
        {checkSetTime()}
      </p>
    );

  function concatBookedDaysFunction() {
    const allArray = bookedDaysData.map((item) => item.booked).join();
    const stringToArray = allArray.split(',');
    const newDateArray = stringToArray.map((item) => new Date(item));

    return newDateArray;
  }

  if (selectedDays.length > 0 && time !== undefined) {
    selectedDays[0].setHours(time.getHours(), time.getMinutes());
  }

  function disabledBookedDaysForDay() {
    if (concatBookedDaysFunction().length > 0) {
      return concatBookedDaysFunction().filter(
        (item) => item.getDate() === selectedDays[0]?.getDate(),
      );
    }
  }

  function viewInputValue() {
    if (time !== undefined) {
      return `${time.getHours()}:${
        time.getMinutes() < 10 ? '00' : time.getMinutes()
      }`;
    }
  }

  return (
    <Container>
      <Row style={{ padding: '2rem', justifyContent: 'center' }}>
        <Col>
          <Card style={{ padding: '2rem', borderRadius: '15px' }}>
            <Card.Title style={{ textAlign: 'center' }}>Время</Card.Title>
            <Card.Body /* style={{display: 'flex', justifyContent: 'space-between'}} */
            >
              <DayPicker
                fixedWeeks
                locale={ru}
                onDayClick={handleDayClick}
                selected={selectedDays}
                disabled={disabledDays}
                footer={footer}
                hidden={{
                  before: new Date(),
                  after: afterMounth,
                }}
              />
              <div>
                <DatePicker
                  locale={ru}
                  selected={time}
                  onChange={(date) => setTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={step}
                  timeCaption='Time'
                  dateFormat='p'
                  minTime={minTime}
                  maxTime={maxTime}
                  excludeTimes={disabledBookedDaysForDay()}
                  customInput={
                    <Form>
                      <Form.Label>Время</Form.Label>
                      <Form.Control
                        value={viewInputValue()}
                        style={{ cursor: 'pointer', width: '30%' }}
                      />
                    </Form>
                  }
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
