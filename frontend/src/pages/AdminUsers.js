import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import AdminManagment from '../components/AdminManagment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import UserLoader from '../components/UserLoader';
import ReactPaginate from 'react-paginate';
import Switch from '@material-ui/core/Switch';
import UserService from '../services/UserService';
import ErrorService from '../services/ErrorService';
import * as Constants from '../util/Constants'
import * as StatusCode from '../util/StatusCode'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AdminUsers.css';
import '../css/Pagination.css';

class AdminUsers extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            initialPage: this.getInitialPage(),
            pagesQuantity: 0,
            usersList: [],
            resultsQuantity: 0,
            page: this.getInitialPage(),
            loading: false
        };
    }

    componentDidMount(){
        this.updateUsers(this.state.page)
    }

    updateUsers(page){
        let currentComponent = this;
        let queryParameters = {}

        queryParameters.page = parseInt(page);
        queryParameters.limit = Constants.USERS_PAGE_LIMIT
        this.setState({ loading: true })
        UserService.getUsers(queryParameters).then(function (response){
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.pushPageParam(queryParameters.page + 1);
            currentComponent.setState({
                usersList: response.data,
                resultsQuantity: response.headers["x-total-count"],
                pagesQuantity: Math.ceil(response.headers["x-total-count"] / Constants.USERS_PAGE_LIMIT),
                loading: false,
                page: queryParameters.page
            })
        })
    }


    lockUser(event,index){
        let currentComponent = this
        let queryParameters = {}
        queryParameters.lock = event.target.checked;
        let userid = event.target.id;
        let newList = this.state.usersList
        newList[index].locked = event.target.checked;
        UserService.lockUser(userid,queryParameters).then(function (response){
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({
                userList: newList,
            })
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
                <div key={users[i].email}>
                    <div className="row">
                        <div className="column">
                            <p className="user-email">{users[i].email}</p>
                        </div>
                        <div className="column">
                            <FormControlLabel
                                value="start"
                                control={<Switch color="primary" id={users[i].id.toString()}/>}
                                checked={users[i].locked}
                                onChange={(event) => this.lockUser(event,i)}
                                label={label}
                                labelPlacement="start"
                                className="switch"
                            />
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        }
        
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
        this.updateUsers(data.selected)
    }

    loadingContainers(){
        let pubComponents = [];
        for(let i = 0; i < Constants.USERS_PAGE_LIMIT; i++){
            pubComponents.push(
                <div className="loader-container-users" key={i + "-loader"}> 
                    <UserLoader/>
                </div>
            )
        }
        return pubComponents;
    }

    render(){
        const { t } = this.props;
        let tableUsers = [];
        let loadingUsers = this.loadingContainers()
        this.generateUsers(tableUsers,this.state.usersList, t);
        return(
            <div>
                <AdminManagment t={t} active={"AdminUsers"}/>
                <div>
                    <div className="polaroid data">
                        <div className="title-container">
                            <h3>{t('admin.users')}</h3>
                        </div>
                        {this.state.loading === true ?
                            <div className="loader-all-container">
                                {loadingUsers}
                            </div>
                        : 
                            <div id="users-list">
                                {tableUsers}
                            </div>
                        }
                        {this.state.usersList.length !== 0 ?
                        (<ReactPaginate
                            forcePage={this.state.page}
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
                        />) : null}
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(withTranslation()(AdminUsers));