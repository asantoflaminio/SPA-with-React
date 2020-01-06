import React from 'react';
import { withTranslation } from 'react-i18next';
import AdminManagment from '../components/AdminManagment';
import ReactPaginate from 'react-paginate';
import { withRouter } from "react-router";

class AdminPublications extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            pagesQuantity: 0,
        };
    }

    handlePageClick = data => {


    }




    render(){
        const { t } = this.props;

        return(
            <div>
                <AdminManagment t={t}/>
                <div class="polaroid data">
                    <div class="title-container">
                        <h3>{t('admin.publications')}</h3>
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