import React from 'react';
import { withTranslation } from 'react-i18next';
import ProfileAsideBar from '../components/ProfileAsideBar'
import '../css/Profile.css';
import { withRouter } from "react-router";
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SignUp.css';
import * as yup from 'yup';
import UserService from '../services/UserService'
import * as Constants from '../util/Constants'
import JsonService from '../services/JsonService'

class MyInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: UserService.isLogged(),
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        };
    }

    componentDidMount() {
        this.retrievePersonalInformation();
    }

    checkEmailAvailability(event) {
        UserService.checkEmailAvailability(event,this.props).then(function (status){
            if(status)
                document.getElementById("emailTakenError").style.display = "none"
            else
                document.getElementById("emailTakenError").style.display = "block"
        })
        return true;
    }

    retrievePersonalInformation() {
        let currentComponent = this;
    
        UserService.retrievePersonalInformation(this.props).then(function (data) {
            currentComponent.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
            })    
        })
        
    }

    updatePersonalInformation(values) {
        this.setState({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber
        })
    }

    handleFormSubmit(values,event,errors) {
        let currentComponent = this
        let val = values;
        event.preventDefault();
        
        if(Object.keys(errors).length === 0) {
            let names = ["firstName","lastName","email","phoneNumber"];
            let values = [val.firstName, val.lastName, val.email, val.phoneNumber]
            UserService.updateInformation(JsonService.createJSONArray(names,values),currentComponent.props).then(function(data){
                currentComponent.updatePersonalInformation(values);
                currentComponent.componentDidMount();
            })
        }
    }

    handlePasswordFormSubmit(values,event,errors) {
        let currentComponent = this
        let val = values;
        event.preventDefault();
        
        if(Object.keys(errors).length === 0) {
            let names = ["password","newpassword"];
            let values = [val.password, val.newpassword];
            UserService.updatePassword(JsonService.createJSONArray(names,values),currentComponent.props).then(function(){
                currentComponent.componentDidMount();
            })
        }
    }

    render(){
        const { t } = this.props;
        
        const personalInformationSchema = yup.object({
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
            phoneNumber: yup.string()
                                    .matches(Constants.numbersDashRegex, t('errors.numbersDashRegex'))
                                    .min(Constants.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
                                    .max(Constants.LONG_STRING_MAX_LENGTH, t('errors.lengthMax')),
        });

        const passwordSchema = yup.object({
            password: yup.string().required( t('errors.requiredField') )
                            .matches(Constants.simpleLettersAndNumbersRegex, t('errors.lettersAndNumbersRegex'))
                            .min(Constants.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.LONG_STRING_MAX_LENGTH_PASS, t('errors.lengthMax')),
            newpassword: yup.string().required( t('errors.requiredField') )
                            .matches(Constants.simpleLettersAndNumbersRegex, t('errors.lettersAndNumbersRegex'))
                            .min(Constants.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.LONG_STRING_MAX_LENGTH_PASS, t('errors.lengthMax')),
        })
        
        return(
            <div>
                <ProfileAsideBar t={t} active="MyInformation"/>
                <header>
                    <div className="Data">
                        
                        <div className="data polaroid">
                            <h2 className="title_container">{t('profile.titlePersonalData')}: {this.state.myPublicationsCounter}</h2> 
                            <div className="form">
                                <hr/>
                                <Formik
                                validationSchema={personalInformationSchema}
                                enableReinitialize={true}
                                initialValues={{firstName:this.state.firstName, lastName:this.state.lastName
                                , email:this.state.email, phoneNumber:this.state.phoneNumber}}
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
                                    <Form noValidate onSubmit={(event) => handleSubmit(event) || this.handleFormSubmit(values,event,errors)}>
                                        <Form.Group as={Col} md="8" controlId="validationFormik01">
                                            <Form.Label>{t('profile.firstName')}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                placeholder={t('profile.firstNameHolder')}
                                                value={values.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.firstName && touched.firstName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.firstName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="8" controlId="validationFormik02">
                                            <Form.Label>{t('profile.lastName')}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={t('profile.lastNameHolder')}
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
                                        <Form.Group as={Col} md="8" controlId="validationFormikUsername">
                                            <Form.Label>{t('profile.email')}</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                type="text"
                                                placeholder={t('profile.emailHolder')}
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
                                        <Form.Group as={Col} md="8" controlId="validationFormik05">
                                            <Form.Label>{t('profile.phoneNumber')}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={t('profile.phoneNumberHolder')}
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
                                        <Button type="submit" id="editdata-submit" disabled={isSubmitting} onClick={handleChange}>{t('profile.submit')}</Button>
                                    </Form>
                                )}
                                </Formik>
                            </div>
                        </div>

                        <div className="data polaroid last">
                            <h2 className="title_container">{t('profile.titleNewPassword')}: {this.state.myPublicationsCounter}</h2> 
                            <div className="form">
                                <hr/>
                                <Formik
                                validationSchema={passwordSchema}
                                initialValues={{password:"", newpassword:""}}
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
                                    <Form noValidate onSubmit={(event) => handleSubmit(event) || this.handlePasswordFormSubmit(values,event,errors)}>
                                        <Form.Group as={Col} md="8" controlId="validationFormik01">
                                            <Form.Label>{t('profile.password')}</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder={t('profile.passwordHolder')}
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                id="password"
                                                isInvalid={!!errors.password && touched.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="8" controlId="validationFormik02">
                                            <Form.Label>{t('profile.newpassword')}</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder={t('profile.newpasswordHolder')}
                                                name="newpassword"
                                                value={values.newpassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.newpassword && touched.newpassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.newpassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Button type="submit" id="editdata-submit" disabled={isSubmitting} onClick={handleChange}>{t('profile.submit')}</Button>
                                    </Form>
                                )}
                                </Formik>
                            </div>
                        </div>                

                    </div>
                </header>
            </div>
        );
    }

}

export default withRouter(withTranslation()(MyInformation));
