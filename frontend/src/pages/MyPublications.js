import React from 'react';
import { withTranslation } from 'react-i18next';
import Navbar from '../components/Navbar'
import ProfileAsideBar from '../components/ProfileAsideBar'
import * as axiosRequest from '../util/axiosRequest';
import '../css/Profile.css';


class MyPublications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myPublicationsCounter: 0
        };
      }
     

    componentDidMount(){
        let currentComponent = this;
        axiosRequest.getMyPublicationsCount(1).then(function (quantity) {
            currentComponent.setState({
                myPublicationsCounter: quantity
            })
        })
    }
    

    render(){
        const { t } = this.props;
       
        return(
            <div>
                <Navbar t={t} />
                <ProfileAsideBar t={t} />
                <header>
                    <div className="Publications">
                        <h2 className="title_section">{t('mypublications.title_section')}: {this.state.myPublicationsCounter}</h2> 
                    </div>
                </header>
            </div>
        );
    }

}

export default withTranslation()(MyPublications);
