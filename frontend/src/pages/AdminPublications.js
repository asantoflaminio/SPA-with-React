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
    }

    componentDidMount(){
        this.updatePublications(this.state.page)
        this.updatePublicationsQuantity()
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

    updatePublicationsQuantity(){
        let currentComponent = this
        PublicationService.getAllPublicationsCount(this.props).then(function (data){
            currentComponent.setState({
                pagesQuantity: Math.ceil(data.count / data.limit),
                resultsQuantity: data.count
            })
        })
    }

    initializePublications(t){
        let pubComponents = [];
        for(let i = 0; i < this.state.publications.length; i++){
            pubComponents.push(
                <Publication t={t} 
                    publication={this.state.publications[i]}
                    page="AdminPublications"
                    favourites={false}
                />
            )
        }
        return pubComponents;
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