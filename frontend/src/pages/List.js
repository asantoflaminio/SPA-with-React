import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/List.css';
import Navbar from '../components/Navbar'
import arrowDown from '../resources/arrow_down.png';
import Publication from '../components/Publication';
import ImgsViewer from 'react-images-viewer'
import * as axiosRequest from '../util/axiosRequest'
import queryString from 'query-string'

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resultsQuantity: 0,
            search: "queryString.parse(this.props.location.search)",
            publications: [],
            pageQuantity: 0,
        };
      }

      componentDidMount(){
        let currentComponent = this
        axiosRequest.getPublications(1).then(function (pubs){
            currentComponent.setState({
                publications: pubs
            })
        })
        axiosRequest.getPublicationsCount().then(function (data){
            currentComponent.setState({
                pagesQuantity: Math.ceil(data.count / data.limit)
            })
        })
      }

    getResults(t){
        if(this.state.resultsQuantity > 1 || this.state.resultsQuantity === 0)
            return <h3 id="order-title">{this.state.resultsQuantity} {t('list.resultsTitle')}</h3>
        else
            return <h3 id="order-title">{this.state.resultsQuantity} {t('list.resultTitle')}</h3>
    }

    initializePublications(t){
        let pubComponents = [];

        for(let i = 0; i < this.state.publications.length; i++)
            pubComponents.push(
                <Publication t={t} publication={this.state.publications[i]}></Publication>
            )
        return pubComponents;
    }

    render(){
        const { t } = this.props;
        let publications = this.initializePublications(t);
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
                    <div class="results" id="order">
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
                        <li class="applied-filters-list-item hidden" id="filterLocation">
                            <input value="x" class="delete-btn"/>
                            <p class="applied-filter-text" id="filterLocationText"></p>
                        </li>
                        <li class="applied-filters-list-item hidden" id="filterMinPrice">
                            <input value="x" type="submit" class="delete-btn" />
                            <p class="applied-filter-text" id="filterMinPriceText"></p>U$S
                        </li>
                        <li class="applied-filters-list-item hidden" id="filterMaxPrice">
                            <input value="x" type="submit" class="delete-btn"/>
                            <p class="applied-filter-text" id="filterMaxPriceText"></p>U$S
                        </li>
                        <li class="applied-filters-list-item hidden" id="filterMinFloorSize">
                            <input value="x" type="submit" class="delete-btn" />
                            <p class="applied-filter-text" id="filterMinFloorSizeText"></p>m2
                        </li>
                        <li class="applied-filters-list-item hidden" id="filterMaxFloorSize">
                            <input value="x" type="submit" class="delete-btn" />
                            <p class="applied-filter-text" id="filterMaxFloorSizeText"></p>m2
                        </li>
                        <li class="applied-filters-list-item hidden" id="filterBedroom">
                            <input value="x" type="submit" class="delete-btn"/>
                            <p class="applied-filter-text" id="filterBedroomText">asd</p>
                        </li>
                        <li class="applied-filters-list-item hidden" id="filterBathroom">
                            <input value="x" type="submit" class="delete-btn"/>
                            <p class="applied-filter-text" id="filterBathroomText">asd</p>
                        </li>
                        <li class="applied-filters-list-item hidden" id="filterParking">
                            <input value="x" type="submit" class="delete-btn"/>
                            <p class="applied-filter-text" id="filterParkingText">asd</p>
                        </li>
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
                                        <div class="filters-list-item">list.floorsizetitle<img src={arrowDown} alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img>
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
                            {publications}
                        </section>
                    </div>
                </div>
            </div>
            
        );
    }

}

export default withTranslation()(List);