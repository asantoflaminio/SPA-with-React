import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/NewPassword.css';
import { withRouter } from "react-router";
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ValidationConst from '../util/ValidationConst';
import UserService from '../services/UserService';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import * as statusCode from '../util/StatusCode'

class NewPassword extends React.Component {

    handleFormSubmit(event){
        let currentComponent = this;
        const { t } = this.props;
        event.preventDefault();
        UserService.createNewPassword(event, this.props).then(function(status) {
            if(status === statusCode.OK) {
                toast.notify(t('newPassword.passwordUpdated'));  
                currentComponent.props.history.push("/home");
            } else {
                toast.notify(t('newPassword.passwordNotUpdated')); 
                alert(status); 
            }  
        })     
    }





    render(){
        const { t } = this.props;
        const schema = yup.object({
            newPassword1: yup.string().required( t('errors.requiredField') )
                            .matches(ValidationConst.simpleLettersAndNumbersRegex, t('errors.lettersAndNumbersRegex'))
                            .min(ValidationConst.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
                            .max(ValidationConst.LONG_STRING_MAX_LENGTH_PASS, t('errors.lengthMax')),
            newPassword2: yup.string().oneOf([yup.ref('newPassword1'), null], t('errors.passwordMatch')),
            token: yup.string()
            });
            return ( 
                <div>
                    <div id="newpassword-container">
                        <h1 id="newpassword-title">{t('newPassword.title')}</h1>				
                        <p id="newpassword-message">{t('newPassword.message')}</p>
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
                                            <Form.Label>{t('signUp.password')}</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder={t('signUp.passwordHolder')}
                                                name="newPassword1"
                                                value={values.newPassword1}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.newPassword1 && touched.newPassword1}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.newPassword1}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationFormik02">
                                            <Form.Label>{t('signUp.repeatPassword')}</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder={t('signUp.passwordHolder')}
                                                name="newPassword2"
                                                value={values.newPassword2}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.newPassword2 && touched.newPassword2}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.newPassword2}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" bsPrefix="hidden" controlId="validationFormik03">
                                            <Form.Label bsPrefix="contact-title">{t('details.message')}</Form.Label>
                                            <Form.Control
                                                as="input"
                                                placeholder={t('details.messagePlaceholder')}
                                                name="token"
                                                onChange={handleChange}
                                                value={this.props.match.params.token}
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                    <Button id="newPasswordButton" type="submit">{t('newPassword.send')}</Button>
                                    </Form>
                                )}
                            </Formik>
                    </div>
                </div>
            );     
    }

}

export default withRouter(withTranslation()(NewPassword));