import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/ForgottenPassword.css';
import { withRouter } from "react-router";

class ForgottenPassword extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        const { t } = this.props;
            return ( 
                <div>
                    <div id="forgotten-container">
                         <h1 id="forgotten-title">{t('forgottenPassword.title')}</h1>				
                          <p id="forgotten-message">{t('forgottenPassword.message')}</p>
                      </div>
                    <div id="link2-container">
                    <a href="/" id="link">{t('forgottenPassword.send')}</a>
                    </div>  
                </div>
            );     
    }

}

export default withRouter(withTranslation()(ForgottenPassword));