import React from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';

class SignUp extends React.Component {



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
    
    
    
    
    /*
    fetch('users/signUp', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: postData,
    }).then(response => {
      alert("Response!")
      if (response.status >= 200 && response.status < 300) {
          alert("Succesful post!");
        } else {
          alert("Unsuccesful post! -- response code: " + response.status);
        }
  })*/
  }



    render(){
      const { t } = this.props;
        return (
            <div>
              <div style={formSignUp}>
                  <div>
                    <h3 style={title}>{t('signUp.registry')}</h3>
                    <hr></hr>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div style={itemForm}>
                      <label style={label}>{t('signUp.firstName')}</label><br/>
                      <input style={input} placeholder={t('signUp.firstNameHolder')} id="firstName" name="firstName"/><br/>
                    </div>
                    <div style={itemForm}>
                      <label style={label}>{t('signUp.lastName')}</label><br/>
                      <input style={input} placeholder={t('signUp.lastNameHolder')} id="lastName" name="lastName"/><br/>
                    </div>
                    <div style={itemForm}>
                      <label style={label}>{t('signUp.email')}</label><br/>
                      <input style={input} placeholder={t('signUp.emailHolder')} id="email" name="email"/><br/>
                    </div>
                    <div style={itemForm}>
                      <label style={label}>{t('signUp.password')}</label><br/>
                      <input style={input} placeholder={t('signUp.passwordHolder')} id="password" name="password"/><br/>
                    </div>
                    <div style={itemForm}>
                      <label style={label}>{t('signUp.repeatPassword')}</label><br/>
                      <input style={input} placeholder={t('signUp.passwordHolder')} id="repeatPassword" name="repeatPassword"/><br/>
                    </div>
                    <div style={itemForm}>
                      <label style={label}>{t('signUp.phoneNumber')}</label><br/>
                      <input style={input} placeholder={t('signUp.phoneNumber')} id="phoneNumber" name="phoneNumber"/><br/>
                    </div>
                    <button style={submit}>{t('signUp.submit')}</button>
                  </form>
              </div>
            </div>
          );
    }
}

const formSignUp = {
  marginTop: "10px",
  float: "left",
  marginLeft: "5%",
  width: "25%",
  height: "auto",
  minWidth: "200px",
  backgroundColor: "white",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  marginBottom: "50px",
}

const title = {
  marginTop: "15px !important",
	textAlign: "center",
	fontSize: "18px !important",
  color: "#82817f",
}

const label = {
  marginLeft: "5%",
  color: "#82817f",
}

const itemForm = {
  marginTop: "5px",
}

const input = {
  width: "90%",
  height: "35px",
  padding: "12px 20px",
  marginTop: "2px",
  marginLeft: "20px",
  display: "inline-block",
  border: "1px solid",
  borderColor: "#aaa",
  borderRadius: "2px",
  boxSizing: "border-box",
  color: "#888",
}

const submit = {
    width: "20%",
    backgroundColor: "#FD8907",
    color: "white",
    padding: "14px 20px",
    margin: "8px 8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    float: "right",
};

export default withTranslation()(SignUp);