import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import ProfileAsideBar from '../components/ProfileAsideBar'
import ProfilePublication from '../components/ProfilePublication';
import UserService from '../services/UserService'
import PublicationService from '../services/PublicationService'
import JsonService from '../services/JsonService'
import ReactPaginate from 'react-paginate';


class MyFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            myFavoritesCounter: 0,
            myFavouritesPublications: [],
            images: [],
            page: 1,
            pageQuantity: 0,
        };
      }

      componentDidMount(){
        this.updateFavoritesQuantity();
        this.updateFavoritesPublications();
    }

    async getImages(){
        let imagesRequest = []
        for(let i = 0; i < this.state.myFavouritesPublications.length ; i++){
            let names = ["publicationID","index"]
            let values = [this.state.myFavouritesPublications[i].publicationID,0]
            await PublicationService.getImage(JsonService.createJSONArray(names,values), this.props).then(function (image){
                imagesRequest.push(image);
            })
        }
        this.setState({
            images: imagesRequest
        })
    }
    

    updateFavoritesQuantity(){
        let currentComponent = this;
        let names = ["id"]
        let values = [this.state.id]
        UserService.getMyFavoritesQuantity(JsonService.createJSONArray(names,values),this.props).then(function (quantity) {
            currentComponent.setState({
                myFavoritesCounter: quantity,
            })
        })
    }

    updateFavoritesPublications(){
        let currentComponent = this; 
        let names = ["id","page"]
        let values = [this.state.id, this.state.page]
        
        UserService.getMyFavoritesPublications(JsonService.createJSONArray(names,values),this.props).then(function(pubs) {
            currentComponent.setState({
                myFavouritesPublications: pubs,
                page: 1
            })
            currentComponent.getImages();
            currentComponent.updateFavoritesPublicationsQuantity();
        })
    }

    updateFavoritesPublicationsQuantity(){
        let currentComponent = this
        let names = ["id"]
        let values = [this.state.id]
        
        UserService.getMyFavoritesPublicationsCount(JsonService.createJSONArray(names,values),this.props).then(function(data){
            currentComponent.setState({
                pagesQuantity: Math.ceil(data.count / data.limit),
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
            currentComponent.getImages()
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
