import React from 'react';
import { withTranslation } from 'react-i18next';
import ProfileAsideBar from '../components/ProfileAsideBar'
import ProfilePublication from '../components/ProfilePublication';
import { withRouter } from "react-router";
import UserService from '../services/UserService'
import PublicationService from '../services/PublicationService'
import JsonService from '../services/JsonService'
import ReactPaginate from 'react-paginate';


class MyPublications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            myPublicationsCounter: 0,
            myPublications: [],
            images: [],
            page: 1,
            pageQuantity: 0,
        };
      }
    

    updateQuantity(){
        let currentComponent = this;
        let names = ["id"]
        let values = [this.state.id]
        UserService.getMyPublicationsQuantity(JsonService.createJSONArray(names,values),this.props).then(function (quantity) {
            currentComponent.setState({
                myPublicationsCounter: quantity,
            })
        })
    }

    updatePublications(){
        let currentComponent = this; 
        let names = ["id","page"]
        let values = [this.state.id, this.state.page]
        UserService.getMyPublication(JsonService.createJSONArray(names,values),this.props).then(function(pubs) {
            currentComponent.setState({
                myPublications: pubs,
                page: 1
            })
            currentComponent.getImages();
            currentComponent.updatePublicationsQuantity();
        })
    }

    updatePublicationsQuantity(){
        let currentComponent = this
        let names = ["id"]
        let values = [this.state.id]
        
        UserService.getMyPublicationsCount(JsonService.createJSONArray(names,values),this.props).then(function(data){
            // alert(data.count);
            // alert(data.limit);
            currentComponent.setState({
                pagesQuantity: Math.ceil(data.count / data.limit),
            })
        })

        
    }

    handlePageClick = data => {
        let currentComponent = this
        alert(this.state.page);

        let names = ["id","page"]
        let values = [this.state.id, this.state.page]
        UserService.getMyPublications(JsonService.createJSONArray(names,values),this.props).then(function (pubs){
            currentComponent.setState({
                publications: pubs,
                page: data.selected + 1
            })
            currentComponent.getImages()
        })
        alert(this.state.page);

    }

    componentDidMount(){
        this.updateQuantity();
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

    initializePublications(t){
        let pubComponents = [];
        
        for(let i = 0; i < this.state.myPublications.length; i++){
            pubComponents.push(
                <ProfilePublication t={t} publication={this.state.myPublications[i]} 
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
