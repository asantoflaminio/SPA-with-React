import React from 'react';
import { withTranslation } from 'react-i18next';
import UserNavbar from '../components/UserNavbar'
import ProfileAsideBar from '../components/ProfileAsideBar'
import ProfilePublication from '../components/ProfilePublication';
import * as axiosRequest from '../util/axiosRequest';
import ReactPaginate from 'react-paginate';
import { withRouter } from "react-router";


class MyPublications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            myPublicationsCounter: 0,
            myPublications: [],
            images: [],
            page: 1,
        };
      }
    

    updateQuantity(){
        let currentComponent = this;

        axiosRequest.getMyPublicationsQuantity(this.state.id).then(function (quantity) {
            currentComponent.setState({
                myPublicationsCounter: quantity,
            })
        })
    }

    updatePublications(){
        let currentComponent = this; 

        axiosRequest.getMyPublications(this.state.id, this.state.page).then(function(pubs) {
            currentComponent.setState({
                myPublications: pubs,
            })
            currentComponent.getImages();
        })
    }

    componentDidMount(){
        this.updateQuantity();
        this.updatePublications();
    }

    async getImages(){
        let imagesRequest = []
        for(let i = 0; i < this.state.myPublications.length ; i++){
            await axiosRequest.getImage(this.state.myPublications[i].publicationID, 0, this.props).then(function (image){
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
                            
                    </section>
            </div>
        );
    }

}

export default withRouter(withTranslation()(MyPublications));
