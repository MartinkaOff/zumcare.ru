import React, { useState } from 'react';
import { Row, Col, Image, Button, Form } from 'react-bootstrap';
import { Loading } from '../../components/Loading/Loading';
import { PopupModal } from '../../components/PopupModal/PopupModal';
import { AuthorizedClient } from './AuthorizedClient';
import { useTracker } from 'meteor/react-meteor-data';
import { DayPicker, DayClickEventHandler } from 'react-day-picker';
import { Schedule, Specialist } from '../../../helpers/types';
import { FullCalendarComponent } from '../../components/FullCalendar/FullCalendarComponent';
import { FullCalendarForClient } from '../../components/FullCalendar/FullCalendarForClient';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { useTranslation } from 'react-i18next';

type Props = {
  photo: string;
  isPhotoLoading: boolean;
  specialist: Specialist;
  isSpecialistLoading: boolean;
  specialistUserId: string;
  schedules: Schedule[];
};

export function TopRibbon({
  photo,
  isPhotoLoading,
  specialist,
  isSpecialistLoading,
  specialistUserId,
  schedules,
}: Props) {
  const currentUser = useTracker(() => Meteor.user());
  const [showModal, setShowModal] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const currentSpecSchedule = schedules.filter(item => item.specialistUserId === specialistUserId);
  const workDaysDates = currentSpecSchedule[0]?.workDays.map(item => item);

  const { t } = useTranslation();

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const openSchedule = () => {
    setShowSchedule(true);
  };

  const closeSchedule = () => {
    setShowSchedule(false);
  };

  const valid = schedules.filter(
    (item) => item.specialistUserId === specialist?.userId,
  );

  const [disabledDays] = [valid[0]?.disable];
  const step = valid[0]?.step;
  const [time, setTime] = useState<Date>();
  const minTime = valid[0]?.minTime;
  const maxTime = valid[0]?.maxTime;
  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    const newSelectedDays = [day];
    setSelectedDays(newSelectedDays);
  };

  let afterMounth = new Date();
  afterMounth.setMonth(afterMounth.getMonth() + 1);

  const handleResetClick = () => setSelectedDays([]);

  const bookedDaysData = schedules.filter(
    (item) => specialist?.userId === item.specialistUserId && item.booked,
  );

  function concatBookedDaysFunction() {
    const allArray = bookedDaysData.map((item) => item.booked).join();
    const stringToArray = allArray.split(',');
    const newDateArray = stringToArray.map((item) => new Date(item));

    return newDateArray;
  }

  function disabledBookedDaysForDay() {
    if (concatBookedDaysFunction().length > 0) {
      return concatBookedDaysFunction().filter(
        (item) => item.getDate() === selectedDays[0]?.getDate(),
      );
    }
  }

  if (selectedDays.length > 0 && time) {
    selectedDays[0].setHours(time.getHours(), time.getMinutes());
    disabledBookedDaysForDay().forEach((item) => {
      if (item.toString() === selectedDays[0].toString()) {
        // setTime((time) => console.log(time));
        setTime(time);
        handleResetClick();
      }
    });
  }

  function viewInputValue() {
    if (time !== undefined) {
      return `${time.getHours()}:${time.getMinutes() < 10 ? '00' : time.getMinutes()
        }`;
    }
  }

  function updateData(value) {
    setSelectedDays(value)
  }

  //Удаляет прошедшие даты
  if (workDaysDates !== undefined) {
    const workDaysArrayFiltered = workDaysDates.filter(item => item.start.toLocaleDateString() >= new Date().toLocaleDateString())
    Meteor.call('schedule.removeAfterDate', workDaysDates, workDaysArrayFiltered)
  }

  return (
    <Row className='top-ribbon-container'>
      <PopupModal
        show={showModal}
        onHide={closeModal}
        content={
          <AuthorizedClient
            specialist={specialist}
            onHideModal={closeModal}
            // openSchedule={openSchedule}
            specialistUserId={specialistUserId}
            selectedDays={selectedDays}
          />
        }
        title={currentUser ? t('makeAnAppointment') : 'Пожалуйста, авторизуйтесь'}
        closeButton={true}
      />
      <PopupModal
        show={showSchedule}
        onHide={closeSchedule}
        content={
          <div>
            <FullCalendarForClient updateData={updateData} />
            {selectedDays.length > 0 ?
              <Button
                style={{ width: '100%', margin: '1rem 0 1rem 0' }}
                onClick={() => (openModal(), closeSchedule())}
                variant='success'
                className='top-ribbon-button'
              >
                {t("enroll")}
              </Button> : ''}
          </div>
        }
        title={currentUser ? t('makeAnAppointment') : 'Пожалуйста, авторизуйтесь'}
        closeButton={true}
      />
      <Col xl='4' lg='5' md='6' sm='8' xs='12'>
        {photo?.length ? (
          !isPhotoLoading ? (
            <center>
              <Image
                src={photo}
                rounded
                className='top-ribbon-specialist-image'
              />
            </center>
          ) : (
            <Loading />
          )
        ) : (
          <h6 className='top-ribbon-no-image-text'>
            Отсутствует фото специалиста
          </h6>
        )}
      </Col>
      <Col lg='6' md='6'>
        {!isSpecialistLoading ? (
          <div>
            <h4>{specialist?.name}</h4>
            <p className='top-ribbon-specialist-methodics'>
              {' '}
              {specialist?.methodics &&
                specialist?.methodics.map(
                  (m: { label: string }, index: number) =>
                    m.label +
                    (index === specialist?.methodics.length - 1 ? ' ' : ', '),
                )}{' '}
            </p>
            <p
              className='top-ribbon-specialist-info'
              style={{ wordWrap: 'break-word' }}
            >
              {specialist?.info && specialist?.info}
            </p>
          </div>
        ) : (
          <Loading />
        )}
        <Row>
          {/* {showDayPicker ? (
            <Col md={6} sm={8}>
                <DayPicker
                fixedWeeks
                locale={ru}
                onDayClick={handleDayClick}
                selected={selectedDays}
                disabled={disabledDays}
                footer={<p style={{ color: 'red' }}>Выберите дату и время</p>}
                hidden={{
                  before: new Date(),
                  after: afterMounth,
                }}
              /> 
              {selectedDays?.length ? (
                <div>
                  <DatePicker
                    inline
                    locale={ru}
                    selected={time}
                    onChange={(date: Date) => setTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={step}
                    timeCaption='Время приема'
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
                  <Row>
                    <Col>
                      <Button
                        style={{ width: '100%', margin: '1rem 0 1rem 0' }}
                        variant='primary'
                        onClick={() => {
                          handleResetClick();
                          setSelectedDays([]);
                        }}
                      >
                        Сбросить
                      </Button>
                    </Col>
                    {selectedDays.length > 0 && time !== undefined && (
                      <Col>
                        <Button
                          style={{ width: '100%', margin: '1rem 0 1rem 0' }}
                          onClick={openModal}
                          variant='success'
                          className='top-ribbon-button'
                        >
                          Записаться
                        </Button>
                      </Col>
                    )}
                  </Row>
                </div>
              ) : (
                <div></div>
              )}
            </Col>
          ) : (
            <Button
              onClick={() => {
                setShowDayPicker(true); 
                openSchedule()}}
              style={{ width: '50%' }}
            >
              Выбрать дату
            </Button>
          )} */}
          <Button
            onClick={() => {
              setShowDayPicker(true);
              openSchedule()
            }}
            style={{ width: '50%' }}
          >
            {t('selectDate')}
          </Button>
        </Row>
        <br />
        <Row>
          <Col
            xs='6'
            sm='6'
            md='6'
            className='top-ribbon-lower-bullets-container'
          >
            {!isSpecialistLoading ? (
              <div>
                <h6 style={{ fontWeight: 600 }}>{t('price')}</h6>
                <h4 style={{ fontWeight: 400 }}>
                  {specialist && specialist.price
                    ? specialist?.price + ' ' + specialist?.currency
                    : 'неизвестно'}
                </h4>
              </div>
            ) : (
              <Loading />
            )}
          </Col>
          <Col
            xs='6'
            sm='6'
            md='6'
            className='top-ribbon-lower-bullets-container'
          >
            {!isSpecialistLoading ? (
              <p style={{ fontSize: 14 }}>
                ✅{' '}
                {specialist?.experience &&
                  +specialist?.experience + ' ' + t("yearsExperience")}
              </p>
            ) : (
              <Loading />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
