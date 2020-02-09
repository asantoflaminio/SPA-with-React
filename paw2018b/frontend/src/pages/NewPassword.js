import React from 'react';
import {withTranslation} from 'react-i18next';
import '../css/NewPassword.css';
import {withRouter} from 'react-router';
import {Form, Button, Col} from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import * as Constants from '../util/Constants';
import UserService from '../services/UserService';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import * as StatusCode from '../util/StatusCode';
import ColoredLinearProgress from '../components/ColoredLinearProgress';
import ErrorService from '../services/ErrorService';

class NewPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	handleFormSubmit(event, errors) {
		event.preventDefault();
		const {t} = this.props;
		let currentComponent = this;
		let resetPasswordDTO = {};
		resetPasswordDTO.newPassword = event.target[0].value;
		resetPasswordDTO.token = this.props.match.params.token;
		if (Object.keys(errors).length === 0) {
			this.setState({loading: true});
			UserService.resetPassword(resetPasswordDTO).then(function(response) {
				if (response.status === StatusCode.OK) {
					toast.notify(t('newPassword.passwordUpdated'));
					currentComponent.props.history.push('/home');
				} else if (response.status === StatusCode.UNAUTHORIZED) {
					toast.notify(t('newPassword.passwordNotUpdated'));
				} else {
					ErrorService.logError(currentComponent.props, response);
					return;
				}
				currentComponent.setState({
					loading: false,
				});
			});
		}
	}

	render() {
		const {t} = this.props;
		const schema = yup.object({
			newPassword: yup
				.string()
				.required(t('errors.requiredField'))
				.matches(Constants.simpleLettersAndNumbersRegex, t('errors.lettersAndNumbersRegex'))
				.min(Constants.LONG_STRING_MIN_LENGTH, t('errors.lengthMin'))
				.max(Constants.LONG_STRING_MAX_LENGTH_PASS, t('errors.lengthMax')),
			repeatPassword: yup
				.string()
				.required(t('errors.requiredField'))
				.oneOf([yup.ref('newPassword'), null], t('errors.passwordMatch')),
		});
		return (
			<div>
				{this.state.loading ? <ColoredLinearProgress /> : null}
				<div id='newpassword-container'>
					<h1 id='newpassword-title'>{t('newPassword.title')}</h1>
					<p id='newpassword-message'>{t('newPassword.message')}</p>
					<Formik
						validationSchema={schema}
						initialValues={{newPassword: '', repeatPassword: ''}}
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
								<Form.Group as={Col} md='6' controlId='validationFormik01'>
									<Form.Label>{t('signUp.password')}</Form.Label>
									<Form.Control
										type='password'
										placeholder={t('signUp.passwordHolder')}
										name='newPassword'
										value={values.newPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										isInvalid={!!errors.newPassword && touched.newPassword}
									/>
									<Form.Control.Feedback type='invalid'>{errors.newPassword}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md='6' controlId='validationFormik02'>
									<Form.Label>{t('signUp.repeatPassword')}</Form.Label>
									<Form.Control
										type='password'
										placeholder={t('signUp.passwordHolder')}
										name='repeatPassword'
										value={values.repeatPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										isInvalid={!!errors.repeatPassword && touched.repeatPassword}
									/>
									<Form.Control.Feedback type='invalid'>{errors.repeatPassword}</Form.Control.Feedback>
								</Form.Group>
								<Button id='newPasswordButton' disabled={isSubmitting} type='submit' onClick={handleChange}>
									{t('newPassword.send')}
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		);
	}
}

export default withRouter(withTranslation()(NewPassword));
