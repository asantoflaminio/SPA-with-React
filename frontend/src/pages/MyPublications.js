import React from 'react';
import { withTranslation } from 'react-i18next';
import ProfileAsideBar from '../components/ProfileAsideBar'
import ProfilePublication from '../components/ProfilePublication';
import { withRouter } from "react-router";
import UserService from '../services/UserService'
import PublicationService from '../services/PublicationService'
import JsonService from '../services/JsonService'


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
        let values = [this.state.id,this.state.page]
        UserService.getMyPublications(JsonService.createJSONArray(names,values),this.props).then(function(pubs) {
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
                            
                    </section>
            </div>
        );
    }

}

export default withRouter(withTranslation()(MyPublications));
