import React from 'react';
import { ButtonGroup, Nav, ToggleButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';

export function ClientNav({ component }) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Nav
        className='me-auto'
        style={{
          flex: 3,
          justifyContent: 'space-between',
          margin: '0 3rem 0 1rem',
        }}
      >
        <LinkContainer to='/client/specialists'>
          <Nav.Link>{t('findSpecialist')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/sessions'>
          <Nav.Link>{t('sessions')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/client/blog'>
          <Nav.Link>{t('blog')}</Nav.Link>
        </LinkContainer>
        
        <LinkContainer to='/client/faq'>
          <Nav.Link>{t('faq')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/ai'>
          <Nav.Link>{t('ai')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/client/support'>
          <Nav.Link>{t('support')}</Nav.Link>
        </LinkContainer>
      </Nav>
      {React.createElement(component)}
    </>
  );
}
