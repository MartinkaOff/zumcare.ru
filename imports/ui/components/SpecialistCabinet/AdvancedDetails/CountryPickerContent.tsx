import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { CountryService } from '../../../../helpers/services/CountryService';
import { getCity } from '../../../../helpers/services';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './flags.css';
import { Button } from 'react-bootstrap';

export function CountryPickerContent({ specialist, onHide }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState();
  const [filteredCities, setFilteredCities] = useState();

  useEffect(() => {
    async function loadCountries() {
      const res = await getCity(selectedCountry?.code);
      setCities(res);
    }
    loadCountries();
  }, [selectedCountry]);

  const panelFooterTemplate = () => {
    const isCountrySelected = (filteredCountries || []).some(
      (country) => country['name'] === selectedCountry,
    );
    return (
      <div className='py-2 px-3'>
        {isCountrySelected ? (
          <span>
            <b>{selectedCountry}</b> selected.
          </span>
        ) : (
          'No country selected.'
        )}
      </div>
    );
  };

  const searchCountry = (event) => {
    let _filteredCountries;

    if (!event.query.trim().length) {
      _filteredCountries = [...countries];
    } else {
      _filteredCountries = countries.filter((country) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setFilteredCountries(_filteredCountries);
  };

  const searchCity = (event) => {
    let _filteredCities;

    if (!event.query.trim().length) {
      _filteredCities = [...cities];
    } else {
      _filteredCities = cities.filter((city) => {
        return city.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setFilteredCities(_filteredCities);
  };

  const itemTemplate = (item) => {
    return (
      <div className='flex align-items-center'>
        <img
          alt={item.name}
          src='https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png'
          className={`flag flag-${item.code.toLowerCase()} mr-2`}
          style={{ width: '18px' }}
        />
        <div>{item.name}</div>
      </div>
    );
  };

  useEffect(() => {
    CountryService.getCountries().then((data) => setCountries(data));
  }, []);

  const submitCity = () => {
    const cityForm = {
      city: selectedCity?.name,
    };
    Meteor.call(
      'specialists.addCountryAndCity',
      specialist.userId,
      selectedCity.name,
    );
    Meteor.call('cities.insert', cityForm);
  };

  function renderSubmit() {
    if (typeof selectedCity === 'object' && selectedCity !== null) {
      return (
        <Button
          onClick={() => (submitCity(), onHide())}
          style={{ marginTop: '1em', width: '10em', height: '3em' }}
        >
          Complete
        </Button>
      );
    } else {
      return;
    }
  }

  return (
    <div style={{ height: '10em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className='form-label'>Country</label>
          <AutoComplete
            field='name'
            value={selectedCountry}
            suggestions={filteredCountries}
            completeMethod={searchCountry}
            onChange={(e) => setSelectedCountry(e.value)}
            itemTemplate={itemTemplate}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className='form-label'>City</label>
          <AutoComplete
            field='name'
            value={selectedCity}
            suggestions={filteredCities}
            completeMethod={searchCity}
            onChange={(e) => setSelectedCity(e.value)}
          />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>{renderSubmit()}</div>
    </div>
  );
}
