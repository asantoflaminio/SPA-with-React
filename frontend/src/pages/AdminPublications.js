import React from 'react';
import { withTranslation } from 'react-i18next';
import AdminManagment from '../components/AdminManagment';
import Publication from '../components/Publication';
import ReactPaginate from 'react-paginate';
import { withRouter } from "react-router";
import PublicationService from '../services/PublicationService'
import JsonService from '../services/JsonService'
import * as Constants from '../util/Constants'

class AdminPublications extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            initialPage: this.getInitialPage(),
            pagesQuantity: 0,
            page: 0,
            publications: [],
            resultsQuantity: 0
        };

        this.erasePublication = this.erasePublication.bind(this);
    }


    handlePageClick = data => {
        this.updatePublications(data.selected)
    }

    updatePublications(page){
        let currentComponent = this
        let queryParameters = {}
        queryParameters.page = parseInt(page)
        queryParameters.limit = Constants.PUBLICATIONS_PAGE_LIMIT
        PublicationService.getPublications(queryParameters,this.props).then(function (response){
            currentComponent.pushPageParam(queryParameters.page + 1);
            currentComponent.setState({
                publications: response.data,
                resultsQuantity: response.headers["x-total-count"],
                pagesQuantity: Math.ceil(response.headers["x-total-count"] / Constants.USERS_PAGE_LIMIT),
                page: queryParameters.page
            })
        })
    }

    initializePublications(t){
        let pubComponents = [];
        for(let i = 0; i < this.state.publications.length; i++){
            pubComponents.push(
                <Publication t={t} 
                    publication={this.state.publications[i]}
                    page="AdminPublications"
                    favourites={false}
                    eraseFunction={this.erasePublication}
                />
            )
        }
        return pubComponents;
    }

    

    erasePublication(publicationID){
        let currentComponent = this
        let data = {}
        PublicationService.erasePublication(publicationID,this.props).then(function (){
            /*
            if(Math.ceil(currentComponent.state.resultsQuantity / Constants.USERS_PAGE_LIMIT) < currentComponent.state.pagesQuantity)
                data.selected = currentComponent.state.page - 1;
            else
                data.selected = currentComponent.state.page;*/
                //El error esta x aca al refreshear las publicaciones
            currentComponent.handlePageClick(data)

        })
    }

    getInitialPage(){
        const params = new URLSearchParams(this.props.location.search); 
        const queryPageParam = params.get('page');
        return parseInt(queryPageParam) - 1 || 0;
    }

    pushPageParam(page){
        this.props.history.push({
            path: '/AdminPublications',
            search: '?page=' + page
        })
    }

    render(){
        const { t } = this.props;
        let publications = this.initializePublications(t)
        return(
            <div>
                <AdminManagment t={t}/>
                <div class="polaroid data">
                    <div class="title-container">
                        <h3>{t('admin.publications')}</h3>
                    </div>
                    <div>
                        {publications}
                    </div>
                    <div class="pubsPagination">
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
                                containerClassName={'container-pagination separation'}
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



export default withRouter(withTranslation()(AdminPublications));