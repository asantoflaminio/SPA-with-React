import React from 'react';
import { withTranslation } from 'react-i18next';
import ProfileAsideBar from '../components/ProfileAsideBar'
import UserService from '../services/UserService'
import '../css/Profile.css';
import { withRouter } from "react-router";


class MyInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
      }
     

    componentDidMount(){
        let currentComponent = this;
        
    }
    

    render(){
        const { t } = this.props;
       
        return(
            <div>
                <ProfileAsideBar t={t} />
                <header>
                   
                </header>
            </div>
        );
    }

}

export default withRouter(withTranslation()(MyInformation));
