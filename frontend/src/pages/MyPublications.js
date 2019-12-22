import React from 'react';
import { withTranslation } from 'react-i18next';
import Navbar from '../components/Navbar'
import ProfileAsideBar from '../components/ProfileAsideBar'
import ProfilePublication from '../components/ProfilePublication';
import * as axiosRequest from '../util/axiosRequest';
import ReactPaginate from 'react-paginate';
import { withRouter } from "react-router";


class MyPublications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.getID(),
            myPublicationsCounter: 0,
            publications: [],
            images: [],
            page: 1,
            pageQuantity: 0,
            
        };
      }
     
      componentDidMount(){
        this.updateQuantity();
        this.updatePublications();
    }

    updateQuantity(){
        let currentComponent = this;

        axiosRequest.getMyPublicationsQuantity(this.state.id).then(function (quantity) {
            currentComponent.setState({
                myPublicationsCounter: quantity,
            })
        })
    }

    getID(){
        return 1; //cambiar dsp
    }
    

    updatePublications(){
        let currentComponent = this; 
        let pubinfo = this.generateParamPackage();

        axiosRequest.getMyPublications(pubinfo).then(function(pubs) {
            currentComponent.setState({
                publications: pubs,
            })
            currentComponent.getImages()
            currentComponent.updatePublicationsQuantity()
        })

    }

    updatePublicationsQuantity(){
        let currentComponent = this
        let id = this.state.id;

        axiosRequest.getMyPublicationsCount(id).then(function (data){
            currentComponent.setState({
                pagesQuantity: Math.ceil(data.count / data.limit),
            })
        })
    }

    generateParamPackage() {
        const param = {
            id: this.state.id,
            page: this.state.page,
        }
        return param;
    }

    handlePageClick = data => {
        let currentComponent = this
        let pubinfo = this.generateParamPackage();
        
        axiosRequest.getMyPublications(pubinfo).then(function (pubs){
            currentComponent.setState({
                publications: pubs,
                page: data.selected + 1
            })
            currentComponent.getImages()
        })
    }

    async getImages(){
        let imagesRequest = []
        for(let i = 0; i < this.state.publications.length ; i++){
            await axiosRequest.getImage(this.state.publications[i].publicationID, 0, this.props).then(function (image){
                imagesRequest.push(image);
            })
        }
        this.setState({
            images: imagesRequest
        })
    }

    initializePublications(t){
        let pubComponents = [];
        
        for(let i = 0; i < this.state.publications.length; i++){
            pubComponents.push(
                <ProfilePublication t={t} publication={this.state.publications[i]} 
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
                </header>

            </div>
        );
    }

}

export default withRouter(withTranslation()(MyPublications));
