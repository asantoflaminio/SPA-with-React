import React from 'react';
import { withTranslation } from 'react-i18next';
import AdminManagment from '../components/AdminManagment';
import Navbar from '../components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AdminUsers.css';
import '../css/Pagination.css';
import * as axiosRequest from '../util/axiosRequest'
import ReactPaginate from 'react-paginate';


class AdminUsers extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
             usersList: [],
             pagesQuantity: 0
        };
    }

    componentDidMount(){
        let currentComponent = this
        axiosRequest.getUsers(1).then(function (users){
            currentComponent.setState({
                usersList: users
            })
        })
        axiosRequest.getUsersCount().then(function (data){
            currentComponent.setState({
                pagesQuantity: Math.ceil(data.count / data.limit)
            })
        })
      }

    lockUser(event,t){
        let label = document.getElementById(event.target.getAttribute("labelID"));
        let status = event.target.checked;
        if(event.target.checked){
            event.target.checked = true;
            event.target.value = "ON"
            label.innerText = t('admin.unlocked')
            
        }else{
            event.target.checked = false;
            event.target.value = "OFF"
            label.innerText = t('admin.locked')
        }
        axiosRequest.lockUser(status,event.target.id)
    }

    generateUsers(tableUsers,users,t){
        let input;
        let label;
        let labelID;
        for(let i = 0; i < users.length; i++){
            labelID = users[i].id + "-label";
            if(users[i].locked){
                input = <input type="checkbox" labelID={labelID} id={users[i].id} onClick={(event) => this.lockUser(event,t)}/> 
                label = <p class="user-status" id={labelID}>{t('admin.locked')}</p>
            }else{
                input = <input type="checkBox" labelID={labelID} id={users[i].id} onClick={(event) => this.lockUser(event,t)} checked="false"/>
                label = <p class="user-status" id={labelID}>{t('admin.unlocked')}</p>
            }   
            tableUsers.push(
                <hr></hr>
            )
            tableUsers.push(
                <div class="row">
                    <div class="column">
                        <p class="user-email">{users[i].email}</p>
                    </div>
                    <div class="column">
                        <label class="switch">
                            {input}
                            <span class="slider round"/>
                        </label>
                        {label}			
                     </div>
                </div>
            )
        }
        tableUsers.push(
            <hr></hr>
        )
        
    }

    handlePageClick = data => {
        let selected = data.selected + 1;
        let currentComponent = this
        axiosRequest.getUsers(selected).then(function (users){
            currentComponent.setState({
                usersList: users
            })
        })
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
                    <div class="polaroid data">
                        <div class="title-container">
                            <h3>{t('admin.users')}</h3>
                        </div>
                        <div id="users-list">
                        {tableUsers}
                        </div>
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            pageCount={this.state.pagesQuantity}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={this.handlePageClick}
                            activeClassName={'active'}
                            breakClassName={''}
                            containerClassName={'container-pagination'}
                            pageClassName={''}
                            previousClassName={''}
                            nextClassName={''}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default withTranslation()(AdminUsers);