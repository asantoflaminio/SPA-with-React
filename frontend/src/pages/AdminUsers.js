import React from 'react';
import { withTranslation } from 'react-i18next';
import AdminManagment from '../components/AdminManagment';
import Navbar from '../components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AdminUsers.css';
import * as axiosRequest from '../util/axiosRequest'

class AdminUsers extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
             usersList: []
        };
    }

    componentDidMount(){
        let currentComponent = this
        axiosRequest.getUsers().then(function (users){
            currentComponent.setState({
                usersList: users
            })
            alert("Done")
        })
      }

    generateUsers(tableUsers,users,t){
        alert(users)
        for(let i = 0; i < users.length; i++)
            tableUsers.push(
                <div>
                    <div class="user-list-left">
                        {tableUsers}
                    </div>
                    <div class="user-list-right">
                        <label class="switch">
                            <input type="checkbox" checked/>
                            <span class="slider round">{t('admin.unlocked')}</span>
                        </label>	       				
                        <p class="user-status"></p>				
                    </div>
                </div>
            )
    }

    render(){
        const { t } = this.props;
        let tableUsers = [];
        this.generateUsers(tableUsers,this.state.usersList, t);
        return(
            <div>
                <Navbar t={t} />
                <AdminManagment t={t}/>
                <div>
                    <div class="polaroid data" id="users">
                        <div class="title-container">
                            <h3>{t('admin.users')}</h3>
                        </div>
                        <div class="user-list">
                            {tableUsers}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withTranslation()(AdminUsers);