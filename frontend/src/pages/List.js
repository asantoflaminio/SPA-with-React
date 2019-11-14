import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/List.css';
import '../css/Pagination.css';
import Navbar from '../components/Navbar'
import arrowDown from '../resources/arrow_down.png';
import Publication from '../components/Publication';
import * as axiosRequest from '../util/axiosRequest'
import ReactPaginate from 'react-paginate';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsQuantity: 0,
            publications: [],
            operation:"FSale",
            propertyType:"House",
            search: "",
            minPrice: "",
            maxPrice:"",
            minFloorSize:"",
            maxFloorSize:"",
            bedrooms:"",
            bathrooms:"",
            parking:"",
            order:"No order",
            page: 1,
            pageQuantity: 0,
        };
        this.handleOrder = this.handleOrder.bind(this)
      }

      componentDidMount(){
        let currentComponent = this
        let query = this.generateQueryPackage()
        axiosRequest.getPublications(query).then(function (pubs){
            currentComponent.setState({
                publications: pubs
            })
        })
        axiosRequest.getPublicationsCount(query).then(function (data){
            currentComponent.setState({
                pagesQuantity: Math.ceil(data.count / data.limit)
            })
        })
      }

    generateQueryPackage(){
        const query = {
            operation: this.state.operation,
            propertyType: this.state.propertyType,
            search: this.state.search,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            minFloorSize: this.state.minFloorSize,
            maxFloorSize: this.state.maxFloorSize,
            bedrooms: this.state.bedrooms,
            bathrooms: this.state.bathrooms,
            parking: this.state.parking,
            order: this.state.order,
            page: this.state.page       
         }
         return query
    }

    getResults(t){
        if(this.state.resultsQuantity > 1 || this.state.resultsQuantity === 0)
            return <h3 id="order-title">{this.state.resultsQuantity} {t('list.resultsTitle')}</h3>
        else
            return <h3 id="order-title">{this.state.resultsQuantity} {t('list.resultTitle')}</h3>
    }

    initializePublications(t){
        let pubComponents = [];

        for(let i = 0; i < this.state.publications.length; i++){
            pubComponents.push(
                <Publication t={t} publication={this.state.publications[i]}></Publication>
            )
        }
        return pubComponents;
    }

    createFiltersNotes(t){
        let filters = [];
        filters.push(this.createFilter("search",this.state.search,""));
        filters.push(this.createFilter("minPrice",this.state.minPrice,"U$S"));
        filters.push(this.createFilter("maxPrice",this.state.maxPrice,"U$S"));
        filters.push(this.createFilter("minFloorSize",this.state.minFloorSize,"m2"));
        filters.push(this.createFilter("maxFloorSize",this.state.maxFloorSize,"m2"));
        filters.push(this.createFilter("bedrooms",this.state.bedrooms,""));
        filters.push(this.createFilter("bathrooms",this.state.bathrooms,""));
        filters.push(this.createFilter("parking",this.state.parking,""));
        return filters
    }

    createFilter(stateName,information,additionalInformation){
        if(information === ""){
            return;
        }
            
        return(
            <li class="applied-filters-list-item">
                <input value="x" class="delete-btn" onClick={() => this.deleteFilter(stateName)}/>
                <p class="applied-filter-text">{information}</p>{additionalInformation}
            </li>
        )
    }

    deleteFilter(stateName){
        let query = this.generateQueryPackage()
        query.page = 1
        query[stateName] = "";
        let currentComponent = this
        axiosRequest.getPublications(query).then(function (pubs,stateName){
            currentComponent.setState({
                publications: pubs,
                page: query.page,
                [stateName] : "",
            })
        })
    }

    handleOrder(e){
        let query = this.generateQueryPackage()
        query.page = 1
        query.order = e.target.value;
        let currentComponent = this
        axiosRequest.getPublications(query).then(function (pubs,e){
            currentComponent.setState({
                publications: pubs,
                page: query.page,
                order : query.order,
            })
        })
    }

    handlePageClick = data => {
        let query = this.generateQueryPackage()
        query.page = data.selected + 1
        let currentComponent = this
        axiosRequest.getPublications(query).then(function (pubs){
            currentComponent.setState({
                publications: pubs,
                page: query.page
            })
        })
    }

    render(){
        const { t } = this.props;
        let publications = this.initializePublications(t);
        let filters = this.createFiltersNotes(t);
        return(
            <div>
                <Navbar t={t} />
                <div class="wrap inlineBlock">
                    <div class="search_list inlineBlock">
                        <fieldset class="search_list-container rounded" id="operation-type">
                            <div class="search_list-item" id="buy" onclick="updateInputsOperation('FSale'); submitOperation('${operation}','FSale');">
                                <p class="search_list-item-label">{t('list.buy')}</p>
                            </div>
                            <div class="search_list-item" id="rent" onclick="updateInputsOperation('FRent') ; submitOperation('${operation}','FRent');">
                                <p class="search_list-item-label">{t('list.rent')}</p>
                            </div>
                        </fieldset>
                    </div>
                    <div class="search">
                        <form>
                            <select class="type-home-select" id="select-type">
                                        <option value="House">{t('list.house')}</option>
                                        <option value="Apartment">{t('list.apartment')}</option>
                            </select>
                        </form>
                        <input path="address" type="text" class="searchTerm" placeholder={t('list.searchPlaceholder')} oninput="updateCheckInput(this)"/>
                        <input type="submit" id="search-btn" value={t('list.search')}/>
                    </div>
                </div>
            

                <div class="results-container inlineBlock">
                    <div class="results" id="res">
                        {this.getResults(t)}
                    </div>
                    <div class="results" id="order" onChange={this.handleOrder}>
                            <select id="order-select">
                                <option value="No order"></option>
                                <option value="Ascending order">{t('list.lowest')}</option>
                                <option value="Descending order">{t('list.highest')}</option>
                                <option value="Newest publications">{t('list.newst')}</option>
                                <option value="Oldest publications">{t('list.oldest')}</option>
                            </select>
                        <h3 id="order-title-select">{t('list.order')}</h3>
                    </div>
                </div>

                <div class="filters">
                    <ul id="applied-filters-list">
                        {filters}
                    </ul>
                </div>

                <div>
                    <div id="content-container">
                        <aside>
                            <div class="filter-polaroid">
                                <div class="container">
                                    <div id="filters-title">
                                        <h3>list.filters</h3>
                                    </div>
                                    <div id="filters-list">
                                        <div class="filters-list-item">list.location<img src={arrowDown} alt="Arrow Up" class="arrow-up-filters"></img>
                                        </div>
                                            <div class="expandible filters-list-item-last">
                                                            <div class="radioFlexOption">
                                                                    <a class="filters-item-name" href="#">
                                                                        lo que dice el filtro location
                                                                    </a>
                                                            </div>
                                            </div>
                                        <div class="filters-list-item">list.price<img src={arrowDown} alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img>
                                        </div>
                                            <div class="expandible">
                                                    <div class="slidecontainer">
                                                        <p class="filter-subtitle">list.dollars</p>
                                                        <input type="text" name = "minPrice"/>
                                                        <p class="filter-subtitle filter-subtitle-not-first">list.dollars</p>
                                                        <input type="text" name="maxPrice"/>
                                                    
                                                        <div class="apply-container">
                                                            <button type="button" class="apply-btn" onclick="submitPrice()">list.apply</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        <div class="filters-list-item">list.floorsizetitle<img src={arrowDown} alt="Arrow Up" onClick="expand(this);" class="arrow-up-filters"></img>
                                        </div>
                                            <div class="expandible">
                                                    <div class="slidecontainer">
                                                        <p class="filter-subtitle">list.sqmeters</p>
                                                        <input type="text" name = "minFloorSize" />

                                                        <p class="filter-subtitle filter-subtitle-not-first"> list.sqmeters</p>
                                                        <input type="text" name="maxFloorSize" />
                                                    
                                                        <div class="apply-container">
                                                            <button type="button" class="apply-btn" onclick="submitFloorSize()">list.apply</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        <div class="filters-list-item">list.bedrooms<img src={arrowDown} alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img>
                                        </div>
                                            <div class="expandible filters-list-item-last">
                                                    <div class="radioFlexOption">
                                                        <a class="filters-item-name" href="">
                                                        </a>
                                                    </div>	
                                            </div>

                                    <div class="filters-list-item">list.bathrooms<img src={arrowDown} alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img>
                                    </div>
                                            <div class="expandible filters-list-item-last">
                                                        <div class="radioFlexOption">
                                                            <a class="filters-item-name" href="">
                                                            </a>
                                                        </div>
                                            </div>

                                    <div class="filters-list-item">list.parking<img src={arrowDown} alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img>
                                    </div>
                                            <div class="expandible filters-list-item-last">
                                                        <div class="radioFlexOption">
                                                            <a class="filters-item-name" href="" onclick="submitParking(this,'${parkingEntry.key}')">
                                                            </a>
                                                        </div>	
                                            </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <section id="publications">
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
                            />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
        );
    }

}

export default withTranslation()(List);