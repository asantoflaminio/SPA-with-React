import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/ForgottenPassword.css';
import { withRouter } from "react-router";
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Constants from '../util/Constants';
import UserService from '../services/UserService';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import * as StatusCode from '../util/StatusCode';
import ColoredLinearProgress from '../components/ColoredLinearProgress';

class ForgottenPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    handleFormSubmit(event){
        let currentComponent = this;
        const { t } = this.props;
        event.preventDefault();
        event.persist();

        this.setState({
            loading: true
          });

        UserService.checkEmail(event, this.props).then(function(response) {
            if(response.status === StatusCode.OK) {
                UserService.forgottenPasswordEmail(event, currentComponent.props).then(function (response){
                   toast.notify(t('forgottenPassword.emailSent'));  
                   currentComponent.setState({
                    loading: false
                    });  
                   currentComponent.props.history.push("/home")
                 }) 
            } else {
                currentComponent.setState({
                    loading: false
                });  
               toast.notify(t('forgottenPassword.emailNotSent'));
            }
            
        })     
    }





    render(){
        const { t } = this.props;
        const schema = yup.object({
            email: yup.string().required( t('errors.requiredField') ).matches(Constants.emailRegex, t('errors.emailRegex'))
            .min(Constants.SHORT_STRING_MIN_LENGTH, t('errors.lengthMin'))
            .max(Constants.EMAIL_MAX_LENGTH, t('errors.lengthMax')),
            });
            return ( 
                <div>
                    {this.state.loading ? <ColoredLinearProgress /> : null}
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