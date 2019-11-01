import React from 'react';
import { withTranslation } from 'react-i18next';
import AdminManagment from '../components/AdminManagment';
import Navbar from '../components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AdminUsers.css';
import '../css/Pagination.css';
import * as axiosRequest from '../util/axiosRequest'
import ReactPaginate from 'react-paginate';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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

    lockUser(event,index){
        let status = event.target.checked;
        let newList = this.state.usersList
        newList[index].locked = !event.target.checked;
        axiosRequest.lockUser(status,event.target.id)
        this.setState({
            userList: newList
        })
    }

    generateUsers(tableUsers,users,t){
        let label;
        for(let i = 0; i < users.length; i++){
            if(users[i].locked)
                label = t('admin.locked')
            else
                label = t('admin.unlocked')
            tableUsers.push(
                <hr></hr>
            )
            tableUsers.push(
                <div class="row">
                    <div class="column">
                        <p class="user-email">{users[i].email}</p>
                    </div>
                    <div class="column">
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" id={users[i].id}/>}
                            checked={!users[i].locked}
                            onChange={(event) => this.lockUser(event,i)}
                            label={label}
                            labelPlacement="start"
                            className="switch"
                        />
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
    asd(){
        let users = document.getElementById("users-list");
        while(users.firstChild){
            users.removeChild(users.firstChild)
        }
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