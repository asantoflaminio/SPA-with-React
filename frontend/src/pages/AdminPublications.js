import React from 'react';
import { withTranslation } from 'react-i18next';
import AdminManagment from '../components/AdminManagment';
import Publication from '../components/Publication';
import ReactPaginate from 'react-paginate';
import { withRouter } from "react-router";
import PublicationService from '../services/PublicationService'
import JsonService from '../services/JsonService'

class AdminPublications extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            pagesQuantity: 0,
            page: 1,
            publications: [],
            resultsQuantity: 0
        };

        this.erasePublication = this.erasePublication.bind(this);
    }

    componentDidMount(){
        this.updatePublicationsQuantity()
        this.updatePublications(this.state.page)
    }

    handlePageClick = data => {
        this.updatePublications(data.selected + 1)
    }

    updatePublications(newPage){
        let currentComponent = this
        let names = ["page"]
        let values = [newPage]
        PublicationService.getAllPublications(JsonService.createJSONArray(names,values),this.props).then(function (pubs){
            currentComponent.setState({
                publications: pubs,
                page: newPage
            })
        })
    }

    async updatePublicationsQuantity(){
        let currentComponent = this
        PublicationService.getAllPublicationsCount(this.props).then(function (data){
            let newPage = currentComponent.state.page
            if(data.count % data.limit === 0)
                newPage = currentComponent.state.page - 1
            currentComponent.setState({
                pagesQuantity: Math.ceil(data.count / data.limit),
                resultsQuantity: data.count,
                page: newPage
            })
        })
    }

    initializePublications(t){
        let pubComponents = [];
        for(let i = 0; i < this.state.publications.length; i++){
            alert(this.state.publications[i].publicationID)
            pubComponents.push(
                <Publication t={t} 
                    publication={this.state.publications[i]}
                    page="AdminPublications"
                    favourites={false}
                    eraseFunction={this.erasePublication}
                />
            )
        }
        return pubComponents;
    }

    erasePublication(publicationID){
        alert(publicationID)
        let currentComponent = this
        let names = ["id"]
        let values = [publicationID]
        PublicationService.erasePublication(JsonService.createJSONArray(names,values),this.props).then(function (){
            alert("deleted " + publicationID)
            currentComponent.updatePublicationsQuantity()
        })
    }

    render(){
        const { t } = this.props;
        let publications = this.initializePublications(t)
        return(
            <div>
                <AdminManagment t={t}/>
                <div class="polaroid data">
                    <div class="title-container">
                        <h3>{t('admin.publications')}</h3>
                    </div>
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
                </div>
            </div>
        );
    }
}



export default withRouter(withTranslation()(AdminPublications));