import React from 'react';
import { withTranslation } from 'react-i18next';
import Navbar from '../components/Navbar'
import ProfileAsideBar from '../components/ProfileAsideBar'
import * as axiosRequest from '../util/axiosRequest';
import '../css/Profile.css';


class MyFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myFavoritesCounter: null
        };
      }
     

    componentDidMount(){
        let currentComponent = this;
        axiosRequest.getMyFavoritesCount(1).then(function (quantity) {
            currentComponent.setState({
                myFavoritesCounter: quantity
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
                    <div className="Favorites">
                        <h2 className="title_section">{t('myfavorites.title_section')}: {this.state.myFavoritesCounter}</h2> 
                    </div>
                </header>
            </div>
        );
    }

}

export default withTranslation()(MyFavorites);
