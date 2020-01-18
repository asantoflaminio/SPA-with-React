import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import ProfileAsideBar from '../components/ProfileAsideBar'
import Publication from '../components/Publication'
import UserService from '../services/UserService'
import PublicationService from '../services/PublicationService'
import ReactPaginate from 'react-paginate';
import * as Constants from '../util/Constants'
import LocalStorageService from '../services/LocalStorageService';
import ToastNotification from '../components/ToastNotification'
import * as StatusCode from '../util/StatusCode'
import ErrorService from '../services/ErrorService';



class MyFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPage: this.getInitialPage(),
            myFavoritesCounter: 0,
            myFavorites: [],
            publicationIDToDelete: 0,
            page: 0,
            pagesQuantity: 0,
            showModal: false
        };

        this.showModalErasePublication = this.showModalErasePublication.bind(this);
        this.erasePublication = this.erasePublication.bind(this);
    }

    componentDidMount() {
        this.updatePublications(this.state.page);
    }

    getInitialPage(){
        const params = new URLSearchParams(this.props.location.search); 
        const queryPageParam = params.get('page');
        return parseInt(queryPageParam) - 1 || 0;
    }

    pushPageParam(page){
        this.props.history.push({
            path: '/MyFavorites',
            search: '?page=' + page
        })
    }

    handlePageClick = data => {
        this.updatePublications(data.selected)
    }

    updatePublications(page){
        let currentComponent = this; 
        let queryParameters = {}
        let userid;
        queryParameters.page = parseInt(page);
        queryParameters.limit = Constants.PUBLICATIONS_PAGE_LIMIT
        queryParameters.locked = true;
        userid = LocalStorageService.getUserid();
        UserService.getMyFavoritesPublications(userid,queryParameters,this.props).then(function(response) {
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({
                myFavorites: response.data,
                page: queryParameters.page,
                pagesQuantity: Math.ceil(response.headers["x-total-count"] / Constants.PUBLICATIONS_PAGE_LIMIT),
                myFavoritesCounter: response.headers["x-total-count"]
            })
            currentComponent.pushPageParam(queryParameters.page + 1);
        })
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
        PublicationService.erasePublication(publicationID,this.props).then(function (response){
            if(response.status !== StatusCode.NO_CONTENT){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({
                myFavorites: [],
                showModal: false
            })
            if(Math.ceil((currentComponent.state.resultsQuantity - 1) / Constants.PUBLICATIONS_PAGE_LIMIT) < currentComponent.state.pagesQuantity
                && currentComponent.state.page === currentComponent.state.pagesQuantity - 1)
                data.selected = currentComponent.state.page - 1;
            else
                data.selected = currentComponent.state.page;
            currentComponent.handlePageClick(data)
        })
    }


    initializePublications(t){
        let pubComponents = [];
        
        for(let i = 0; i < this.state.myFavorites.length; i++){
            pubComponents.push(
                <Publication t={t} 
                    publication={this.state.myFavorites[i]}  
                    page="MyFavorites"
                    favourites={false}
                    editable={false}
                    eraseFunction={this.showModalErasePublication}/>
            )
        }
        
        return pubComponents;
    }

    render(){
        const { t } = this.props;
        let favorites = this.initializePublications(t);  
      
        return(
            <div>
                <ProfileAsideBar t={t} />
                <ToastNotification 
                    show={this.state.showModal}
                    title={t('modal.deletePublication')}
                    information={t('modal.deletePublicationDetail')}
                    checkModal={true}
                    acceptFunction={this.erasePublication}
                    functionParameter={this.state.publicationIDToDelete}
                />
                <div className="Favorites">
                    <h2 className="title_section">{t('myfavorites.title_section')}: {this.state.myFavoritesCounter}</h2> 
                </div>
                <section className="section_publications">
                            <div>
                                {favorites}
                            </div>
                            <div class="pubsPagination">
                                <ReactPaginate
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
                    </section>
            </div>
        );
    }

}

export default withRouter(withTranslation()(MyFavorites));
