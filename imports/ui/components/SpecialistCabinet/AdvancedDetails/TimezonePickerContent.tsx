import React, {useEffect, useState} from 'react';
import {Row, Col, Form, Button, InputGroup, Table} from 'react-bootstrap';
import {
  getTimezones,
  getLocation,
  getLocationByIp,
} from '../../../../helpers/services';
import {Timezone} from '../../../../helpers/types';

export function TimezonePickerContent({onSubmit}) {
  const [selectMode, setSelectMode] = useState(false);
  const [region, setRegion] = useState<string | undefined>();
  const [location, setLocation] = useState<string | undefined>();
  const [currentTimezone, setCurrentTimezone] = useState<Timezone>();
  const [timezones, setTimezones] = useState<string[]>();
  const [selectedLocation, setSelectedLocation] = useState<Timezone>();

  useEffect(() => {
    async function getCurrentTimezoneByIp() {
      const res = await getLocationByIp();
      setCurrentTimezone(res);
    }
    getCurrentTimezoneByIp();
  }, []);

  useEffect(() => {
    async function loadTimezones(region: string | undefined) {
      const res = await getTimezones(region);
      setTimezones(res);
    }
    loadTimezones(region);
  }, [region]);

  useEffect(() => {
    async function loadLocation(location: string | undefined) {
      const res = await getLocation(location);
      setSelectedLocation(res);
    }
    loadLocation(location);
  }, [location]);

  const saveTimezone = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    onSubmit(selectedLocation);
  };

  const confirmTimezone = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    onSubmit(currentTimezone);
  };

  return !selectMode ? (
    <Form onSubmit={(e) => confirmTimezone(e)}>
      <Row style={{justifyContent: 'center'}}>
        <Form.Label style={{textAlign: 'center'}}>Your timezone</Form.Label>
        <Col md={7}>
          <Form.Group>
            <Form.Control
              type='text'
              name='timezone'
              placeholder='Timezone'
              value={
                currentTimezone &&
                currentTimezone.timezone + ' | ' + currentTimezone.abbreviation
              }
              disabled
            />
          </Form.Group>
        </Col>
        <Col md={3} style={{textAlign: 'center'}}>
          <Button variant='warning' onClick={() => setSelectMode(true)}>
            Change
          </Button>
        </Col>
      </Row>
      <div className='d-grid gap-2' style={{paddingTop: '2rem'}}>
        <center>
          <Button
            style={{width: '50%', marginBottom: '1rem'}}
            variant='primary'
            type='submit'
          >
            Confirm
          </Button>
        </center>
      </div>
    </Form>
  ) : (
    <Form onSubmit={(e) => saveTimezone(e)}>
      <Row style={{justifyContent: 'center'}}>
        <Form.Label style={{textAlign: 'center'}}>Set your timezone</Form.Label>
        <Col sm={10}>
          <Form.Group>
            <InputGroup className='mb-3'>
              <Form.Select
                name='region'
                aria-label='Select'
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value=''>Select</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europe</option>
                <option value='Pacific'>Pacific</option>
              </Form.Select>
              <Form.Select
                name='location'
                aria-label='Select'
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value=''>Select</option>
                {timezones?.map((tz) => (
                  <option value={tz} key={tz}>
                    {tz}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      {selectedLocation && (
        <Row style={{justifyContent: 'center'}}>
          <Table bordered hover style={{width: '80%'}}>
            <thead>
              <tr>
                <th>Location</th>
                <th>GMT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedLocation?.timezone}</td>
                <td>{selectedLocation?.abbreviation}</td>
              </tr>
            </tbody>
          </Table>
          <div className='d-grid gap-2' style={{paddingTop: '2rem'}}>
            <center>
              <Button
                style={{width: '50%', marginBottom: '1rem'}}
                variant='success'
                type='submit'
              >
                Save
              </Button>
            </center>
          </div>
        </Row>
      )}
    </Form>
  );
}
