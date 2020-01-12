import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/ForgottenPassword.css';
import { withRouter } from "react-router";
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ValidationConst from '../util/ValidationConst';
import UserService from '../services/UserService';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import * as statusCode from '../util/StatusCode'

class ForgottenPassword extends React.Component {

    handleFormSubmit(event){
        let currentComponent = this;
        const { t } = this.props;
        event.preventDefault();
        event.persist();
        UserService.isAccount(event, this.props).then(function(status) {
            if(status === statusCode.OK) {
                UserService.forgottenPasswordEmail(event, currentComponent.props).then(function (status){
                   toast.notify(t('forgottenPassword.emailSent'));  
                   currentComponent.props.history.push("/home")
                 }) 
            } else {
               toast.notify(t('forgottenPassword.emailNotSent'));
            }  
        })     
    }





    render(){
        const { t } = this.props;
        const schema = yup.object({
            email: yup.string().required( t('errors.requiredField') ).matches(ValidationConst.emailRegex, t('errors.emailRegex'))
            .min(ValidationConst.SHORT_STRING_MIN_LENGTH, t('errors.lengthMin'))
            .max(ValidationConst.EMAIL_MAX_LENGTH, t('errors.lengthMax')),
            });
            return ( 
                <div>
                    <div id="forgotten-container">
                        <h1 id="forgotten-title">{t('forgottenPassword.title')}</h1>				
                        <p id="forgotten-message">{t('forgottenPassword.message')}</p>
                        <Formik
                                    validationSchema={schema}
                                    >
                                    {({
                                        values,
                                        touched,
                                        errors,
                                        handleChange,
                                        handleBlur
                                    }) => (
                                    <Form noValidate onSubmit={event => {
                                            this.handleFormSubmit(event)
                                    }}>
                                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                                            <Form.Label>{t('navbar.mail')}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="email"
                                                placeholder={t('navbar.mailHolder')}
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                id="email"
                                                isInvalid={!!errors.email && touched.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    <Button id="forgottenButton" type="submit">{t('forgottenPassword.send')}</Button>
                                    </Form>
                                )}
                            </Formik>
                    </div>
                </div>
            );     
    }

}

export default withRouter(withTranslation()(ForgottenPassword));