import React from 'react';
import { withTranslation } from 'react-i18next';
import Navbar from '../components/Navbar'
import ProfileAsideBar from '../components/ProfileAsideBar'
import Publication from '../components/Publication';
import * as axiosRequest from '../util/axiosRequest';
import '../css/Profile.css';
import '../css/list.css';

class MyPublications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myPublicationsCounter: 0,
            publications: [],
            images: []
        };
      }
     

    updateQuantity(){
        let currentComponent = this;
        let id = 1;
        axiosRequest.getMyPublicationsCount(id).then(function (quantity) {
            currentComponent.setState({
                myPublicationsCounter: quantity,
            })
            
        })
    }
    

    updatePublications(){
        let currentComponent = this;
        let id = 1;

        axiosRequest.getMyPublications(id).then(function(pubs) {
            currentComponent.setState({
                publications: pubs,
            })
            currentComponent.getImages()
        })

    }

    async getImages(){
        let imagesRequest = []
        for(let i = 0; i < this.state.publications.length ; i++){
            await axiosRequest.getImage(this.state.publications[i].publicationID,0, this.props).then(function (image){
                imagesRequest.push(image);
            })
        }
        this.setState({
            images: imagesRequest
        })
    }

    componentDidMount(){
        this.updateQuantity();
        this.updatePublications();
    }

    initializePublications(t){
        let pubComponents = [];
      
        for(let i = 0; i < this.state.publications.length; i++){
            pubComponents.push(
                <Publication t={t} publication={this.state.publications[i]} 
                    image={this.state.images[i]}></Publication>
            )
        }
        return pubComponents;
    }

    render(){
        const { t } = this.props;
        let publications = this.initializePublications(t);
        
        return(
            <div>
                <Navbar t={t} />
                <ProfileAsideBar t={t} />
                <header>
                    <div className="Publications">
                        <h2 className="title_section">{t('mypublications.title_section')}: {this.state.myPublicationsCounter}</h2> 
                    </div>
                    <section id="publications">
                            <div>
                                {publications}
                            </div>
                    </section>
                </header>

            </div>
        );
    }

}

export default withTranslation()(MyPublications);
