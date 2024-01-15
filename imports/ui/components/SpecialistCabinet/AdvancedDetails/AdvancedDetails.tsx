import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Image,
  Alert,
} from 'react-bootstrap';
import Select, { MultiValue } from 'react-select';
import { Loading } from '../../Loading/Loading';
import { Formik, ErrorMessage } from 'formik';
import { Specializations as SpecilizationsCollection } from '../../../../api/specializations/Specializations';
import { Methodics as MethodicsCollection } from '../../../../api/methodics/Methodics';
import {
  languageOptions,
  getSpecializationsOptions,
  getMethodicsOptions,
} from './options';
import { schema } from './schema';
import { Specialist, Timezone } from '../../../../helpers/types';
import { FormikFormControlGroup } from '../../FormikFormControlGroup/FormikFormControlGroup';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './AdvancedDetails.css';
import {
  Certificate,
  Methodics,
  Specialization,
} from '../../../../helpers/types/types';
import { PopupModal } from '../../PopupModal/PopupModal';
import { TimezonePickerContent } from './TimezonePickerContent';
import { CountryPickerContent } from './CountryPickerContent';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

import { CertificateUploadContent } from './CertificateUploadContent';
import { useCertificates } from '../../../../helpers/hooks/useCertificates';

export function AdvancedDetails({
  specialist,
  isLoading,
}: {
  specialist: Specialist;
  isLoading: boolean;
}) {

  const { t } = useTranslation();

  const [specialistLanguages, setSpecialistLanguages] =
    useState<MultiValue<object>>();
  const [specialistSpecializations, setSpecialistSpecializations] =
    useState<MultiValue<object>>();
  const [specialistMethodics, setSpecialistMethodics] =
    useState<MultiValue<object>>();
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showCityChoose, setShowCityChoose] = useState(false);
  const [timezone, setTimezone] = useState<Timezone>();
  const [offline, setOffline] = useState(specialist?.offline);
  const { certificates, isCertificatesLoading } = useCertificates(
    specialist?.userId,
  );
  const [certificateModal, setCertificateModal] = useState(false);
  const [certificate, setCertificate] = useState<Certificate>();

  useEffect(() => {
    if (specialist) {
      setSpecialistLanguages(specialist.languages);
      setSpecialistSpecializations(specialist.specializations);
      setSpecialistMethodics(specialist.methodics);
      setTimezone(specialist.timezone);
    }
  }, [
    specialist,
    setSpecialistLanguages,
    setSpecialistMethodics,
    setSpecialistSpecializations,
    setTimezone,
  ]);

  const { specializationsOptions, methodicsOptions, isSubsLoading } =
    useTracker(() => {
      const subscription1 = Meteor.subscribe('specializations.all');
      const subscription2 = Meteor.subscribe('methodics.all');
      const specializations =
        SpecilizationsCollection.find().fetch() as Specialization[];
      const methodics = MethodicsCollection.find().fetch() as Methodics[];
      const specializationsOptions = getSpecializationsOptions(specializations);
      const methodicsOptions = getMethodicsOptions(methodics);

      return {
        specializationsOptions,
        methodicsOptions,
        isSubsLoading: !subscription1.ready() && !subscription2.ready(),
      };
    });

  const onSubmitHandler = (form: any) => {
    form.price = parseInt(form.price);
    const timezoneForm = {
      timezone: timezone?.timezone,
    };
    Meteor.call(
      'specialists.updateAdvancedDetails',
      form,
      offline,
      timezone,
      specialistLanguages,
      specialistSpecializations,
      specialistMethodics,
      specialist.userId,
      (err: object) => {
        if (err) console.log(err);
        Swal.fire({
          title: 'Success!',
          text: 'Your data was updated!',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      },
    );
    Meteor.call('timezones.insert', timezoneForm);
  };

  const getTimezoneData = (data: Timezone) => {
    setTimezone(data);
    closeCityPicker();
  };

  const closeCityPicker = () => {
    setShowCityPicker(false);
  };

  const openCityPicker = () => {
    setShowCityPicker(true);
  };

  const closeCityChoose = () => {
    setShowCityChoose(false);
  };

  const openCityChoose = () => {
    setShowCityChoose(true);
  };

  const openCertificateModal = () => {
    setCertificateModal(true);
  };

  const closeCertificateModal = () => {
    setCertificate(null);
    setCertificateModal(false);
  };

  const setOfflineFunc = (e: any) => {
    setOffline(e.target.value);
  };

  return !isLoading && !isSubsLoading ? (
    <Container>
      <PopupModal
        show={showCityPicker}
        onHide={closeCityPicker}
        content={
          <TimezonePickerContent
            onSubmit={(data: Timezone) => getTimezoneData(data)}
          />
        }
        title='Selecting timezone'
        closeButton={true}
      />
      <PopupModal
        show={showCityChoose}
        onHide={closeCityChoose}
        content={
          <CountryPickerContent
            specialist={specialist}
            onHide={closeCityChoose}
          />
        }
        title='Selecting city'
        closeButton={true}
      />
      <PopupModal
        show={certificateModal}
        onHide={closeCertificateModal}
        content={
          <CertificateUploadContent
            specialist={specialist}
            onHide={closeCertificateModal}
            certificate={certificate}
          />
        }
        title={t("addCertificate")}
        closeButton={true}
      />
      <Row style={{ padding: '2rem', justifyContent: 'center' }}>
        <Col>
          <Card style={{ padding: '2rem', borderRadius: '15px' }}>
            <Card.Title style={{ textAlign: 'center' }}>
              {t("additionalData")}
            </Card.Title>
            <Card.Body>
              <Formik
                validationSchema={schema}
                onSubmit={onSubmitHandler}
                initialValues={{
                  email: specialist && specialist.email,
                  phone: specialist && specialist.phone,
                  experience: specialist && specialist.experience,
                  price: specialist && specialist.price,
                  currency: specialist && specialist.currency,
                  online: specialist && specialist.online,
                  background: specialist && specialist.background,
                  info: specialist && specialist.info,
                  descriptor: specialist && specialist.descriptor,
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className='mb-3'>
                      {['email', 'phone', 'experience'].map((el) => (
                        <FormikFormControlGroup
                          xl='4'
                          lg='4'
                          md='4'
                          sm='12'
                          xs='12'
                          name={el}
                          value={values[el]}
                          handleChange={handleChange}
                          touched={touched[el]}
                          errors={errors[el]}
                          placeholder={el.charAt(0).toUpperCase() + el.slice(1)}
                          type='text'
                          key={el}
                        />
                      ))}
                      <Form.Group
                        as={Col}
                        lg='4'
                        md='4'
                        sm='12'
                        xs='12'
                        controlId='timezone'
                        style={{ paddingBottom: '1rem' }}
                      >
                        <Form.Label>{t("timezone")}</Form.Label>
                        <Row>
                          <Col md={8}>
                            <Form.Control
                              type='text'
                              name='timezone'
                              placeholder='No Timezone set'
                              value={
                                timezone
                                  ? timezone?.timezone +
                                  ' | ' +
                                  timezone?.abbreviation
                                  : 'No timezone set'
                              }
                              disabled
                            />
                          </Col>
                          <Col md={3} style={{ textAlign: 'center' }}>
                            <Button className='btn-btn-main' onClick={openCityPicker}>{t("find")}</Button>
                          </Col>
                        </Row>
                        <span className='error-message'>
                          <ErrorMessage name='timezone' />
                        </span>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg='4'
                        md='4'
                        sm='12'
                        xs='12'
                        style={{ paddingBottom: '1rem' }}
                      >
                        <Form.Label>{t('price')}</Form.Label>
                        <InputGroup className='mb-3'>
                          <Form.Select
                            required
                            name='currency'
                            defaultValue={values.currency}
                            aria-label='Select'
                            onChange={handleChange}
                            isValid={touched.currency && !errors.currency}
                            isInvalid={!!errors.currency}
                            style={{ background: "rgba(179, 183, 221, 0.30)" }}
                          >
                            <option value=''>{t("select")}</option>
                            <option value='kzt'>KZT</option>
                            <option value='rub'>RUB</option>
                            <option value='usd'>USD</option>
                          </Form.Select>
                          <Form.Control
                            required
                            type='text'
                            name='price'
                            placeholder='price'
                            value={values.price}
                            onChange={handleChange}
                            isValid={touched.price && !errors.price}
                            isInvalid={!!errors.price}
                            style={{ background: "rgba(179, 183, 221, 0.30)" }}
                          />
                        </InputGroup>
                        <span className='error-message'>
                          <ErrorMessage name='price' />
                          {touched.price && !!errors.price && ' | '}
                          <ErrorMessage name='currency' />
                        </span>
                      </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                      <Form.Group
                        as={Col}
                        lg='4'
                        md='4'
                        sm='12'
                        xs='12'
                        controlId='online'
                      >
                        <Form.Label>{t("online")}</Form.Label>
                        <Form.Select
                          required
                          name='online'
                          defaultValue={values.online}
                          aria-label='Select'
                          onChange={handleChange}
                          isValid={touched.online && !errors.online}
                          isInvalid={!!errors.online}
                          style={{ background: "rgba(179, 183, 221, 0.30)" }}
                        >
                          <option value=''>{t("select")}</option>
                          <option value='true'>{t("yes")}</option>
                          <option value='false'>{t("no")}</option>
                        </Form.Select>
                        <span className='error-message'>
                          <ErrorMessage name='online' />
                        </span>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        lg='4'
                        md='4'
                        sm='12'
                        xs='12'
                        controlId='offline'
                      >
                        <Form.Label>{t("offline")}</Form.Label>
                        <Form.Select
                          required
                          name='offline'
                          defaultValue={offline}
                          aria-label='Select'
                          onChange={setOfflineFunc}
                          style={{ background: "rgba(179, 183, 221, 0.30)" }}
                        >
                          <option value=''>{t("select")}</option>
                          <option value='true'>{t("yes")}</option>
                          <option value='false'>{t("no")}</option>
                        </Form.Select>
                        <span className='error-message'>
                          <ErrorMessage name='offline' />
                        </span>
                      </Form.Group>
                      {offline === 'true' && (
                        <Form.Group
                          as={Col}
                          lg='4'
                          md='4'
                          sm='12'
                          xs='12'
                          controlId='city'
                          style={{ paddingBottom: '1rem' }}
                        >
                          <Form.Label>{t("city")}</Form.Label>
                          <Row>
                            <Col md={8}>
                              <Form.Control
                                type='text'
                                name='city'
                                placeholder='No city set'
                                value={specialist?.city}
                                disabled
                                style={{ background: "rgba(179, 183, 221, 0.30)" }}
                              />
                            </Col>
                            <Col md={3} style={{ textAlign: 'center' }}>
                              <Button onClick={openCityChoose}>Find</Button>
                            </Col>
                          </Row>
                          <span className='error-message'>
                            <ErrorMessage name='city' />
                          </span>
                        </Form.Group>
                      )}
                    </Row>
                    <Row className='mb-3'>
                      <Form.Group
                        as={Col}
                        className='mb-3'
                        lg='4'
                        md='12'
                        sm='12'
                        xs='12'
                        controlId='specializations'
                      >
                        <Form.Label>{t("specializations")}</Form.Label>
                        <Select
                          value={specialistSpecializations}
                          isMulti
                          name='specializations'
                          options={specializationsOptions}
                          onChange={(e) => setSpecialistSpecializations(e)}
                          classNamePrefix='select'
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              background: "rgba(179, 183, 221, 0.30)"
                            }),
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        className='mb-3'
                        lg='4'
                        md='12'
                        sm='12'
                        xs='12'
                        controlId='methodics'
                      >
                        <Form.Label>{t("methodics")}</Form.Label>
                        <Select
                          value={specialistMethodics}
                          isMulti
                          name='methodics'
                          options={methodicsOptions}
                          onChange={(e) => setSpecialistMethodics(e)}
                          classNamePrefix='select'
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              background: "rgba(179, 183, 221, 0.30)"
                            }),
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        className='mb-3'
                        lg='4'
                        md='12'
                        sm='12'
                        xs='12'
                        controlId='languages'
                      >
                        <Form.Label>{t("languages")}</Form.Label>
                        <Select
                          value={specialistLanguages}
                          isMulti
                          name='languages'
                          options={languageOptions}
                          onChange={(e) => setSpecialistLanguages(e)}
                          classNamePrefix='select'
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              background: "rgba(179, 183, 221, 0.30)"
                            }),
                          }}
                        />
                      </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                      {['background', 'info', 'descriptor'].map((el) => (
                        <FormikFormControlGroup
                          xl='4'
                          lg='4'
                          md='12'
                          sm='12'
                          xs='12'
                          name={el}
                          value={values[el]}
                          handleChange={handleChange}
                          touched={touched[el]}
                          placeholder={`Please, provide some ${el} here`}
                          errors={errors[el]}
                          type='textarea'
                          key={el}
                        />
                      ))}
                    </Row>
                    <br />
                    <hr />
                    <Row>
                      <div>
                        <h5 style={{ textAlign: 'center' }}>{t("certificates")}</h5>
                        <Button
                          onClick={openCertificateModal}
                          style={{ float: 'right' }}
                          className='btn-btn-main'
                        >
                          {t("add")}
                        </Button>
                      </div>
                      {!isCertificatesLoading ? (
                        <Row>
                          {certificates ? (
                            certificates.map((c) => (
                              <Col sm={3} key={c?._id}>
                                <h6>{c?.title}</h6>
                                <Image
                                  width={300}
                                  height={300}
                                  src={c?.certificateUrl}
                                  onClick={() => {
                                    setCertificate(c);
                                    openCertificateModal();
                                  }}
                                />
                              </Col>
                            ))
                          ) : (
                            <Alert>Нет загруженных сертификатов</Alert>
                          )}
                        </Row>
                      ) : (
                        <Loading />
                      )}
                    </Row>
                    <div
                      className='d-grid gap-2'
                      style={{ paddingTop: '2rem' }}
                    >
                      <center>
                        <Button
                          // variant='primary'
                          type='submit'
                          size='lg'
                          style={{ width: '70%' }}
                          className='btn-btn-main'
                        >
                          {t("save")}
                        </Button>
                      </center>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Loading />
  );
}
