import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { PopupModal } from "../../components/PopupModal/PopupModal";
import { useTranslation } from "react-i18next";
import { Meteor } from "meteor/meteor";
import Swal from 'sweetalert2';

export function Login({ specialistUserId }) {
  let history = useHistory();
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [showModalForgotPassword, setShowModalForgotPassword] = useState(false)
  const { t, i18n } = useTranslation();

  const openModalForgotPassword = () => {
    setShowModalForgotPassword(true);
  }

  const closeModalForgotPassword = () => {
    setShowModalForgotPassword(false);
  }

  const forgotPassword = (e) => {
    e.preventDefault();
    if (username) {
      Meteor.call('users.forgotPassword', username, function (err, res) {
        if (err) {
          Swal.fire({
            title: 'Error!',
            text: i18n.language === 'en' ?
              'An account with such a mail does not exist or in the same format later' :
              'Аккаунта с таким такой почтой не существует или же попробуйте попытку позже',
            icon: 'error',
          })
        } else {
          Swal.fire({
            title: 'Success!',
            text: i18n.language === 'en' ?
              'A link to reset your password has been sent to your email!' :
              'Ссылка для сброса пароля отправлена вам на почту!',
            icon: 'success',
          })
          closeModalForgotPassword();
        }
      })
    } else setError(t("fillCredentials") || undefined);

  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (username && password) {
      Meteor.loginWithPassword({ username: username }, password, (err) => {
        if (err instanceof Meteor.Error) {
          setError(err.reason)

          err.reason === 'Incorrect password' ?
            Swal.fire({
              title: 'Error!',
              text: i18n.language === 'en' ? 'Incorrect password' : 'Неверный пароль',
              icon: 'error',
            }) :
            Swal.fire({
              title: 'Error!',
              text: i18n.language === 'en' ? 'There is no user with this email' : 'Пользователя с такой почтой нет',
              icon: 'error',
            })

          return
        } else if (history.location.pathname === `/specialists/${specialistUserId}`) {
          history.push(`/client/specialists/${specialistUserId}`)
        } else {
          history.push('/sessions');
        }
        console.log(err);

      });

    } else setError(t("fillCredentials") || undefined);
  };

  return (
    <Container>
      <PopupModal
        show={showModalForgotPassword}
        onHide={closeModalForgotPassword}
        content={
          <Form onSubmit={forgotPassword}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("passwordResetText")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("enterEmail") as string}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted">
                {t("neverShareEmail")}
              </Form.Text>

            </Form.Group>
            <Button style={{ margin: "0 auto", display: "block" }} variant="primary" type="submit">
              {t("confirm")}
            </Button>
          </Form>
        }
        title={t("passwordReset")}
        closeButton={true}
        size="undefined"
      />
      <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
        <Col xxl={6} xl={7} lg={8}>
          <Card
            style={{
              padding: "2rem",
              borderRadius: "15px",
            }}
          >
            <Card.Title style={{ textAlign: "center" }}>
              {t("login")}
            </Card.Title>
            <Card.Body>
              <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t("emailAddress")}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t("enterEmail") as string}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    {t("neverShareEmail")}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t("password")}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t("enterPassword") as string}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label={t("saveCredentials")} />
                </Form.Group>

                {!!error && <Alert variant="warning">{error}!</Alert>}
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    {t("submit")}
                  </Button>
                </div>
                <div className="d-grid gap-2" style={{ margin: "1em auto" }}>
                  <a href="#" style={{ margin: "0 auto" }} onClick={openModalForgotPassword}>{t("forgotPassword")}</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
