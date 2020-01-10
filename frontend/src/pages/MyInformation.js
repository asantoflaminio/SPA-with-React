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
import * as ValidationConst from '../util/ValidationConst'
import JsonService from '../services/JsonService'
import LocalStorageService from '../services/LocalStorageService'

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

    // signOut(){
    //     let currentPath = this.props.location;
    //     LocalStorageService.clearToken()
    //     this.props.history.push(currentPath)
    // }

    componentDidMount() {
        this.retrievePersonalInformation();
    }

    checkEmailAvaiability(event) {
        UserService.checkEmailAvaibility(event,this.props).then(function (status){
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
            //let oldemail = val.email;
            UserService.updateInformation(JsonService.createJSONArray(names,values),currentComponent.props).then(function(data){
                // if(currentComponent.state.email !== (oldemail)) {
                //     currentComponent.signOut();
                //     let names1 = ["email","password"];
                //     let values1 = [data.email, data.password]
                //     //faltaria la parte de desencriptar
                //     UserService.login(JsonService.createJSONArray(names1,values1),currentComponent.props).then(function (){
                //         currentComponent.setState({
                //             isLogged: true
                //         })
                //     })
                // }
                currentComponent.updatePersonalInformation(values);
                currentComponent.componentDidMount();
            })
        }
    }

    render(){
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
            phoneNumber: yup.string()
                                    .matches(ValidationConst.numbersDashRegex, t('errors.numbersDashRegex'))
                                    .min(ValidationConst.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
                                    .max(ValidationConst.LONG_STRING_MAX_LENGTH, t('errors.lengthMax')),
        });
        
        return(
            <div>
                <ProfileAsideBar t={t} />
                <header>
                    <div className="Data">
                        
                        <div className="data polaroid">
                            <h2 className="title_container">{t('profile.titlePersonalData')}: {this.state.myPublicationsCounter}</h2> 
                            <div className="form">
                                <hr/>
                                <Formik
                                validationSchema={schema}
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
                                                onBlur={(event) => this.checkEmailAvaiability(event,errors) && handleBlur(event)}
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
                                                placeholder={t('profile.phonenumberHolder')}
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
                                validationSchema={schema}
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
                                    <Form noValidate onSubmit={(event) => handleSubmit(event) || this.handleFormSubmit(values,event,errors)}>
                                        <Form.Group as={Col} md="8" controlId="validationFormik01">
                                            <Form.Label>{t('profile.password')}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="password"
                                                placeholder={t('profile.passwordHolder')}
                                                value={values.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                id="password"
                                                isInvalid={!!errors.firstName && touched.firstName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.firstName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="8" controlId="validationFormik02">
                                            <Form.Label>{t('profile.newpassword')}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={t('profile.newpasswordHolder')}
                                                name="newpassword"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.lastName && touched.lastName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.lastName}
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
