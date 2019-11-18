import React from 'react';
import { withTranslation } from 'react-i18next';
import heartFilled from '../resources/heart_filled.png';
import Navbar from '../components/Navbar'
import '../css/Details.css';
import * as utilFunction from '../util/function';
import * as axiosRequest from '../util/axiosRequest';

class Details extends React.Component {
    constructor(props) {
        super(props);
      }

    render(){
        const { t } = this.props;
        return(
            <div>
                <Navbar t={t} />
                <div id="cols">
                    <div id="left-col">   
                        <div class="polaroid">       
                            <div class="w3-content w3-display-container">
                                <img class="favorite-icon pointer" src={heartFilled} alt="Fave"/>
                                    <div class="size_div">
                                        <img class="mySlides" src=""/>
                                    </div>
                                    <div class="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle">
                                        <div class="w3-left w3-hover-text-khaki">&#10094;</div>
                                        <div class="w3-right w3-hover-text-khaki">&#10095;</div>
                                    </div>
                            </div>
                            <div class="container">
                                <p class="direction"></p>
                            </div>
                        </div>
                    
                        <div class="polaroid_overview">
                            <div class="container4">
                                <p class="polaroid_title">details.overview</p>
                                <p class="agency_text">details.bedrooms:</p>
                                <p class="agency_text">details.bathrooms</p>
                                <p class="agency_text">details.floorSize: m2</p>
                                <p class="agency_text">details.parking</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="right-col">
                        <div class="polaroid_price">
                            <div class="container2">
                                <div class="price_text">
                                    <p id="rent_sale">details.price</p> 
                                    <p id="price_tag">$</p>
                                </div>
                            </div>
                        </div>
                    
                        <div class="polaroid_agency">
                            <div class="container3">
                                <p class="agency_text_contact">details.contact</p>
                                <div id="tel-container">
                                    <p class="tel-text">details.tel</p>
                                    <p class="tel-num">phonenumber</p>
                                </div>
                                <div class="fillers">
                                    <label class="contact-title" path="name">details.name</label>
                                    <input type="text" placeholder={t('details.namePlaceholder')} />
                                
                                
                                    <label class="contact-title">details.email</label>
                                    <input type="text" placeholder={t('details.emailPlaceholder')}/>
                                
                                    <label class="contact-title">details.message</label>
                                    <input type="text" placeholder={t('details.messagePlaceholder')}/>
                                
                                    <input type="hidden" value={'sellerEmail'}/>
                                
                                    <input class="button-contact" type="submit" value=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="polaroid_des">
                    <div class="container">
                        <p class="polaroid_title">details.title</p>
                        <p class="agency_text">Descriprion</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default withTranslation()(Details);