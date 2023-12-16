import React from 'react';
import { Nav, Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';

export function NotLoggedIn() {
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
        <LinkContainer to='/aboutus'>
          <Nav.Link>{t('aboutUs')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/specialists'>
          <Nav.Link>{t('findSpecialist')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/blog'>
          <Nav.Link>{t('blog')}</Nav.Link>
        </LinkContainer>

        <LinkContainer to='/faq'>
          <Nav.Link>{t('faq')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/ai'>
          <Nav.Link>{t('ai')}</Nav.Link>
        </LinkContainer>
      </Nav>
      <Nav style={{ flex: 1, justifyContent: 'start' }}>
        <LinkContainer
          to='/login'
          style={{ minWidth: '100px', margin: '0 0.5rem 0 0.5rem' }}
        >
          <Nav.Link>
            <Button variant='btn-main'>{t('login')}</Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer
          to='/signup'
          style={{ minWidth: '100px', margin: '0 0.5rem 0 0.5rem' }}
        >
          <Nav.Link>
            <Button variant='btn-main'>{t('signup')}</Button>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </>
  );
}
