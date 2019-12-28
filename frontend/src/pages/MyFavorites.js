import React from 'react';
import { withTranslation } from 'react-i18next';
import ProfileAsideBar from '../components/ProfileAsideBar'
import '../css/Profile.css';
import { withRouter } from "react-router";
import UserService from '../services/UserService'


class MyFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myFavoritesCounter: 0
        };
      }
     

    componentDidMount(){
        let currentComponent = this;
        UserService.getMyFavoritesCount(1).then(function (quantity) {
            currentComponent.setState({
                myFavoritesCounter: quantity
            })
        })
    }
    

    render(){
        const { t } = this.props;
       
        return(
            <div>
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

export default withRouter(withTranslation()(MyFavorites));
