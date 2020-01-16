import React from 'react';
import { withTranslation } from 'react-i18next';
import AdminManagment from '../components/AdminManagment';
import Publication from '../components/Publication';
import ReactPaginate from 'react-paginate';
import { withRouter } from "react-router";
import PublicationService from '../services/PublicationService'
import * as Constants from '../util/Constants'
import ToastNotification from '../components/ToastNotification'

class AdminPublications extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            initialPage: this.getInitialPage(),
            pagesQuantity: 0,
            page: 0,
            publications: [],
            publicationIDToDelete: 0,
            resultsQuantity: 0,
            showModal: false
        };

        this.showModalErasePublication = this.showModalErasePublication.bind(this);
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
        queryParameters.locked = true;
        PublicationService.getPublications(queryParameters,this.props).then(function (response){
            currentComponent.pushPageParam(queryParameters.page + 1);
            currentComponent.setState({
                publications: response.data,
                resultsQuantity: response.headers["x-total-count"],
                pagesQuantity: Math.ceil(response.headers["x-total-count"] / Constants.PUBLICATIONS_PAGE_LIMIT),
                page: queryParameters.page
            })
        })
    }

    initializePublications(t){
        let pubComponents = [];
        for(let i = 0; i < this.state.publications.length; i++){
            alert(this.state.publications[i].publicationid)
            pubComponents.push(
                <Publication t={t} 
                    publication={this.state.publications[i]}
                    page="AdminPublications"
                    favourites={false}
                    eraseFunction={this.showModalErasePublication}
                />
            )
        }
        return pubComponents;
    }

    showModalErasePublication(publicationID){
        this.setState({
            showModal: true,
            publicationIDToDelete: publicationID
        })
    }

    erasePublication(publicationID){
        let currentComponent = this
        let data = {}
        PublicationService.erasePublication(publicationID,this.props).then(function (){
            currentComponent.setState({
                publications: [],
                showModal: false
            })
            if(Math.ceil((currentComponent.state.resultsQuantity - 1) / Constants.USERS_PAGE_LIMIT) < currentComponent.state.pagesQuantity
                && currentComponent.state.page === currentComponent.state.pagesQuantity - 1)
                data.selected = currentComponent.state.page - 1;
            else
                data.selected = currentComponent.state.page;
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
                <AdminManagment t={t} active={"AdminPublications"}/>
                <ToastNotification 
                    show={this.state.showModal}
                    title={t('modal.deletePublication')}
                    information={t('modal.deletePublicationDetail')}
                    checkModal={true}
                    acceptFunction={this.erasePublication}
                    functionParameter={this.state.publicationIDToDelete}
                />
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
                                forcePage={this.state.page}
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