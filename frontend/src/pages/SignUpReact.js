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
      return(
        <div className="box_form">
        <ValidatorForm
            onSubmit={this.handleSubmit}
        >
            <TextValidator
                placeholder="Password..."
                onChange={this.handleChange}
                name="password"
                type="password"
                validators={['required']}
                errorMessages={['this field is required']}
                value=""
            />
            <br/>
            <TextValidator
                label="Repeat password"
                className="example"
                onChange={this.handleChange}
                name="repeatPassword"
                type="password"
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                value=""
            />
            <Button type="submit">Submit</Button>
        </ValidatorForm>
    </div>
    );
  }

}

export default withTranslation()(SignUpReact);