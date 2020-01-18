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
import LocalStorageService from '../services/LocalStorageService'
import ErrorService from '../services/ErrorService'
import * as Constants from '../util/Constants'
import * as StatusCode from '../util/StatusCode'
import {Link} from 'react-router-dom';



class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: UserService.isLogged()
        };
      }

    handleSignUpForm(event,errors) {
        event.preventDefault();
        let currentComponent = this
        let currentPath = this.props.location;
        let signUpDTO = JsonService.getJSONParsed(event.target)
        let loginDTO = {}
        loginDTO.email = signUpDTO.email;
        loginDTO.password = signUpDTO.password;
        if(Object.keys(errors).length === 0){
        UserService.signUp(signUpDTO).then(function (response){
            if(response.status !== StatusCode.CREATED){
                ErrorService.logError(this.props,response)
                return;
            }
                
            UserService.login(loginDTO).then(function (response){
                if(response.status !== StatusCode.OK){
                    ErrorService.logError(this.props,response)
                    return;
                }
                LocalStorageService.setToken(response.headers.authorization, response.headers.authorities, 
                                                response.headers.username, response.headers["user-id"])
                currentComponent.props.history.push(currentPath)
                currentComponent.setState({
                    isLogged: true
                    })
                })
            })
        }
    }

    handleLoginForm(event,errors){
        event.preventDefault();
        let currentComponent = this;
        let currentPath = this.props.location;
        let loginDTO = {}
        loginDTO.email = event.target[0].value;
        loginDTO.password = event.target[1].value
        if(Object.keys(errors).length === 0){
            UserService.login(loginDTO).then(function(response){
                if(response.status === StatusCode.OK){
                    LocalStorageService.setToken(response.headers.authorization, response.headers.authorities, 
                                                    response.headers.username, response.headers["user-id"])
                    document.getElementById("errorLoginSignUp").style.display = "none"
                    currentComponent.props.history.push(currentPath)
                }else if(response.status === StatusCode.UNAUTHORIZED){
                    document.getElementById("errorLoginSignUp").style.display = "block"
                }else{
                    ErrorService.logError(this.props,response)
                }
            })
        }
    }

    checkEmailAvailability(event){
        let email = event.target.value
        UserService.checkEmailAvailability(email).then(function (response){
            if(response.status === StatusCode.OK){
                document.getElementById("emailTakenError").style.display = "block"
            }else if(response.status === StatusCode.NOT_FOUND || response.status === StatusCode.BAD_REQUEST)
                document.getElementById("emailTakenError").style.display = "none"
            else{
                ErrorService.logError(this.props,response)
            }
        })
        return true;
    }

    render() {
    if (this.state.isLogged === true || UserService.isLogged()) {
        return <Redirect to='/' />
    }

    const { t } = this.props;
    const signUp_schema = yup.object({
    firstName: yup.string().required( t('errors.requiredField') )
                            .matches(Constants.lettersAndSpacesRegex, t('errors.lettersAndSpacesRegex'))
                            .min(Constants.SHORT_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.SHORT_STRING_MAX_LENGTH, t('errors.lengthMax')),
    lastName: yup.string().required( t('errors.requiredField') )
                            .matches(Constants.lettersAndSpacesRegex, t('errors.lettersAndSpacesRegex'))
                            .min(Constants.SHORT_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.SHORT_STRING_MAX_LENGTH, t('errors.lengthMax')),
    email: yup.string().required( t('errors.requiredField') )
                            .matches(Constants.emailRegex, t('errors.emailRegex'))
                            .min(Constants.SHORT_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.EMAIL_MAX_LENGTH, t('errors.lengthMax')),
    password: yup.string().required( t('errors.requiredField') )
                            .matches(Constants.simpleLettersAndNumbersRegex, t('errors.lettersAndNumbersRegex'))
                            .min(Constants.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.LONG_STRING_MAX_LENGTH_PASS, t('errors.lengthMax')),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], t('errors.passwordMatch')),
    phoneNumber: yup.string()
                            .matches(Constants.numbersDashRegex, t('errors.numbersDashRegex'))
                            .min(Constants.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.LONG_STRING_MAX_LENGTH, t('errors.lengthMax')),
    });
    const login_schema = yup.object({
        email: yup.string().required( t('errors.requiredField') ),
        password: yup.string().required( t('errors.requiredField') )
        });
    return (
        <div className="flex">
            <div className="box_form_signUp">
                <div>
                    <h3>{t('signUp.registry')}</h3>
                </div>
                <hr/>
                <Formik
                validationSchema={signUp_schema}
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
                    <Form noValidate onSubmit={(event) => handleSubmit(event) || this.handleSignUpForm(event,errors)}>
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
                        <Form.Group as={Col} md="12" controlId="validationFormik03">
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
                        <Form.Group as={Col} md="12" controlId="validationFormik04">
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
                        <Form.Group as={Col} md="12" controlId="validationFormik05">
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
                        <Form.Group as={Col} md="12" controlId="validationFormik06">
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
                    <Button type="submit" id="submitButtonSignUp" disabled={isSubmitting} onClick={handleChange}>{t('signUp.submit')}</Button>
                    </Form>
                )}
                </Formik>
            </div>
            <div className="box_form_signUp">
                <div>
                    <h3>{t('signUp.login')}</h3>
                </div>
                <hr/>
                <Formik
                validationSchema={login_schema}
                initialValues={{ email:"", password:""}}
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
                    <Form noValidate onSubmit={(event) => handleSubmit(event) || this.handleLoginForm(event,errors)}>
                        <Form.Group as={Col} md="12" controlId="validationFormik07">
                            <Form.Label>{t('signUp.email')}</Form.Label>
                            <InputGroup>
                                <Form.Control
                                type="text"
                                placeholder={t('navbar.mail')}
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.email && touched.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.email}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationFormik08">
                            <Form.Label>{t('signUp.password')}</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t('navbar.mail')}
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
                        <p id="errorLoginSignUp" className="errorText">{t('errors.errorLogin')}</p>
                    <Button type="submit" id="submitButtonLogIn" disabled={isSubmitting} onClick={handleChange}>{t('signUp.submit')}</Button>
                    </Form>
                )}
                </Formik>
                <Link to={{pathname: "/ForgottenPassword"}}>
                    <a id="recover_pass" href="./ForgottenPassword">{t('navbar.recoverPass')}</a>
                </Link>
            </div>
        </div>
    );
    }
}

export default withRouter(withTranslation()(SignUp));