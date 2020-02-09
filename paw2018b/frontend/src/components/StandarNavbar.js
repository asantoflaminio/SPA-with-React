import React from 'react';
import {withRouter} from 'react-router';
import '../css/Navbar.css';
import logo from '../resources/Logo4.png';
import {Link} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Form, Button, Col} from 'react-bootstrap';
import UserService from '../services/UserService';
import LocalStorageService from '../services/LocalStorageService';
import ErrorService from '../services/ErrorService';
import * as StatusCode from '../util/StatusCode';

class StandarNavbar extends React.Component {
	showlogin(close) {
		let login = document.getElementById('sign-in');
		if (getComputedStyle(login, null).display === 'none' && close !== true) login.style.display = 'block';
		else login.style.display = 'none';
	}

	handleLoginForm(event) {
		event.preventDefault();
		let currentComponent = this;
		let currentPath = this.props.location;
		let loginDTO = {};
		loginDTO.email = event.target[0].value;
		loginDTO.password = event.target[1].value;
		UserService.login(loginDTO).then(function(response) {
			if (response.status === StatusCode.OK) {
				LocalStorageService.setToken(
					response.headers.authorization,
					response.headers.authorities,
					response.headers.username,
					response.headers['user-id'],
				);
				document.getElementById('errorLogin').style.display = 'none';

				currentComponent.props.history.push('/SignUp');
				currentComponent.props.history.push(currentPath);
				currentComponent.props.updateUsername(loginDTO.email);
			} else if (response.status === StatusCode.UNAUTHORIZED) {
				document.getElementById('errorLogin').style.display = 'block';
			} else {
				ErrorService.logError(currentComponent.props, response);
			}
		});
	}

	render() {
		const {t} = this.props;
		const schema = yup.object({
			email: yup.string().required(t('errors.requiredField')),
			password: yup.string().required(t('errors.requiredField')),
		});
		return (
			<nav>
				<Link to={{pathname: '/'}}>
					<img src={logo} alt='Home' id='logo' />
				</Link>
				<div className='dropdown'>
					<button className='navbar_item' onClick={this.showlogin}>
						{t('navbar.signIn')}
					</button>
					<div className='dropdown-content-p dropdown-padding get-this' id='sign-in'>
						<Formik validationSchema={schema}>
							{({values, errors}) => (
								<Form
									noValidate
									onSubmit={(event) => {
										this.handleLoginForm(event);
									}}>
									<Form.Group as={Col} md='12'>
										<Form.Label>{t('navbar.mail')}</Form.Label>
										<Form.Control
											type='text'
											name='email'
											placeholder={t('navbar.mailHolder')}
											value={values.email}
											id='email'
											isInvalid={!!errors.email}
										/>
										<Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
									</Form.Group>
									<Form.Group as={Col} md='12'>
										<Form.Label>{t('navbar.password')}</Form.Label>
										<Form.Control
											type='password'
											placeholder={t('navbar.passHolder')}
											name='password'
											id='password'
											isInvalid={!!errors.password}
										/>
										<Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
									</Form.Group>
									<p id='errorLogin' className='errorText'>
										{t('errors.errorLogin')}
									</p>
									<Button type='submit' id='dropdown-submit-btn'>
										{t('signUp.submit')}
									</Button>
								</Form>
							)}
						</Formik>
						<Link to={{pathname: '/ForgottenPassword'}}>
							<p id='recover_pass' className='recover_pass_dropdown' onClick={this.showlogin}>
								{t('navbar.recoverPass')}
							</p>
						</Link>
					</div>
				</div>
				<div>
					<Link to={{pathname: '/SignUp'}}>
						<button className='navbar_item' id='sign_up' onClick={() => this.showlogin(true)}>
							{t('navbar.signUp')}
						</button>
					</Link>
				</div>
			</nav>
		);
	}
}

export default withRouter(withTranslation()(StandarNavbar));
