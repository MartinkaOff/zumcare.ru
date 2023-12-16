import React from 'react';
import { ButtonGroup, Nav, ToggleButton } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';

export function AdminNav({ component }) {
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
        <LinkContainer to='/admin/specialists'>
          <Nav.Link>{t('specialists')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/admin/clients'>
          <Nav.Link>{t('clients')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/admin/sessions'>
          <Nav.Link>{t('sessions')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/admin/statistics'>
          <Nav.Link>{t("statistics")}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/admin/blog'>
          <Nav.Link>{t('blog')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/admin/payments'>
          <Nav.Link>{t('payments')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/ai'>
          <Nav.Link>{t('ai')}</Nav.Link>
        </LinkContainer>
        {/* <LinkContainer to='/admin/feedbacks'>
          <Nav.Link>{t('feedbacks')}</Nav.Link>
        </LinkContainer> */}
        <LinkContainer to='/admin/extra'>
          <Nav.Link>{t('extra')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/admin/promocodes'>
          <Nav.Link>{t('promoCodes')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/admin/faqs'>
          <Nav.Link>{t('FAQ')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/signup'>
          <Nav.Link>{t("createManager")}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/admin/company'>
          <Nav.Link>Создать компанию</Nav.Link>
        </LinkContainer>
      </Nav>
      {React.createElement(component)}
    </>
  );
}
