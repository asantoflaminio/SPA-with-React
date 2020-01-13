import React from 'react';
import { withTranslation } from 'react-i18next';
import AdminManagment from '../components/AdminManagment';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AdminUsers.css';
import '../css/Pagination.css';
import ReactPaginate from 'react-paginate';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from "react-router";
import AdminService from '../services/AdminService'
import * as Constants from '../util/Constants'

class AdminUsers extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            initialPage: this.getInitialPage(),
            pagesQuantity: 0,
            usersList: [],
            resultsQuantity: 0
        };
    }


    lockUser(event,index){
        let status = event.target.checked;
        let newList = this.state.usersList
        newList[index].locked = !event.target.checked;
        AdminService.lockUser(status,event.target.id)
        this.setState({
            userList: newList,
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

    getInitialPage(){
        const params = new URLSearchParams(this.props.location.search); 
        const queryPageParam = params.get('page');
        return parseInt(queryPageParam) - 1 || 0;
    }

    pushPageParam(page){
        this.props.history.push({
            path: '/AdminUsers',
            search: '?page=' + page
        })
    }



    handlePageClick = data => {
        let currentComponent = this;
        let queryParameters = {}

        queryParameters.page = parseInt(data.selected);
        queryParameters.limit = Constants.USERS_PAGE_LIMIT
        AdminService.getUsers(queryParameters, this.props).then(function (response){
            currentComponent.pushPageParam(queryParameters.page + 1);
            currentComponent.setState({
                usersList: response.data,
                resultsQuantity: response.headers["x-total-count"],
                pagesQuantity: Math.ceil(response.headers["x-total-count"] / Constants.USERS_PAGE_LIMIT)
            })
        })
    }

    render(){
        const { t } = this.props;
        let tableUsers = [];
        this.generateUsers(tableUsers,this.state.usersList, t);
        return(
            <div>
                <AdminManagment t={t} active={"AdminUsers"}/>
                <div>
                    <div class="polaroid data">
                        <div class="title-container">
                            <h3>{t('admin.users')}</h3>
                        </div>
                        <div id="users-list">
                        {tableUsers}
                        </div>
                        <ReactPaginate
                            initialPage={this.state.initialPage}
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

export default withRouter(withTranslation()(AdminUsers));