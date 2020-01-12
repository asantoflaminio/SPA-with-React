import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SignUp.css';
import {Redirect} from 'react-router-dom';
import { withRouter } from "react-router";
import UserService from '../services/UserService'
import JsonService from '../services/JsonService'
import * as ValidationConst from '../util/ValidationConst'



class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: UserService.isLogged()
        };
      }

    handleFormSubmit(event,errors) {
        let currentComponent = this

        event.preventDefault();
        if(Object.keys(errors).length === 0){
        UserService.signUp(event,this.props).then(function (data){
            let names = ["email","password"];
            let values = [data.email,data.password]
            UserService.login(JsonService.createJSONArray(names,values),currentComponent.props).then(function (data){
                currentComponent.setState({
                    isLogged: true
                    })
                })
            })
        }
    }

    checkEmailAvaiability(event){
        UserService.checkEmailAvaibility(event,this.props).then(function (status){
            if(status)
                document.getElementById("emailTakenError").style.display = "none"
            else
                document.getElementById("emailTakenError").style.display = "block"
        })
        return true;
    }

    render() {
    if (this.state.isLogged === true || UserService.isLogged()) {
        return <Redirect to='/' />
    }

    const { t } = this.props;
    const schema = yup.object({
    firstName: yup.string().required( t('errors.requiredField') )
                            .matches(ValidationConst.lettersAndSpacesRegex, t('errors.lettersAndSpacesRegex'))
                            .min(ValidationConst.SHORT_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(ValidationConst.SHORT_STRING_MAX_LENGTH, t('errors.lengthMax')),
    lastName: yup.string().required( t('errors.requiredField') )
                            .matches(ValidationConst.lettersAndSpacesRegex, t('errors.lettersAndSpacesRegex'))
                            .min(ValidationConst.SHORT_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(ValidationConst.SHORT_STRING_MAX_LENGTH, t('errors.lengthMax')),
    email: yup.string().required( t('errors.requiredField') )
                            .matches(ValidationConst.emailRegex, t('errors.emailRegex'))
                            .min(ValidationConst.SHORT_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(ValidationConst.EMAIL_MAX_LENGTH, t('errors.lengthMax')),
    password: yup.string().required( t('errors.requiredField') )
                            .matches(ValidationConst.simpleLettersAndNumbersRegex, t('errors.lettersAndNumbersRegex'))
                            .min(ValidationConst.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(ValidationConst.LONG_STRING_MAX_LENGTH_PASS, t('errors.lengthMax')),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], t('errors.passwordMatch')),
    phoneNumber: yup.string()
                            .matches(ValidationConst.numbersDashRegex, t('errors.numbersDashRegex'))
                            .min(ValidationConst.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(ValidationConst.LONG_STRING_MAX_LENGTH, t('errors.lengthMax')),
    });
    return (
        <div className="box_form_signUp">
            <div>
                <h3>{t('signUp.registry')}</h3>
            </div>
            <hr/>
            <Formik
            validationSchema={schema}
            initialValues={{ firstName:"", lastName:"", email:"", password:"", repeatPassword:"", phoneNumber:""}}
            onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            resetForm();
            setSubmitting(false);
           }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <Form noValidate onSubmit={(event) => handleSubmit(event) || this.handleFormSubmit(event,errors)}>
                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                        <Form.Label>{t('signUp.firstName')}</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder={t('signUp.firstNameHolder')}
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="firstName"
                            isInvalid={!!errors.firstName && touched.firstName}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.lastName && touched.lastName}
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
                            onChange={handleChange}
                            onBlur={(event) => this.checkEmailAvailability(event,errors) && handleBlur(event)}
                            isInvalid={!!errors.email && touched.email}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.email}
                            </Form.Control.Feedback>
                        </InputGroup>
                        <p id="emailTakenError" className="errorText">{t('errors.emailTaken')}</p>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationFormik03">
                        <Form.Label>{t('signUp.password')}</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder={t('signUp.passwordHolder')}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.password && touched.password}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.repeatPassword && touched.repeatPassword}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber}
                        </Form.Control.Feedback>
                    </Form.Group>
                <Button type="submit" id="submitButton" disabled={isSubmitting} onClick={handleChange}>{t('signUp.submit')}</Button>
                </Form>
            )}
            </Formik>
        </div>
    );
    }
}

export default withRouter(withTranslation()(SignUp));