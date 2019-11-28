import React from 'react';
import '../css/Navbar.css';
import logo from '../resources/Logo4.png';
import {Link} from 'react-router-dom';
import { withTranslation, setDefaults } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import * as axiosRequest from '../util/axiosRequest'

class Navbar extends React.Component {

    constructor(props) {
         super(props);
         this.state = {

         };
       }

    showlogin(){
        let login = document.getElementById("sign-in");
        if(getComputedStyle(login, null).display === 'none')
            login.style.display = 'block'
        else
            login.style.display = 'none'
    }

    checkRememberMe(e){
        let checkbox = document.getElementById("rememberMe")
        if(e.target.value === 'false' || e.target.value === 'on')
            checkbox.value = true
        else
            checkbox.value = false
        
    }

    setDefault(){
        let checkbox = document.getElementById("rememberMe")
        if(checkbox.value === 'on')
            checkbox.value = 'false'
    }

    handleFormSubmit(event){
        event.preventDefault();
        this.setDefault()
        axiosRequest.login(event);
    }


    render(){
        const { t } = this.props;
        const schema = yup.object({
            email: yup.string().required( t('errors.requiredField') ).min( t('errors.shortMin') ),
            password: yup.string().required( t('errors.requiredField') ),
            rememberMe: yup.bool()
            });
        return(
                <nav>
                    <Link to={{pathname: "/"}}>
                    <a href="">
                        <img src={logo} alt="Home" id="logo"/>
                    </a>
                    </Link>
                    <div className="dropdown">
                        <a className="navbar_item" onClick={this.showlogin} href="#">{t('navbar.signIn')}</a>
                            <div className="dropdown-content-p dropdown-padding get-this" id="sign-in">
                                <Formik
                                    validationSchema={schema}
                                    >
                                    {({
                                        values,
                                        touched,
                                        errors,
                                    }) => (
                                    <Form noValidate onSubmit={event => {
                                            this.handleFormSubmit(event)
                                    }}>
                                        <Form.Group as={Col} md="12" controlId="validationFormik01">
                                            <Form.Label>{t('signUp.firstName')}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="email"
                                                placeholder={t('login.emailHolder')}
                                                value={values.email}
                                                id="email"
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="12" controlId="validationFormik02">
                                            <Form.Label>{t('login.password')}</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder={t('login.passwordHolder')}
                                                name="password"
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check
                                            name="rememberMe"
                                            label={t('login.rememberMe')}
                                            onClick={e => this.checkRememberMe(e)}
                                            id="rememberMe"
                                            />
                                        </Form.Group>
                                    <Button type="submit">{t('signUp.submit')}</Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                <div>
                    <Link to={{pathname: "/SignUp"}}>
                        <a className="navbar_item" id="sign_up" href="./SignUp">{t('navbar.signUp')}</a>
                    </Link>
                </div>
            </nav>
        )
    }

}

export default withTranslation()(Navbar);