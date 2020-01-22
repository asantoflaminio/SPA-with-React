import React from 'react';
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import StandarNavbar from './StandarNavbar';
import UserNavbar from './UserNavbar';
import UserService from '../services/UserService'
import * as StatusCode from '../util/StatusCode'

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
            UserService.isAdmin().then(function (response){
                if(response.status === StatusCode.OK)
                    currentComponent.setState({ isLogged: true, isAdmin: true })
                else
                    currentComponent.setState({ isLogged: true, isAdmin: false })
            })
        }
    }
    
    componentDidUpdate(prevProps,prevState){
        let currentComponent = this
        let isLoggedUpdate = UserService.isLogged();
        if (this.state.isLogged !== isLoggedUpdate){
            if(isLoggedUpdate){
                UserService.isAdmin().then(function (response){
                    if(response.status === StatusCode.OK)
                        currentComponent.setState({ isLogged: true, isAdmin: true })
                    else
                        currentComponent.setState({ isLogged: true, isAdmin: false })
                })
            }else{
                currentComponent.setState({ isLogged: false, isAdmin: false })
            }
        }
    }


    render(){
        if(this.state.isLogged){
            return <UserNavbar rerenderParentCallback={this.rerenderParentCallback} isAdmin={this.state.isAdmin}/>
        }else{
            return <StandarNavbar rerenderParentCallback={this.rerenderParentCallback}/>
        }
    }

}

export default withRouter(withTranslation()(Navbar));