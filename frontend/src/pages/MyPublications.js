import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import ProfileAsideBar from '../components/ProfileAsideBar'
import ProfilePublication from '../components/ProfilePublication';
import UserService from '../services/UserService'
import PublicationService from '../services/PublicationService'
import JsonService from '../services/JsonService'
import ReactPaginate from 'react-paginate';
import * as Constants from '../util/Constants'
import LocalStorageService from '../services/LocalStorageService';


class MyPublications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myPublicationsCounter: 0,
            myPublications: [],
            images: [],
            page: 0,
            pageQuantity: 0,
        };
      }

      componentDidMount(){
        this.updatePublications();
    }

    async getImages(){
        let imagesRequest = []
        for(let i = 0; i < this.state.myPublications.length ; i++){
            let names = ["publicationID","index"]
            let values = [this.state.myPublications[i].publicationID,0]
            await PublicationService.getImage(JsonService.createJSONArray(names,values), this.props).then(function (image){
                imagesRequest.push(image);
            })
        }
        this.setState({
            images: imagesRequest
        })
    }

    updatePublications(){
        let currentComponent = this; 
        let queryParameters = {}
        let userid;
        queryParameters.page = this.state.page;
        queryParameters.limit = Constants.PUBLICATIONS_PAGE_LIMIT
        userid = LocalStorageService.getUserid();
        UserService.getMyPublications(userid,queryParameters,this.props).then(function(response) {
            currentComponent.setState({
                myPublications: response.data,
                page: 0,
                pagesQuantity: Math.ceil(response.headers["x-total-count"] / Constants.USERS_PAGE_LIMIT),
                myPublicationsCounter: response.headers["x-total-count"]

            })
        })
    }

    handlePageClick = data => {
        let currentComponent = this
        let names = ["page"]
        let values = [data.selected + 1]
        UserService.getMyPublications(JsonService.createJSONArray(names,values),this.props).then(function (pubs){
            currentComponent.setState({
                myPublications: pubs,
                page: data.selected+1,
            })
            currentComponent.getImages()
        })

    }


    initializePublications(t){
        let pubComponents = [];
        
        for(let i = 0; i < this.state.myPublications.length; i++){
            pubComponents.push(
                <ProfilePublication t={t} publication={this.state.myPublications[i]} 
                    image={this.state.images[i]} pubprops={this.props}></ProfilePublication>
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
                    <div className="Publications">
                        <h2 className="title_section">{t('mypublications.title_section')}: {this.state.myPublicationsCounter}</h2> 
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

export default withRouter(withTranslation()(MyPublications));
