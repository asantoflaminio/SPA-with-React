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
import * as StatusCode from '../util/StatusCode'
import JsonService from '../services/JsonService'
import LocalStorageService from '../services/LocalStorageService';
import ErrorService from '../services/ErrorService';
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

class MyInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: UserService.isLogged(),
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            userEmailValid: false,
        };
    }

    componentDidMount() {
        let currentComponent = this;
        let userid = LocalStorageService.getUserid();
        UserService.getUser(userid).then(function (response) {
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                phoneNumber: response.data.phoneNumber,
            })    
        })
    }

    checkEmail(event){
        let currentComponent = this;
        let email = event.target.value;
       
        if(email === this.state.email) {
            currentComponent.setState({userEmailValid: true});
        } else {
            UserService.checkEmail(email).then(function (response){
                if(response.status === StatusCode.OK){
                    currentComponent.setState({userEmailValid: false});
                    document.getElementById("emailTakenError").style.display = "block"
                } else if(response.status === StatusCode.NOT_FOUND || response.status === StatusCode.BAD_REQUEST) {
                    currentComponent.setState({userEmailValid: true});
                    document.getElementById("emailTakenError").style.display = "none"
                } else {
                    ErrorService.logError(this.props,response)
                }
            })
        }
        return true;
    }

    updateState(event) {
        this.setState({
            firstName: event.target[0].value,
            lastName: event.target[1].value,
            email: event.target[2].value,
            phoneNumber: event.target[3].value,
        })
    }

    handleFormSubmit(event,errors) {
        event.preventDefault();
        const { t } = this.props;
        let currentComponent = this;
        let userDTO = JsonService.getJSONParsed(event.target);
        let userid = LocalStorageService.getUserid();

        this.updateState(event);

        if(Object.keys(errors).length === 0 && this.state.userEmailValid) {
            UserService.editUser(userid,userDTO).then(function(response){
                if(response.status !== StatusCode.OK){
                    ErrorService.logError(currentComponent.props,response)
                }
                toast.notify(t('profile.succesfullSubmitInfo'));  
                LocalStorageService.refreshToken(response.headers.authorization, userDTO.email);
            })
        } 
    }

    handlePasswordFormSubmit(event,errors) {
        event.preventDefault();
        let { t } = this.props;
        let currentComponent = this
        let userDTO = {}
        userDTO.currentPassword = event.target[0].value
        userDTO.password = event.target[1].value
        let userid = LocalStorageService.getUserid()
        
        if(Object.keys(errors).length === 0) {
            UserService.editUser(userid,userDTO).then(function(response){
                if(response.status !== StatusCode.OK){
                    ErrorService.logError(currentComponent.props,response)
                }
                toast.notify(t('profile.succesfullSubmitPass'));  
            })
        }
    }

    reInitializeForm(){
        let schema = {}
        schema.firstName = this.state.firstName;
        schema.lastName = this.state.lastName;
        schema.email = this.state.email;
        schema.phoneNumber = this.state.phoneNumber
        return schema;
    }

    render(){
        const { t } = this.props;
        let initialSchema = this.reInitializeForm();

        
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
                            <h2 className="title_container">{t('profile.titlePersonalData')} {this.state.myPublicationsCounter}</h2> 
                            <div className="form">
                                <hr/>
                                <Formik
                                validationSchema={personalInformationSchema}
                                enableReinitialize={true}
                                initialValues={initialSchema}
                                onSubmit={(values, {setSubmitting, resetForm}) => {
                                    setSubmitting(true)
                                    resetForm()
                                    setSubmitting(false)
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
                                                <Form.Control
                                                type="text"
                                                placeholder={t('profile.emailHolder')}
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={(event) => this.checkEmail(event,errors) && handleBlur(event)}
                                                isInvalid={!!errors.email && touched.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                                </Form.Control.Feedback>
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
                            <h2 className="title_container">{t('profile.titleNewPassword')} {this.state.myPublicationsCounter}</h2> 
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
                                    <Form noValidate onSubmit={(event) => handleSubmit(event) || this.handlePasswordFormSubmit(event,errors)}>
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
