import React from 'react';
import {withTranslation} from 'react-i18next';
import {withRouter} from 'react-router';
import {Form, Button, Col} from 'react-bootstrap';
import {Formik} from 'formik';
import ColoredLinearProgress from '../components/ColoredLinearProgress';
import toast from 'toasted-notes';
import ErrorService from '../services/ErrorService';
import UserService from '../services/UserService';
import * as yup from 'yup';
import * as Constants from '../util/Constants';
import * as StatusCode from '../util/StatusCode';
import 'toasted-notes/src/styles.css';
import '../css/ForgottenPassword.css';

class ForgottenPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	handleFormSubmit(event, errors) {
		let currentComponent = this;
		const {t} = this.props;
		event.preventDefault();
		event.persist();
		let email = event.target[0].value;

		if (Object.keys(errors).length === 0) {
			this.setState({loading: true});
			UserService.checkEmail(email).then(function(response) {
				if (response.status === StatusCode.OK) {
					UserService.forgottenPasswordEmail(email).then(function(response) {
						if (response.status !== StatusCode.CREATED) {
							ErrorService.logError(currentComponent.props, response);
							return;
						}
						toast.notify(t('forgottenPassword.emailSent'));
						currentComponent.setState({
							loading: false,
						});
						currentComponent.props.history.push('/home');
					});
				} else if (response.status === StatusCode.NOT_FOUND) {
					currentComponent.setState({
						loading: false,
					});
					toast.notify(t('forgottenPassword.emailNotSent'));
				} else {
					ErrorService.logError(currentComponent.props, response);
				}
			});
		}
	}

	render() {
		const {t} = this.props;
		const schema = yup.object({
			email: yup
				.string()
				.required(t('errors.requiredField'))
				.matches(Constants.emailRegex, t('errors.emailRegex'))
				.min(Constants.SHORT_STRING_MIN_LENGTH, t('errors.lengthMin'))
				.max(Constants.EMAIL_MAX_LENGTH, t('errors.lengthMax')),
		});
		return (
			<div>
				{this.state.loading ? <ColoredLinearProgress /> : null}
				<div id='forgotten-container'>
					<h1 id='forgotten-title'>{t('forgottenPassword.title')}</h1>
					<p id='forgotten-message'>{t('forgottenPassword.message')}</p>
					<Formik
						validationSchema={schema}
						initialValues={{email: ''}}
						onSubmit={(values, {setSubmitting, resetForm}) => {
							setSubmitting(true);
							resetForm();
							setSubmitting(false);
						}}>
						{({values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
							<Form
								noValidate
								onSubmit={(event) => {
									handleSubmit(event) || this.handleFormSubmit(event, errors);
								}}>
								<Form.Group as={Col} md='6'>
									<Form.Label>{t('navbar.mail')}</Form.Label>
									<Form.Control
										type='text'
										name='email'
										placeholder={t('navbar.mailHolder')}
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										isInvalid={!!errors.email && touched.email}
									/>
									<Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
								</Form.Group>
								<Button id='forgottenButton' disabled={isSubmitting} type='submit' onClick={handleChange}>
									{t('forgottenPassword.send')}
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		);
	}
}

export default withRouter(withTranslation()(ForgottenPassword));
