import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import ProfileAsideBar from '../components/ProfileAsideBar'
import ProfilePublication from '../components/ProfilePublication';
import UserService from '../services/UserService'
import JsonService from '../services/JsonService'
import ReactPaginate from 'react-paginate';
import * as Constants from '../util/Constants'
import LocalStorageService from '../services/LocalStorageService';


class MyFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            myFavoritesCounter: 0,
            myFavouritesPublications: [],
            images: [],
            page: 0,
            pageQuantity: 0,
        };
      }

      componentDidMount(){
        this.updateFavoritesPublications();
    }
    

    updateFavoritesPublications(){
        let currentComponent = this
        let userid;
        let queryParameters = {}
        queryParameters.page = this.state.page;
        queryParameters.limit = Constants.PUBLICATIONS_PAGE_LIMIT
        userid = LocalStorageService.getUserid();
        UserService.getMyFavoritesPublications(userid,queryParameters,this.props).then(function(response) {
            currentComponent.setState({
                myFavouritesPublications: response.data,
                page: 0,
                pagesQuantity: Math.ceil(response.headers["x-total-count"] / Constants.USERS_PAGE_LIMIT),
                myFavoritesCounter: response.headers["x-total-count"]
            })
        })
    }

    handlePageClick = data => {
        let currentComponent = this
        let names = ["id","page"]
        let values = [this.state.id, data.selected + 1]
        UserService.getMyFavoritesPublications(JsonService.createJSONArray(names,values),this.props).then(function (pubs){
            currentComponent.setState({
                myFavouritesPublications: pubs,
                page: data.selected+1,
            })
        })

    }


    initializePublications(t){
        let pubComponents = [];
        
        for(let i = 0; i < this.state.myFavouritesPublications.length; i++){
            pubComponents.push(
                <ProfilePublication t={t} publication={this.state.myFavouritesPublications[i]} 
                    image={this.state.images[i]}></ProfilePublication>
            )
        }
        
        return pubComponents;
    }

    

    render(){
        const { t } = this.props;
        let publications = this.initializePublications(t);  
      
        return(
            <div>
                <ProfileAsideBar t={t} />
                <header>
                    <div className="Favorites">
                        <h2 className="title_section">{t('myfavorites.title_section')}: {this.state.myFavoritesCounter}</h2> 
                    </div>
                </header>
                <section className="section_publications">
                            <div>
                                {publications}
                            </div>
                            <div class="pubsPagination">
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
                                containerClassName={'container-pagination separation'}
                                pageClassName={''}
                                previousClassName={''}
                                nextClassName={''}
                                forcePage={this.state.page - 1}
                            />
                            </div>
                    </section>
            </div>
        );
    }

}

export default withRouter(withTranslation()(MyFavorites));
