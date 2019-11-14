import React from 'react';
import '../css/Publication.css';
import defaultImage from '../resources/default.jpg';
import defaultBlack from '../resources/blackDefault.png'
import nextArrow from '../resources/arrow_right.png';
import previousArrow from '../resources/arrow_left.png';
import heartFilled from '../resources/heart_filled.png';

const Publication = ({ t , publication}) => (
        <div class="polaroid-property">
            <div class="img-with-tag">
                <img class="polaroid-property-img" src={defaultBlack} />
                <img class="favorite-icon" src={heartFilled} alt="Fave" />
                <img class="next-image pointer" src={nextArrow} alt="Next" />
                <img class="prev-image pointer" src={previousArrow} alt="Previous" />
                <h2 class="price-tag">U$S {publication.price}</h2>
            </div>
            <div class="property-container">
                <div class="first-column">								
                    <div class="property-title-container">
                        <h3 class="property-title">{publication.title}</h3>
                        <h4 class="address"> {publication.address}, {publication.neighborhoodID}, {publication.cityID}, {publication.provinceID}</h4>
                    </div>					
                
                    <div class="property-characteristics">
                        <div class="column-1">
                            <h4 class="littleCharacteristic"><strong>{publication.bedrooms}</strong> publication.bedrooms</h4>
                            <h4 class="littleCharacteristic"><strong>{publication.bathrooms}</strong> publication.bathrooms</h4>
                            <h4 class="littleCharacteristic"><strong>{publication.parking}</strong> publication.parking</h4>						
                        </div>
                        <div class="column-2">
                            <h4 class="littleCharacteristic"><strong>{publication.dimention}</strong> publication.floorSize</h4>	
                            <h3 class="bigCharacteristic">{publication.operation}</h3>	
                        </div>				
                    </div>
                </div>
                <div class="second-column">
                    <div class="pub-date">
                        {publication.date}
                    </div>
                <div class="more-info">
                    <a class="more-info-title" href="">{t('publication.moreInfo')} ></a>
                </div>	
                </div>
            </div>
        </div>

)

export default Publication;