import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import ProfileAsideBar from '../components/ProfileAsideBar'
import Publication from '../components/Publication'
import UserService from '../services/UserService'
import ReactPaginate from 'react-paginate';
import * as Constants from '../util/Constants'
import LocalStorageService from '../services/LocalStorageService';
import ToastNotification from '../components/ToastNotification'
import * as StatusCode from '../util/StatusCode'
import ErrorService from '../services/ErrorService';
import PublicationLoader from '../components/PublicationLoader'
import NoPublication from '../components/NoPublications';


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
            showModal: false,
            loadingPublications: false,
        };
        this.setReady = this.setReady.bind(this)
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
        userid = LocalStorageService.getUserid();
        this.setState({loadingPublications: true})
        LocalStorageService.deleteCounter();
        LocalStorageService.initializeCounter()
        UserService.getMyFavoritesPublications(userid,queryParameters).then(function(response) {
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
            if(response.headers["x-total-count"] === "0")
                currentComponent.setState({loadingPublications: false})
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
                    faveable={true}
                    editable={false}
                    ready={this.setReady}
                    />
            )
        }

        if(this.state.myFavorites.length === 0) {
            pubComponents.push(
                <NoPublication //TODO: AGREGAR KEYS
                    t={t}
                    page="MyFavorites"
                    />
            )
        }
        
        return pubComponents;
    }

    setReady(){
        if(LocalStorageService.getCounter() === this.state.myFavorites.length){
            LocalStorageService.deleteCounter()
            this.setState({loadingPublications: false})
        }    
    }

    loadingContainers(){
        let pubComponents = [];
        for(let i = 0; i < Constants.PUBLICATIONS_PAGE_LIMIT; i++){
            pubComponents.push(
                <div className="loader-container" key={i + "-loader"}> 
                    <PublicationLoader/>
                </div>
            )
        }
        return pubComponents;
    }

    render(){
        const { t } = this.props;
        let favorites = this.initializePublications(t);  
        let loadingPublications = this.loadingContainers()
        return(
            <div>
                <ProfileAsideBar t={t} active="MyFavourites"/>
                <ToastNotification 
                    show={this.state.showModal}
                    title={t('modal.deletePublication')}
                    information={t('modal.deletePublicationDetail')}
                    checkModal={true}
                    acceptFunction={this.erasePublication}
                    functionParameter={this.state.publicationIDToDelete}
                />
                {this.state.myFavorites.length !== 0 ? 
                <div className="Favorites">
                    <h2 className="title_section">{t('myfavorites.title_section')}: {this.state.myFavoritesCounter}</h2> 
                </div> : null}
                {this.state.loadingPublications === true ?
                                <div className="loader-all-container">
                                    {loadingPublications}
                                </div>
                        : null}
                <section className="section_publications">
                            <div className={this.state.loadingPublications === true ? "hidden":null}>
                                {favorites}
                            </div>
                            {this.state.myFavorites.length !== 0 ?
                            (<div class="pubsPagination">
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
                            </div>) : null}
                    </section>
            </div>
        );
    }

}

export default withRouter(withTranslation()(MyFavorites));
