import React from 'react';
import { withTranslation } from 'react-i18next';
import Navbar from '../components/Navbar'
import ProfileAsideBar from '../components/ProfileAsideBar'
import * as axiosRequest from '../util/axiosRequest';
import '../css/Profile.css';


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

export default withTranslation()(MyInformation);
