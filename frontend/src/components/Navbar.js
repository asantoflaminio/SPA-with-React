import React from 'react';
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
            isLogged: UserService.isLogin(),
            isAdmin: AdminService.isAdmin()
         };
       }


    render(){
        if(this.state.isLogged){
            if(this.state.isAdmin)
                return <AdminNavbar/>
            else
                return <UserNavbar/>
        }else{
            return <StandarNavbar/>
        }
    }

}

export default withTranslation()(Navbar);