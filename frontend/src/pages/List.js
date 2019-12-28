import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import '../css/list.css';
import '../css/Pagination.css';
import arrowDown from '../resources/arrow_down.png';
import Publication from '../components/Publication';
import * as utilFunction from '../util/function';
import ReactPaginate from 'react-paginate';
import PublicationService from '../services/PublicationService'
import JsonService from '../services/JsonService'


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsQuantity: 0,
            publications: [],
            images: [],
            operation:"",
            propertyType:"",
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
            filters : null
        };
      }

      componentDidMount(){
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search)
        this.updatePublications("search", query.search, "operation", query.operation, "propertyType", query.propertyType)      
        this.selectOperation(query.operation)
        this.selectPropertyType(query.propertyType)
      }

      updatePublications(stateName,value,stateName2,value2,stateName3,value3){
        let query = this.generateQueryPackage();
        query.page = 1;
        query[stateName] = value;
        query[stateName2] = value2;
        query[stateName3] = value3;
        let currentComponent = this
        PublicationService.getPublications(query,stateName,stateName2, this.props).then(function (pubs){
            currentComponent.setState({
                publications: pubs,
                page: query.page,
                [stateName] : query[stateName],
                [stateName2] : query[stateName2],
                [stateName3] : query[stateName3]
            })
            currentComponent.getImages()
            currentComponent.updatePublicationsQuantity()
            currentComponent.updateFilters()
        })
    }

    async getImages(){
        let imagesRequest = []
        
        for(let i = 0; i < this.state.publications.length ; i++){
            let names = ["publicationID","index"]
            let values = [this.state.publications[i].publicationID,0]
            await PublicationService.getImage(JsonService.createJSONArray(names,values), this.props).then(function (image){
                imagesRequest.push(image);
            })
        }
        this.setState({
            images: imagesRequest
        })
    }

    updatePublicationsQuantity(){
        let currentComponent = this
        let query = this.generateQueryPackage()
        PublicationService.getPublicationsCount(query, this.props).then(function (data){
            currentComponent.setState({
                pagesQuantity: Math.ceil(data.count / data.limit),
                resultsQuantity: data.count
            })
        })
    }

    updateFilters(){
        let currentComponent = this
        let query = this.generateQueryPackage()
        PublicationService.getFilters(query, this.props).then(function (data){
            currentComponent.setState({
                filters: data
            })
            currentComponent.hideEmptyFilters(data,"locations","filterLocationHeader");
            currentComponent.hideEmptyFilters(data,"bedrooms","filterBedroomsHeader");
            currentComponent.hideEmptyFilters(data,"bathrooms","filterBathroomsHeader");
            currentComponent.hideEmptyFilters(data,"parking","filterParkingHeader");
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


    hideEmptyFilters(filters,field,id){
        if(Object.keys(filters[field]).length === 0)
            document.getElementById(id).style.display = "none";
        else
            document.getElementById(id).style.display = "block";
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
                <Publication t={t} publication={this.state.publications[i]} image={this.state.images[i]}></Publication>
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

    createFilterFields(field,informationSingular,informationPlural,t,stateName){
        if(this.state.filters === null)
            return;
        return(
            Object.entries(this.state.filters[field]).map( ([key, value]) =>
            <div>
                <a class="filters-item-name" href="#" onClick={() => this.handleFilter(stateName,key)}>{key} {utilFunction.decidePlural(t(informationSingular),t(informationPlural),key)} ({value})</a>
            </div>
            )
        )

    }



    deleteFilter(stateName){
        this.updatePublications(stateName,"");
    }

    handleSelect(event,stateName){
        this.updatePublications(stateName,event.target.value)
    }

    handleFilter(stateName,value){
        this.updatePublications(stateName,value)
    }

    handleOperation(operation){
        this.selectOperation(operation);
        this.updatePublications("operation",operation)
    }

    handleSearch(){
        let value = document.getElementById("search").value
        this.updatePublications("search",value)
    }

    handlePrice(){
        let minPrice = document.getElementById("minPrice");
        let maxPrice = document.getElementById("maxPrice");

        this.updatePublications("minPrice",minPrice.value,"maxPrice",maxPrice.value);
    }

    handleFloorSize(){
        let minFloorSize = document.getElementById("minFloorSize");
        let maxFloorSize = document.getElementById("maxFloorSize");

        this.updatePublications("minFloorSize",minFloorSize.value,"maxFloorSize",maxFloorSize.value);
    }

    selectOperation(operation){
        let buy = document.getElementById("buy")
        let rent = document.getElementById("rent")

        if(operation === "FSale"){
            rent.classList.remove("search_list-item-active")
            buy.classList.add("search_list-item-active");
        }else{
            buy.classList.remove("search_list-item-active")
            rent.classList.add("search_list-item-active");
        }
    }

    selectPropertyType(propertyType){
        let house = document.getElementById("House")
        let apartment = document.getElementById("Apartment")

        if(propertyType === "House")
            house.selected = true;
        else
            apartment.selected = true
    }

    handlePageClick = data => {
        let query = this.generateQueryPackage()
        query.page = data.selected + 1
        let currentComponent = this
        PublicationService.getPublications(query).then(function (pubs){
            currentComponent.setState({
                publications: pubs,
                page: query.page
            })
            currentComponent.getImages()
        })
        
    }

    expand(id){
        let filter = document.getElementById(id);
        if(filter.classList.contains("show"))
            filter.classList.remove("show")
        else
            filter.classList.add("show")
    }

    render(){
        const { t } = this.props;
        let publications = this.initializePublications(t);
        let filters = this.createFiltersNotes(t);
        let locationFilter = this.createFilterFields("locations","","",t,"search")
        let bedroomFilter = this.createFilterFields("bedrooms","list.bedroomSingular","list.bedroomPlural",t,"bedrooms")
        let bathroomFilter = this.createFilterFields("bathrooms","list.bathroomSingular","list.bathroomPlural",t,"bathrooms")
        let parkingFilter = this.createFilterFields("parking","list.parkingSingular","list.parkingPlural",t,"parking")
        return(
            <div>
                <div class="wrap inlineBlock">
                    <div class="search_list inlineBlock">
                        <fieldset class="search_list-container rounded" id="operation-type" >
                            <div class="search_list-item" id="buy" onClick={() => this.handleOperation("FSale")}>
                                <p class="search_list-item-label">{t('list.buy')}</p>
                            </div>
                            <div class="search_list-item" id="rent" onClick={() => this.handleOperation("FRent")}>
                                <p class="search_list-item-label">{t('list.rent')}</p>
                            </div>
                        </fieldset>
                    </div>
                    <div class="search">
                        <form>
                            <select class="type-home-select" id="select-type" onChange={(event) => this.handleSelect(event,"propertyType")}>
                                        <option value="House" id="House">{t('list.house')}</option>
                                        <option value="Apartment" id="Apartment">{t('list.apartment')}</option>
                            </select>
                        </form>
                        <input type="text" class="searchTerm" placeholder={t('list.searchPlaceholder')} id="search"/>
                        <input type="submit" id="search-btn" value={t('list.search')} onClick={() => this.handleSearch()} />
                    </div>
                </div>
            

                <div class="results-container inlineBlock">
                    <div class="results" id="res">
                        {this.getResults(t)}
                    </div>
                    <div class="results" id="order" onChange={(event) => this.handleSelect(event,"order")}>
                            <select id="order-select">
                                <option value="No order"></option>
                                <option value="Ascending order">{t('list.lowest')}</option>
                                <option value="Descending order">{t('list.highest')}</option>
                                <option value="Newest publications">{t('list.newest')}</option>
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
                                        <h3>{t('list.filters')}</h3>
                                    </div>
                                    <div id="filters-list">
                                        <div class="filters-list-item" id="filterLocationHeader">{t('list.location')}<img src={arrowDown} alt="Arrow Up" onClick={() => this.expand("filterLocation")} class="arrow-up-filters"></img>
                                        </div>
                                            <div class="expandible filters-list-item-last" id="filterLocation">
                                                            <ul class="list-group">
                                                                {locationFilter}
                                                            </ul>
                                            </div>
                                        <div class="filters-list-item">{t('list.price')}<img src={arrowDown} alt="Arrow Up" onClick={() => this.expand("filterPrice")} class="arrow-up-filters"></img>
                                        </div>
                                            <div class="expandible" id="filterPrice">
                                                    <div class="slidecontainer">
                                                        <p class="filter-subtitle">{t('list.dollarsMin')}</p>
                                                        <input type="text" id="minPrice"/>
                                                        <p class="filter-subtitle filter-subtitle-not-first">{t('list.dollarsMax')}</p>
                                                        <input type="text" id="maxPrice"/>
                                                    
                                                        <div class="apply-container">
                                                            <button type="button" class="apply-btn" onClick={() => this.handlePrice()}>{t('list.apply')}</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        <div class="filters-list-item">{t('list.floorSizeTitle')}<img src={arrowDown} alt="Arrow Up" onClick={() => this.expand("filterFloorSize")} class="arrow-up-filters"></img>
                                        </div>
                                            <div class="expandible" id="filterFloorSize">
                                                    <div class="slidecontainer">
                                                        <p class="filter-subtitle">{t('list.sqmetersMin')}</p>
                                                        <input type="text" id="minFloorSize" />

                                                        <p class="filter-subtitle filter-subtitle-not-first">{t('list.sqmetersMax')}</p>
                                                        <input type="text" id="maxFloorSize" />
                                                    
                                                        <div class="apply-container">
                                                            <button type="button" class="apply-btn" onClick={() => this.handleFloorSize()}>{t('list.apply')}</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        <div class="filters-list-item" id="filterBedroomsHeader">{t('list.bedrooms')}<img src={arrowDown} alt="Arrow Up" onClick={() => this.expand("filterBedrooms")} class="arrow-up-filters"></img>
                                        </div>
                                            <div class="expandible filters-list-item-last" id="filterBedrooms">
                                                    <div class="radioFlexOption">
                                                        {bedroomFilter}
                                                    </div>	
                                            </div>

                                    <div class="filters-list-item" id="filterBathroomsHeader">{t('list.bathrooms')}<img src={arrowDown} alt="Arrow Up" onClick={() => this.expand("filterBathrooms")} class="arrow-up-filters"></img>
                                    </div>
                                            <div class="expandible filters-list-item-last" id="filterBathrooms">
                                                        <div class="radioFlexOption">
                                                            {bathroomFilter}
                                                        </div>
                                            </div>

                                    <div class="filters-list-item" id="filterParkingHeader">{t('list.parking')}<img src={arrowDown} alt="Arrow Up" onClick={() => this.expand("filterParking")} class="arrow-up-filters"></img>
                                    </div>
                                            <div class="expandible filters-list-item-last" id="filterParking">
                                                        <div class="radioFlexOption">
                                                            {parkingFilter}
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
                                forcePage={this.state.page - 1}
                            />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
        );
    }

}

export default withRouter(withTranslation()(List));