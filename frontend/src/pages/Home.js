    import React from 'react';
    import { withTranslation } from 'react-i18next';
    import '../css/home.css';
    import Navbar from '../components/Navbar'
    import ImgsViewer from 'react-images-viewer'
    import image1 from '../resources/examples/1.jpg'
    import image2 from '../resources/examples/2.jpg'
    import * as axiosRequest from '../util/axiosRequest'
    import HomeCard from '../components/HomeCard'
    import {Link} from 'react-router-dom';

class HomeReal extends React.Component {

    

   constructor(props) {
        super(props);
        this.state = {
            publicationsSale: [],
            publicationsRent: [],
            search: "",
            operation: "FSale",
            propertyType: "House"
        };
      }
    
    componentDidMount(){
        let currentComponent = this
        axiosRequest.getSalePublications().then(function (publications){
            currentComponent.setState({
                publicationsSale: publications
            })
        })
        axiosRequest.getRentPublications().then(function (publications){
            currentComponent.setState({
                publicationsRent: publications
            })
        })
      }


    renderNewest(array, table, t) {
        if(array.length > 0) {
            const maxResults = 8;
            let loopEnd;
            if(maxResults > array.length) {
                loopEnd = array.length;
            } else {
                loopEnd = maxResults;
            }


            for(let i = 0; i < loopEnd; i ++) { 
                table.push(
                    <HomeCard publication={array[i]}/>
                )
            }
        }   
    }

    setOperation(operation){
        let buy = document.getElementById("buy")
        let rent = document.getElementById("rent")

        if(operation === "FSale"){
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

    render(){
        const { t } = this.props;
        let tableSale = [];
        let tableRent = [];
        this.renderNewest(this.state.publicationsSale, tableSale, t);
        this.renderNewest(this.state.publicationsRent, tableRent, t);
        return(
            <div>
                <Navbar t={t} />
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
                                                <Link to={{pathname: "/List", search: "?search=" + this.state.search + "&operation=" + this.state.operation + "&propertyType=" + this.state.propertyType}} >
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
                        <ul id="newest-homes-fsale" class="newest-homes-list">
                            {tableSale}
                        </ul>
                    </div>
            </section>
            <section class="newest_homes">
                    <div>
                        <h3>{t('home.newPropsOnRent')}</h3>
                    </div>
                    <div>
                        <ul id="newest-homes-fsale" class="newest-homes-list">
                            {tableRent}
                        </ul>
                    </div>
            </section>
            <ImgsViewer
                imgs={[{ src: image1 }, { src: image2 }]}
                isOpen={this.state.isOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClose={this.closeImgsViewer}
            />
            </div>
        </div>
        );
    }
}


export default withTranslation()(HomeReal);