import React from 'react';
import '../css/Publication.css';
import nextArrow from '../resources/arrow_right.png';
import previousArrow from '../resources/arrow_left.png';
import heartFilled from '../resources/heart_filled.png';
import * as utilFunction from '../util/function';

const Publication = ({ t , publication, image}) => (
        <div class="polaroid-property">
            <div class="img-with-tag">
                <img class="polaroid-property-img" id={"publication-" + publication.publicationID} src={utilFunction.setSRC(image)} />
                <img class="favorite-icon" src={heartFilled} alt="Fave" />
                <img class="prev-image pointer" src={previousArrow} alt="Previous" index="0" onClick={(e) => utilFunction.getNextImage(publication.publicationID,e.target,e.target.index - 1)}/>
                <img class="next-image pointer" src={nextArrow} alt="Next" index="0" onClick={(e) => utilFunction.getNextImage(publication.publicationID,e.target,e.target.index + 1)}/>
                <h2 class="price-tag">U$S {publication.price}</h2>
            </div>
            <div class="property-container">
                <div class="first-column">								
                    <div class="property-title-container">
                        <h3 class="property-title">{publication.title}</h3>
                        <h4 class="address" id="address"> {publication.address}, {publication.neighborhoodID}, {publication.cityID}, {publication.provinceID}</h4>
                    </div>					
                
                    <div class="property-characteristics">
                        <div class="column-1">
                            <h4 class="littleCharacteristic"><strong>{publication.bedrooms}</strong> {utilFunction.decidePlural(t('list.bedroomSingular'),t('list.bedroomPlural'),publication.bedrooms)}</h4>
                            <h4 class="littleCharacteristic"><strong>{publication.bathrooms}</strong> {utilFunction.decidePlural(t('list.bathroomSingular'),t('list.bathroomPlural'),publication.bedrooms)}</h4>
                            <h4 class="littleCharacteristic"><strong>{publication.parking}</strong> {utilFunction.decidePlural(t('list.parkingSingular'),t('list.parkingPlural'),publication.bedrooms)}</h4>						
                        </div>
                        <div class="column-2">
                            <h4 class="littleCharacteristic"><strong>{publication.dimention}</strong> {t('list.sqmeters')}</h4>
                            <h3 class="bigCharacteristic">{utilFunction.decideOperation(t('list.buy'),t('list.rent'),publication.operation)}</h3>
                        </div>				
                    </div>
                </div>
                <div class="second-column">
                    <div class="pub-date">
                        {publication.date}
                    </div>
                <div class="more-info">
                    <a class="more-info-title" href="">{t('list.moreInfo')} ></a>
                </div>	
                </div>
            </div>
        </div>

)

export default Publication;