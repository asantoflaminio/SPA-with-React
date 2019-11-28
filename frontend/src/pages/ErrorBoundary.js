

import React from 'react';
import { withTranslation } from 'react-i18next';
import Navbar from '../components/Navbar'
import '../css/ErrorBoundary.css';

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            coding: null
         };
    }

    render(){
        const { t } = this.props;
            var codeMsg = t('errors.errorCode') + this.state.coding;
            return ( 
                <div>
                    <Navbar t={t} />
                    <div id="error-container">
                         <h1 id="error-title">{t('errors.errorTitle')}</h1>			
                         <p id="error-status">{codeMsg}</p>		
                          <p id="error-message">{t('errors.errorMessage')}</p>
                      </div>
                    <div id="link1-container">
                        <a href="%" id="error-link1">{t('errors.errorBack')}</a>
                    </div>
                    <div id="link2-container">
                    <a href="%" id="error-link1">{t('errors.errorBackHome')}</a>
                    </div>  
                </div>
            );     
    }

}

export default withTranslation()(ErrorBoundary);