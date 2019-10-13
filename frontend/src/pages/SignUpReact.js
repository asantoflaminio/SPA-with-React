import React from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import '../css/SignUp.css';

class SignUpReact extends React.Component {

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      email: event.target[2].value,
      password: event.target[3].value,
      repeatPassword: event.target[4].value,
      phoneNumber: event.target[5].value
    }

    var postData = JSON.stringify(data)
    alert(postData)
    
    axios({
      method: 'post',
      url: 'users/signUp',
      data: data
    })
    .then(function (response) {
      alert(response.status);
    })
    .catch(function (error) {
      alert(error);
    });
  }

  render(){
      const { t } = this.props;

      return(
        <div className="box_form">
        <ValidatorForm
            onSubmit={this.handleSubmit}
        >
          <div>
            <label>{t('signUp.firstName')}</label>
            <br/>
            <TextValidator
                placeholder={t('signUp.firstNameHolder')}
                onChange={this.handleChange}
                name="firstName"
                type="text"
                validators={['required']}
                errorMessages={['this field is required']}
                value=""
            />
          </div>
          <br/>
          <div>
            <label>{t('signUp.lastName')}</label>
            <br/>
            <TextValidator
                placeholder={t('signUp.lastNameHolder')}
                onChange={this.handleChange}
                name="lastName"
                type="text"
                validators={['required']}
                errorMessages={['this field is required']}
                value=""
            />
          </div>
          <br/>
          <div>
            <label>{t('signUp.email')}</label>
            <br/>
            <TextValidator
                placeholder={t('signUp.emailHolder')}
                onChange={this.handleChange}
                name="email"
                type="email"
                validators={['required']}
                errorMessages={['this field is required']}
                value=""
            />
          </div>
          <br/>
          <div>
            <label>{t('signUp.password')}</label>
            <br/>
            <TextValidator
                placeholder={t('signUp.passwordHolder')}
                onChange={this.handleChange}
                name="password"
                type="password"
                validators={['required']}
                errorMessages={['this field is required']}
                value=""
            />
          </div>
          <br/>
          <div>
            <label>{t('signUp.repeatPassword')}</label>
            <br/>
            <TextValidator
                placeholder={t('signUp.passwordHolder')}
                onChange={this.handleChange}
                name="repeatPassword"
                type="password"
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                value=""
            />
          </div>
          <br/>
          <div>
            <label>{t('signUp.phoneNumber')}</label>
            <br/>
            <TextValidator
                placeholder={t('signUp.phoneNumberHolder')}
                onChange={this.handleChange}
                name="phoneNumber"
                type="text"
                value=""
            />
          </div>
          <br/>
            <Button type="submit">Submit</Button>
        </ValidatorForm>
    </div>
    );
  }

}

export default withTranslation()(SignUpReact);