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
        this.setReady = this.setReady.bind(this);
        this.removeFavoritePublication = this.removeFavoritePublication.bind(this);
        this.showModalErasePublication = this.showModalErasePublication.bind(this);
    }

    componentDidMount() {
        this.updatePublications(this.state.page);
    }

    handlePageClick = data => {
        this.updatePublications(data.selected)
    }

    updatePublications(page){
        let currentComponent = this; 
        let queryParameters = {}
        let userid = LocalStorageService.getUserid();
        queryParameters.page = parseInt(page);
        queryParameters.limit = Constants.PUBLICATIONS_PAGE_LIMIT;
        queryParameters.locked = true;
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


    initializePublications(){
        let pubComponents = [];
        const { t } = this.props;

        for(let i = 0; i < this.state.myFavorites.length; i++){
            pubComponents.push(
                <Publication t={t} 
                    publication={this.state.myFavorites[i]}  
                    page="MyFavorites"
                    favourites={false}
                    faveable={true}
                    editable={false}
                    eraseFunction={this.showModalErasePublication}
                    ready={this.setReady}
                    index={i}
                    />
            )
        }

        if(this.state.myFavorites.length === 0) {
             //TODO: AGREGAR KEYS
            pubComponents.push(
                <div>
                    <p>{t('myfavorites.noPublications')}</p>
                </div>
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

    removeFavoritePublication(publicationID){
        console.log("aca");
        console.log(publicationID);
        let currentComponent = this
        let data = {}
        let userid = LocalStorageService.getUserid();

        UserService.removeFavourite(userid, publicationID).then(function (response){
            if(response.status !== StatusCode.NO_CONTENT){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({
                myFavorites: [],
                showModal: false
            })
            
            
            if(currentComponent.state.myFavoritesCounter === 1 && 
                Math.ceil((currentComponent.state.myFavoritesCounter - 1) / Constants.PUBLICATIONS_PAGE_LIMIT) < currentComponent.state.pagesQuantity
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
            path: '/MyFavorites',
            search: '?page=' + page
        })
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
        let favorites = this.initializePublications();  
        let loadingPublications = this.loadingContainers()
        return(
            <div>
                <ProfileAsideBar t={t} active="MyFavourites"/>
                <ToastNotification 
                    show={this.state.showModal}
                    title={t('modal.unfavPublication')}
                    information={t('modal.unfavPublicationDetail')}
                    checkModal={true}
                    acceptFunction={this.removeFavoritePublication}
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
                            (<div className="pubsPagination">
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
