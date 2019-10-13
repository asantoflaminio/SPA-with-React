import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/home.css';
import Navbar from '../components/Navbar'
import ImgsViewer from 'react-images-viewer'
import image1 from '../resources/examples/1.jpg'
import image2 from '../resources/examples/2.jpg'

class HomeReal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
        };
      }

    render(){
        const { t } = this.props;
        const state = {
            isOpen : false,
        }

        return(
            <div>
                <Navbar t />
                <header>
                <div className="header">
                    <div className="title">
                        <h1>{t('home.title')}</h1>
                    </div>
                    <form>
                    <div className="search_list">
                        <fieldset className="search_list-container rounded">
                                <div className="search_list-item selected" id="buy">
                                    <input value="FSale" type="radio" checked /><label id="buy-label">{t('home.buy')}</label>
                                </div>
                                <div className="search_list-item" id="rent">
                                    <input value="FRent" type="radio"/><label id="rent-label">{t('home.rent')}</label>
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
                                                <select className="type-home-select">
                                                    <option value="House">{t('home.house')}</option>
                                                    <option value="Apartment">{t('home.apartment')}</option>
                                                </select>
                                                <input type="hidden" id="propertyType"/>
                                                <input className="form-control form-control-lg" type="search" id="input_search" placeholder={t('home.search')}/>
                                            </div>
                                            <div className="col-auto">
                                                <input id="searchbutton" className="btn btn-lg rounded" type="submit" value={t('home.searhBtn')}/>
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