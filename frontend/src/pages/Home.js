import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import '../css/home.css';
import HomeCard from '../components/HomeCard'
import {Link} from 'react-router-dom';
import PublicationService from '../services/PublicationService'
import * as Constants from '../util/Constants'
import * as StatusCode from '../util/StatusCode'
import ErrorService from '../services/ErrorService';
import LocalStorageService from '../services/LocalStorageService'
import HomeCardLoader from '../components/HomeCardLoader';

class HomeReal extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            publicationsSale: [],
            publicationsRent: [],
            search: "",
            operation: "FSale",
            propertyType: "House",
            loading: false
        };
        this.setReady = this.setReady.bind(this)
      }
    
    componentDidMount(){
        let currentComponent = this
        let queryParameters_1 = {}
        let queryParameters_2 = {}
        this.setState({
            loading: true
        });
        queryParameters_1.operation = Constants.FSALE
        queryParameters_1.order = Constants.NEWEST_PUBLICATION
        LocalStorageService.deleteCounter();
        LocalStorageService.initializeCounter()
        PublicationService.getPublications(queryParameters_1).then(function (response){
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({ publicationsSale: response.data })
        })
        queryParameters_2.operation = Constants.FRENT
        queryParameters_2.order = Constants.NEWEST_PUBLICATION
        PublicationService.getPublications(queryParameters_2).then(function (response){
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({ publicationsRent: response.data })
        })
      }


    renderNewest(array, table, lastIndex) {
        if(array.length > 0) {
            const maxResults = Constants.HOME_MAX_PUBLICATIONS;
            let loopEnd;
            if(maxResults > array.length) {
                loopEnd = array.length;
            } else {
                loopEnd = maxResults;
            }


            for(let i = 0; i < loopEnd; i ++) {
                let index = lastIndex + i
                table.push(
                    <HomeCard 
                    publication={array[i]}
                    ready={this.setReady}
                    index={index}
                    />
                )
            }
        }   
    }

    setOperation(operation){
        let buy = document.getElementById("buy")
        let rent = document.getElementById("rent")

        if(operation === Constants.FSALE){
            rent.classList.remove("selected")
            buy.classList.add("selected");
        }else{
            buy.classList.remove("selected")
            rent.classList.add("selected");
        }

        this.setState({
            operation: operation
        })
    }
    
    setPropertyType(event){
        this.setState({
            propertyType: event.target.value
        })
    }

    setSearch(){
        let value = document.getElementById("input_search").value
        this.setState({
            search: value
        })
    }

    setReady(){
        if(LocalStorageService.getCounter() === this.state.publicationsSale.length){
            LocalStorageService.deleteCounter()
            this.setState({loading: false})
        }    
    }

    loadingContainers(){
        let pubComponents = [];
        for(let i = 0; i < Constants.HOME_MAX_PUBLICATIONS; i++){
            pubComponents.push(
                <li class="polaroid minWidth">
                    <HomeCardLoader/>
                </li>
            )
        }
        return pubComponents;
    }

    render(){
        const { t } = this.props;
        let tableSale = [];
        let tableRent = [];
        let tableLoader = this.loadingContainers()
        this.renderNewest(this.state.publicationsSale, tableSale, 0);
        this.renderNewest(this.state.publicationsRent, tableRent, Constants.HOME_MAX_PUBLICATIONS);
        return(
            <div>
 
            <div>
                <header>
                <div className="header">
                    <div className="title">
                        <h1>{t('home.title')}</h1>
                    </div>
                    <form>
                    <div className="search_list">
                        <fieldset className="search_list-container rounded">
                                <div className="search_list-item selected" id="buy" onClick={() => this.setOperation("FSale")}>
                                    <input value="FSale" type="radio" /><label id="buy-label" >{t('home.buy')}</label>
                                </div>
                                <div className="search_list-item" id="rent" onClick={() => this.setOperation("FRent")}>
                                    <input value="FRent" type="radio" /><label id="rent-label">{t('home.rent')}</label>
                                </div>
                        </fieldset>
                    </div>
                    <div id="icons">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8">
                                    <form id="card" className="card card-sm">
                                        <div className="card-body row no-gutters">
                                            <div className="col-auto">
                                                <i className="fas fa-search h4 text-body"></i>
                                            </div>
                                            <div className="col">
                                                <select className="type-home-select" onChange={(e) => this.setPropertyType(e)}>
                                                    <option value="House">{t('home.house')}</option>
                                                    <option value="Apartment">{t('home.apartment')}</option>
                                                </select>
                                                <input type="hidden" id="propertyType"/>
                                                <input  onChange={() => this.setSearch()}className="form-control form-control-lg" type="search" id="input_search" placeholder={t('home.search')}/>
                                            </div>
                                            <div className="col-auto">
                                                <Link to={{pathname: "/List", search: "?address=" + this.state.search + "&operation=" + this.state.operation + "&propertyType=" + this.state.propertyType}} >
                                                    <input id="searchbutton" className="btn btn-lg rounded" type="submit" value={t('home.searhBtn')}/>
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </header>
            <div>
            <section class="newest_homes">
                    <div>
                        <h3>{t('home.newPropsOnSale')}</h3>
                    </div>
                    <div>
                        {this.state.loading === true ? 
                        (
                        <div>
                            <ul id="newest-homes-fsale"  class="newest-homes-list">
                                {tableLoader}
                            </ul>
                        </div>
                        )
                        : null}
                        <div>
                            <ul id="newest-homes-fsale"  class={this.state.loading === true ? "hidden newest-homes-list" : "newest-homes-list"}>
                                {tableSale}
                            </ul>
                        </div>
                    </div>
            </section>
            <section class="newest_homes">
                    <div>
                        <h3>{t('home.newPropsOnRent')}</h3>
                    </div>
                    <div>
                    {this.state.loading === true ? 
                        (
                        <div>
                            <ul id="newest-homes-fsale"  class="newest-homes-list">
                                {tableLoader}
                            </ul>
                        </div>
                        )
                        : null}
                        <div>
                            <ul id="newest-homes-fsale" class={this.state.loading === true ? "hidden newest-homes-list" : "newest-homes-list"}>
                                {tableRent}
                            </ul>
                        </div>
                    </div>
            </section>
            </div>
        </div>
        </div>
        );
    }
}


export default withRouter(withTranslation()(HomeReal));