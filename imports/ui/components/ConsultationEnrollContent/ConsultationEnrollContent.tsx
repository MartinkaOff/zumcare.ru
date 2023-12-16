import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import { FormikFormControlGroup } from "../FormikFormControlGroup/FormikFormControlGroup";
import { schema } from "./schema";
import { useTranslation } from "react-i18next";

export function ConsultationEnrollContent({
  onSubmit,
}: {
  onSubmit?(e: object): void;
}) {
  const onSubmitHandler = (form: object) => {
    onSubmit !== undefined && onSubmit(form);
  };

  const { t } = useTranslation();

  return (
    <Container>
      <Row style={{ justifyContent: "center" }}>
        <Formik
          validationSchema={schema}
          initialValues={{
            messenger: "whatsapp",
            name: "",
            phone: "",
            case: "",
          }}
          onSubmit={onSubmitHandler}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3" style={{ justifyContent: "center" }}>
                <Form.Group
                  as={Col}
                  xl="8"
                  lg="8"
                  md="10"
                  sm="10"
                  xs="10"
                  controlId="messenger"
                  style={{ paddingBottom: "1rem" }}
                >
                  <Form.Label>{t("messenger")}</Form.Label>
                  <Form.Select
                    name="messenger"
                    defaultValue={values.messenger}
                    aria-label="Select"
                    onChange={handleChange}
                    isValid={touched.messenger && !errors.messenger}
                    isInvalid={!!errors.messenger}
                  >
                    <option selected={true} value="whatsapp">{t("whatsapp")}</option>
                    <option value="telegram">{t("telegram")}</option>
                    <option value="viber">{t("viber")}</option>
                  </Form.Select>
                  <span className="error-message">
                    <ErrorMessage name="messenger" />
                  </span>
                </Form.Group>
                {[
                  ["name", "text"],
                  ["phone", "text"],
                  ["case", "textarea"],
                ].map((el) => (
                  <FormikFormControlGroup
                    xl="8"
                    lg="8"
                    md="10"
                    sm="10"
                    xs="10"
                    name={el[0]}
                    value={values[el[0]]}
                    handleChange={handleChange}
                    touched={touched[el[0]]}
                    errors={errors[el[0]]}
                    placeholder={
                      el[0] === "phone" ? t("phoneOrTelegram") : t(el[0])
                    }
                    type={el[1]}
                    key={el[0]}
                  />
                ))}
              </Row>
              <div className="d-grid gap-2" style={{ paddingTop: "2rem" }}>
                <center>
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    style={{ width: "70%" }}
                  >
                    {t("enroll")}
                  </Button>
                </center>
              </div>
            </Form>
          )}
        </Formik>
      </Row>
    </Container>
  );
}
