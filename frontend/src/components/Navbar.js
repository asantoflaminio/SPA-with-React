import React from 'react';
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import StandarNavbar from './StandarNavbar';
import UserNavbar from './UserNavbar';
import AdminNavbar from './AdminNavbar';
import UserService from '../services/UserService'
import AdminService from '../services/AdminService'

class Navbar extends React.Component {

    constructor(props) {
         super(props);
         this.state = {
            isLogged: UserService.isLogged(),
            isAdmin: AdminService.isAdmin()
         };
         this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
       }

    rerenderParentCallback() {
        this.setState({
            isLogged: UserService.isLogged(),
            isAdmin: AdminService.isAdmin()
        })
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