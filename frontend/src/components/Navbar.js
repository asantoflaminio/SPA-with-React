import React from 'react';
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import StandarNavbar from './StandarNavbar';
import UserNavbar from './UserNavbar';
import UserService from '../services/UserService'

class Navbar extends React.Component {

    constructor(props) {
         super(props);
         this.state = {
            isLogged: false,
            isAdmin: false
         };
       }

    componentDidMount(){
        let currentComponent = this
        if(UserService.isLogged()){
            if(UserService.isAdmin())
                currentComponent.setState({ isLogged: true, isAdmin: true })
            else
                currentComponent.setState({ isLogged: true, isAdmin: false })
        }
    }
    
    componentDidUpdate(prevProps,prevState){
        let currentComponent = this
        let isLoggedUpdate = UserService.isLogged();
        if (this.state.isLogged !== isLoggedUpdate){
            if(isLoggedUpdate){
                if(UserService.isAdmin())
                    currentComponent.setState({ isLogged: true, isAdmin: true })
                else
                    currentComponent.setState({ isLogged: true, isAdmin: false })
            }else{
                currentComponent.setState({ isLogged: false, isAdmin: false })
            }
        }
    }


    render(){
        if(this.state.isLogged){
            return <UserNavbar username={this.props.updatedUsername} isAdmin={this.state.isAdmin}/>
        }else{
            return <StandarNavbar/>
        }
    }

}

export default withRouter(withTranslation()(Navbar));