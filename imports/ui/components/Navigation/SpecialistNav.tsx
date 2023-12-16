import React from 'react';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';

export function SpecialistNav({ component }) {
  const { t } = useTranslation();
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  return (
    <>
      <Nav
        className='me-auto'
        style={{
          flex: 3,
          justifyContent: 'space-evenly',
          margin: '0 3rem 0 1rem',
        }}
      >
        <LinkContainer to='/specialist/schedule'>
          <Nav.Link>{t('schedule')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/sessions'>
          <Nav.Link>{t('sessions')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/specialist/blog'>
          <Nav.Link>{t('blog')}</Nav.Link>
        </LinkContainer>
      </Nav>
      {React.createElement(component)}
    </>
  );
}
