import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SignUp.css';
import axios from 'axios';



class SignUp extends React.Component {
    handleFormSubmit(event) {
        event.preventDefault();
        const data = {
          firstName: event.target[0].value,
          lastName: event.target[1].value,
          email: event.target[2].value,
          password: event.target[3].value,
          repeatPassword: event.target[4].value,
          phoneNumber: event.target[5].value
        }
        alert(JSON.stringify(data))
        axios({
          method: 'post',
          url: 'users/signUp',
          data: data
        })
        .then(function (response) {
            alert(response.status)
        })
        .catch(function (error) {
        });
    }

    checkErrors(){
        let firstName = document.getElementById("firstName")
        alert(firstName) 
        return true;
    }

    render() {

    const { t } = this.props;
    const schema = yup.object({
    firstName: yup.string().required( t('errors.requiredField') ).min( t('errors.shortMin') ),
    lastName: yup.string().required( t('errors.requiredField') ),
    email: yup.string().required( t('errors.requiredField') ),
    password: yup.string().required( t('errors.requiredField') ),
    repeatPassword: yup.string().required( t('errors.requiredField') ),
    phoneNumber: yup.number( t('errors.phoneField') )
    });
    return (
        <div className="box_form_signUp">
            <div>
                <h3>{t('signUp.registry')}</h3>
            </div>
            <hr/>
            <Formik
            validationSchema={schema}
            >
            {({
                values,
                touched,
                errors,
            }) => (
                <Form noValidate onSubmit={event => {
                    if(this.checkErrors(schema))
                        this.handleFormSubmit(event);
                  }}>
                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                        <Form.Label>{t('signUp.firstName')}</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder={t('signUp.firstNameHolder')}
                            value={values.firstName}
                            id="firstName"
                            isInvalid={!!errors.firstName}
                        />
                         <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationFormik02">
                        <Form.Label>{t('signUp.lastName')}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={t('signUp.lastNameHolder')}
                            name="lastName"
                            value={values.lastName}
                            isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationFormikUsername">
                        <Form.Label>{t('signUp.email')}</Form.Label>
                        <InputGroup>
                            <Form.Control
                            type="text"
                            placeholder={t('signUp.emailHolder')}
                            name="email"
                            value={values.email}
                            isInvalid={!!errors.email && !! touched.email}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.email}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationFormik03">
                        <Form.Label>{t('signUp.password')}</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder={t('signUp.passwordHolder')}
                            name="password"
                            value={values.password}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationFormik04">
                        <Form.Label>{t('signUp.repeatPassword')}</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder={t('signUp.passwordHolder')}
                            name="repeatPassword"
                            value={values.repeatPassword}
                            isInvalid={!!errors.repeatPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.repeatPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationFormik05">
                        <Form.Label>{t('signUp.phoneNumber')}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={t('signUp.phoneNumberHolder')}
                            name="phoneNumber"
                            value={values.phoneNumber}
                            isInvalid={!!errors.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber}
                        </Form.Control.Feedback>
                    </Form.Group>
                <Button type="submit">{t('signUp.submit')}</Button>
                </Form>
            )}
            </Formik>
        </div>
    );
    }
}

export default withTranslation()(SignUp);