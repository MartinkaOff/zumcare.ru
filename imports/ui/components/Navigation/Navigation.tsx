import React, { useLayoutEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  ButtonGroup,
  ToggleButton,
  Dropdown,
  Button
} from 'react-bootstrap';
import { AdminNav } from './AdminNav';
import { ClientNav } from './ClientNav';
import { SpecialistNav } from './SpecialistNav';
import { ManagerNav } from './ManagerNav';
import { NotLoggedIn } from './NotLoggedIn';
import { NavbarsContext } from '../../../helpers/store/context/navbar-context';
import { useTranslation } from 'react-i18next';


import './Navigation.css';

export function Navigation({ profile, loggingIn }) {
  const [loggedIn, setLoggedIn] = useState();
  const modesCtx = useContext(NavbarsContext);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useLayoutEffect(() => {
    setLoggedIn(profile);
  }, [profile, setLoggedIn]);

  return (
    <Navbar
      className='navbar'
      // bg={modesCtx.mode}
      variant={modesCtx.mode}
      expand='lg'
      collapseOnSelect
    >
      <Navbar.Brand className='navbar-brand'>
        <LinkContainer
          to={
            profile?.userType === 'manager'
              ? '/manager/statistics'
              : profile
                ? '/cabinet'
                : '/'
          }
        >
          {/* <Nav.Link>Zumcare</Nav.Link> */}
          <img src='/logo-site.png' width='100%' />
        </LinkContainer>
      </Navbar.Brand>
      {window.innerWidth < 992 ?
        <div style={{ display: "flex", alignItems: 'center' }}>
          <Nav style={{ flex: 1, justifyContent: 'start', flexDirection: 'row' }}>
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

          <Navbar.Toggle style={{ color: 'black' }} aria-controls='basic-navbar-nav' />
        </div>
        : ''}
      <Navbar.Collapse id='basic-navbar-nav'>
        {!loggingIn &&
          (!loggedIn ? (
            <NotLoggedIn />
          ) : profile?.userType === 'client' ? (
            <ClientNav component={AuthNav} />
          ) : profile?.userType === 'specialist' ? (
            <SpecialistNav component={AuthNav} />
          ) : profile?.userType === 'manager' ? (
            <ManagerNav component={AuthNav} />
          ) : (
            <AdminNav component={AuthNav} />
          ))}

        <Dropdown>
          <Dropdown.Toggle
            className='btn-btn-opacity'
            variant='none'>
            {i18n?.language}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              active={i18n.language === 'kz'}
              onClick={() => changeLanguage('kz')}
            >
              KZ
            </Dropdown.Item>
            <Dropdown.Item
              className=''
              active={i18n.language === 'ru'}
              onClick={() => changeLanguage('ru')}
            >
              RU
            </Dropdown.Item>
            <Dropdown.Item
              active={i18n.language === 'en'}
              onClick={() => changeLanguage('en')}
            >
              EN
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <ButtonGroup>
            <ToggleButton
              id='ru-toggle'
              type='radio'
              variant='outline-primary'
              name='language'
              value='ru'
              checked={i18n.language === 'ru'}
              onChange={() => changeLanguage('ru')}
            >
              Рус
            </ToggleButton>
            <ToggleButton
              id='kz-toggle'
              type='radio'
              variant='outline-primary'
              name='language'
              value='kz'
              checked={i18n.language === 'kz'}
              onChange={() => changeLanguage('kz')}
            >
              Қаз
            </ToggleButton>
            <ToggleButton
              id='en-toggle'
              type='radio'
              variant='outline-primary'
              name='language'
              value='en'
              checked={i18n.language === 'en'}
              onChange={() => changeLanguage('en')}
            >
              EN
            </ToggleButton> */}
        {/* </ButtonGroup> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

const AuthNav = () => {
  let history = useHistory();

  const logoutHandler = () => {
    Meteor.logout();
    history.push('/');
  };

  const { t } = useTranslation();



  return (
    <div>
      {/* <Nav>
        <NavDropdown title='some'>
          <div><img style={{ width: '1.5em', margin: '0px 2em 0.5em -3em' }} src="/bell-fill.svg" alt="" /></div>
        </NavDropdown>
      </Nav> */}
      <Nav
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          margin: '1em 0 0 1em'
        }}
      >
        <NavDropdown title={t("settings")} id='basic-nav-dropdown'>
          <LinkContainer to='/cabinet'>
            <NavDropdown.Item>{t('cabinet')}</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logoutHandler}>{t("exit")}</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};
