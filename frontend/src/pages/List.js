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
import * as Constants from '../util/Constants'
import * as StatusCode from '../util/StatusCode'
import ErrorService from '../services/ErrorService';
import ColoredCircularProgress from '../components/ColoredCircularProgress';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsQuantity: 0,
            publications: [],
            operation:"",
            propertyType:"",
            address: "",
            minPrice: "",
            maxPrice:"",
            minFloorSize:"",
            maxFloorSize:"",
            bedrooms:"",
            bathrooms:"",
            parking:"",
            order: Constants.NEWEST_PUBLICATION,
            page: this.setInitialPage(),
            pagesQuantity: 0,
            filters : null,
            circleloading: false
        };
      }

      componentDidMount(){
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search)
        let names = ["address","operation","propertyType","minPrice","maxPrice","minFloorSize","maxFloorSize","bedrooms","bathrooms","parking"]
        let values = [query.address,query.operation,query.propertyType,query.minPrice,query.maxPrice,query.minFloorSize,query.maxFloorSize,
                        query.bedrooms,query.bathrooms,query.parking]
        this.setState({
            circleloading: true
        });
        
        this.updatePublications(names,values)      
        this.selectOperation(query.operation)
        this.selectPropertyType(query.propertyType)
      }

      updatePublications(names,values){
        let queryParameters = this.generateQueryParametersPackage();
        this.updateQueryParameters(queryParameters,names,values)
        this.pushParameters(names,values);
        let currentComponent = this
        PublicationService.getPublications(queryParameters).then(function (response){
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({
                publications: response.data,
                resultsQuantity: response.headers["x-total-count"],
                pagesQuantity: Math.ceil(response.headers["x-total-count"] / Constants.PUBLICATIONS_PAGE_LIMIT),
                page: queryParameters.page,
                operation: queryParameters["operation"],
                propertyType: queryParameters["propertyType"],
                address: queryParameters["address"],
                minPrice: queryParameters["minPrice"],
                maxPrice: queryParameters["maxPrice"],
                minFloorSize: queryParameters["minFloorSize"],
                maxFloorSize: queryParameters["maxFloorSize"],
                bedrooms: queryParameters["bedrooms"],
                bathrooms: queryParameters["bathrooms"],
                parking: queryParameters["parking"],
                order: queryParameters["order"] ,
                circleloading: false
            })
            currentComponent.updateFilters(queryParameters)
        })
    }

    updateFilters(queryParameters){
        let currentComponent = this
        PublicationService.getFilters(queryParameters).then(function (response){
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({
                filters: response.data
            })
            currentComponent.hideEmptyFilters(response.data,"locations","filterLocationHeader");
            currentComponent.hideEmptyFilters(response.data,"bedrooms","filterBedroomsHeader");
            currentComponent.hideEmptyFilters(response.data,"bathrooms","filterBathroomsHeader");
            currentComponent.hideEmptyFilters(response.data,"parking","filterParkingHeader");
        })
    }

    generateQueryParametersPackage(){
        const query = {
            operation: this.state.operation,
            propertyType: this.state.propertyType,
            address: this.state.address,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            minFloorSize: this.state.minFloorSize,
            maxFloorSize: this.state.maxFloorSize,
            bedrooms: this.state.bedrooms,
            bathrooms: this.state.bathrooms,
            parking: this.state.parking,
            order: this.state.order,
            page: this.state.page,
            limit: Constants.PUBLICATIONS_PAGE_LIMIT       
         }
         return query
    }

    updateQueryParameters(queryParameters,names,values){
        for(let i = 0; i < names.length; i++){
            queryParameters[names[i]] = values[i];
        }
    }


    hideEmptyFilters(filters,field,id){
        if(Object.keys(filters[field]).length <= 1)
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

    initializePublications(){
        let pubComponents = [];
        const { t } = this.props 
        for(let i = 0; i < this.state.publications.length; i++){
            pubComponents.push(
                <Publication t={t} 
                    publication={this.state.publications[i]}
                    page="List"
                    editable={false}
                    faveable={true}
                />

            )
        }
        if(this.state.publications.length === 0){
            pubComponents.push(
                <p>{t('list.noPublications')}</p>
            )
        }

        return pubComponents;
    }

    checkFilterExistance(value){
        if(value !== "" && value !== null && value !== "undefined" && value !== undefined)
            return true;
        return false;
    }

    createDeleteAll(t){
        if(this.checkFilterExistance(this.state.address) || this.checkFilterExistance(this.state.minPrice) ||
            this.checkFilterExistance(this.state.maxPrice) || this.checkFilterExistance(this.state.minFloorSize) ||
            this.checkFilterExistance(this.state.maxFloorSize) || this.checkFilterExistance(this.state.bedrooms) ||
            this.checkFilterExistance(this.state.bathrooms) || this.checkFilterExistance(this.state.parking)){
            return(               
                    <div class="clean-all" onClick={() => this.deleteAllFilters(t)}> {t('list.cleanAll')} </div>
                )
            }

        return;       
    }

    createFiltersNotes(){
        let filters = [];
        filters.push(this.createFilter("address",this.state.address,null,null,""));
        filters.push(this.createFilter("minPrice",this.state.minPrice,null,null,"U$S"));
        filters.push(this.createFilter("maxPrice",this.state.maxPrice,null,null,"U$S"));
        filters.push(this.createFilter("minFloorSize",this.state.minFloorSize,null,null,"m2"));
        filters.push(this.createFilter("maxFloorSize",this.state.maxFloorSize,null,null,"m2"));
        filters.push(this.createFilter("bedrooms",this.state.bedrooms,"list.bedroomSingular","list.bedroomPlural",""));
        filters.push(this.createFilter("bathrooms",this.state.bathrooms,"list.bathroomSingular","list.bathroomPlural",""));
        filters.push(this.createFilter("parking",this.state.parking,"list.parkingSingular","list.parkingPlural",""));
        return filters
    }

    createFilter(stateName,value,singularInformation,pluralInformation,additionalInformation){
        const {t} = this.props
        if(! this.checkFilterExistance(value)){
            return;
        }
        return(
            <li class="applied-filters-list-item">
                <input value="x" class="delete-btn" onClick={() => this.deleteFilter(stateName)}/>
                <p class="applied-filter-text">{value} {utilFunction.decidePlural(t(singularInformation),t(pluralInformation),value)}</p>{additionalInformation}    
            </li>
            
        )
    }

    createFilterFields(field,singularInformation,pluralInformation,t,stateName){
        if(this.state.filters === null)
            return;
        return(
            Object.entries(this.state.filters[field]).map( ([key, value]) =>
            <div>
                <a class="filters-item-name" href="#" onClick={() => this.handleFilter(stateName,key)}>{key} {utilFunction.decidePlural(t(singularInformation),t(pluralInformation),key)} ({value})</a>
            </div>
            )
        )

    }

    deleteAllFilters(){
        this.setState({
            circleloading: true
        });
        let names = ["address","minPrice","maxPrice","minFloorSize","maxFloorSize","bedrooms","bathrooms","parking","page"]
        let values = ["","","","","","","","",0]
        this.updatePublications(names,values)
    }

    deleteFilter(stateName){
        this.setState({
            circleloading: true
        });
        let names = [stateName,"page"]
        let values = ["",0]
        this.updatePublications(names,values);
    }

    handleSelect(event,stateName){
        this.setState({
            circleloading: true
        });
        let names = [stateName]
        let values = [event.target.value]
        this.updatePublications(names,values)
    }

    handleFilter(stateName,value){
        this.setState({
            circleloading: true
        });
        let names = [stateName,"page"]
        let values = [value,0]
        this.updatePublications(names,values)
    }

    handleOperation(operation){
        this.setState({
            circleloading: true
        });
        let names = ["operation","page"]
        let values = [operation,0]
        this.selectOperation(operation);
        this.updatePublications(names,values)
    }

    handleSearch(){
        
        this.setState({
            circleloading: true
        });
        let value = document.getElementById("search-holder").value
        let names = ["address","page"]
        let values = [value,0]
        this.updatePublications(names,values)
    }

    handlePrice(){
        this.setState({
            circleloading: true
        });
        let minPrice = document.getElementById("minPrice");
        let maxPrice = document.getElementById("maxPrice");
        let names = ["minPrice","maxPrice","page"]
        let values = [minPrice.value,maxPrice.value,0]
        this.updatePublications(names,values);
    }

    handleFloorSize(){
        this.setState({
            circleloading: true
        });
        let minFloorSize = document.getElementById("minFloorSize");
        let maxFloorSize = document.getElementById("maxFloorSize");

        let names = ["minFloorSize","maxFloorSize","page"]
        let values = [minFloorSize.value,maxFloorSize.value,0]
        this.updatePublications(names,values);
    }

    selectOperation(operation){
        let buy = document.getElementById("buy")
        let rent = document.getElementById("rent")

        if(operation === Constants.FSALE){
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

        if(propertyType === Constants.HOUSE)
            house.selected = true;
        else
            apartment.selected = true
    }

    setInitialPage(){
        const params = new URLSearchParams(this.props.location.search); 
        const queryPageParam = params.get(Constants.PAGE);
        let names = ["page"]
        let values = [queryPageParam || 1];
        this.pushParameters(names,values)
        return parseInt(queryPageParam) - 1 || 0;
    }

    pushParameters(names,values){
        if(names === [])
            return
        const queryParser = require('query-string');
        const queryParams = queryParser.parse(this.props.history.location.search);
        for(let i = 0; i < names.length; i++){
            if(names[i] === Constants.PAGE)
                queryParams[names[i]] = values[i] + 1;
            else
            queryParams[names[i]] = values[i];
        }

        this.props.history.push({
            path: '/List',
            search: queryParser.stringify(queryParams)
        })
    }

    handlePageClick = data => {
        
        // esto causa loop infinito
        // this.setState({
        //     circleloading: true
        // });
        let names = ["page"]
        let values = [data.selected]
        this.updatePublications(names,values)
        
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
        let publications = this.initializePublications();
        let filters = this.createFiltersNotes(t);
        let cleanAll = this.createDeleteAll(t);
        let locationFilter = this.createFilterFields("locations","","",t,"address")
        let bedroomFilter = this.createFilterFields("bedrooms","list.bedroomSingular","list.bedroomPlural",t,"bedrooms")
        let bathroomFilter = this.createFilterFields("bathrooms","list.bathroomSingular","list.bathroomPlural",t,"bathrooms")
        let parkingFilter = this.createFilterFields("parking","list.parkingSingular","list.parkingPlural",t,"parking")
        return(
            <div>                
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
                        <input type="text" class="searchTerm" id="search-holder" placeholder={t('list.searchPlaceholder')}/>
                        <input type="submit" id="search-btn" value={t('list.search')} onClick={() => this.handleSearch()} />
                    </div>
                </div>
            

                <div class="results-container inlineBlock">
                    <div class="results" id="res">
                        {this.getResults(t)}
                    </div>
                    <div class="results" id="order" onChange={(event) => this.handleSelect(event,"order")}>
                        <h3 id="order-title-select">{t('list.order')}</h3>
                        <select id="order-select">
                            <option disabled selected value={Constants.NO_ORDER}>{t('list.noOrder')}</option>
                            <option value={Constants.NEWEST_PUBLICATION}>{t('list.newest')}</option>
                            <option value={Constants.OLDEST_PUBLICATION}>{t('list.oldest')}</option>
                            <option value={Constants.ASCENDANT_ORDER}>{t('list.lowest')}</option>
                            <option value={Constants.DESCENDANT_ORDER}>{t('list.highest')}</option>                 
                        </select>
                    </div>
                </div>

                <div class="filters">
                    <ul id="applied-filters-list">
                        {filters}
                        {cleanAll}
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
                                        
                                            <div class="expandible filters-list-item-last" id="filterLocation">
                                                            <ul class="list-group">
                                                                {locationFilter}
                                                            </ul>
                                            </div>
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
                                        
                                            <div class="expandible filters-list-item-last" id="filterBedrooms">
                                                    <div class="radioFlexOption">
                                                        {bedroomFilter}
                                                    </div>	
                                            </div>
                                        </div>
                                    <div class="filters-list-item" id="filterBathroomsHeader">{t('list.bathrooms')}<img src={arrowDown} alt="Arrow Up" onClick={() => this.expand("filterBathrooms")} class="arrow-up-filters"></img>
                                    
                                            <div class="expandible filters-list-item-last" id="filterBathrooms">
                                                        <div class="radioFlexOption">
                                                            {bathroomFilter}
                                                        </div>
                                            </div>
                                    </div>
                                    <div class="filters-list-item" id="filterParkingHeader">{t('list.parking')}<img src={arrowDown} alt="Arrow Up" onClick={() => this.expand("filterParking")} class="arrow-up-filters"></img>
                                    
                                            <div class="expandible filters-list-item-last" id="filterParking">
                                                        <div class="radioFlexOption">
                                                            {parkingFilter}
                                                        </div>	
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        {this.state.circleloading ? 
                            ( <ColoredCircularProgress/> )
                        : (   
                        <section id="publications">
                            <div>
                                {publications}
                            </div>
                            {this.state.publications.length != 0 ?
                                (<div class="pubsPagination">
                                    <ReactPaginate
                                    initialPage={this.state.page}
                                    forcePage={this.state.page}
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
                                </div>) : null}
                        </section>
                        ) }
                    </div>
                </div>
            </div>
                
        </div>
            
        );
    }

}

export default withRouter(withTranslation()(List));