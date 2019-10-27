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
        axiosRequest.getUsers().then(function (users){
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

    generateUsers(tableUsers,users,t){
        for(let i = 0; i < users.length; i++){
            var inputClause;
            if(users[i].locked){

            }
            tableUsers.push(
                <hr></hr>
            )
            tableUsers.push(
                <div class="row">
                    <div class="column">
                        {users[i].email}
                    </div>
                    <div class="column">
                        <label class="switch">
                            <input type="checkbox" checked/>
                            <span class="slider round"/>
                        </label>
                        <p class="user-status">{t('admin.unlocked')}</p>			
                     </div>
                </div>
            )
            
        }
    }

    render(){
        const { t } = this.props;
        let tableUsers = [];
        let pagination = [];
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
                        {tableUsers}
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={8}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            activeClassName={'active'}
                            breakClassName={''}
                            containerClassName={'container-pagination'}
                            pageClassName={'container-page'}
                            previousClassName={'container-previous'}
                            nextClassName={'container-next'}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default withTranslation()(AdminUsers);