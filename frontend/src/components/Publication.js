import React from 'react';
import '../css/Publication.css';
import * as utilFunction from '../util/function';
import trash from '../resources/trash.png';
import pencil from '../resources/pencil.png';
import ImgVisualizer from './ImageVisualizer';
import {Link} from 'react-router-dom';
import UserService from '../services/UserService';

function isErasable(t, eraseFunction, publicationid){
    if(eraseFunction){
        return(
            <div class="more-info">
                <p class="more-info-title" onClick={() => eraseFunction(publicationid)}>{t('admin.delete')}</p>
            </div>	
        )
    }
}

function isEditable(t, erasableComponent, eraseFunction, publicationid, editable) {
    if(editable) {
        return(	
            <div>
            <div class="more-info">
                <Link to={{pathname: "/EditPublication", search: "?publicationid=" + publicationid}}>
                    <img class="delete" src={pencil} alt="Edit" />
                    <a class="more-info-title">{t('profilepublication.edit')} </a> 
                </Link>
            </div>
            <div class="more-info">
                <img class="delete" src={trash} alt="Delete" />
                <a class="more-info-title" onClick={() => eraseFunction(publicationid)}>{t('profilepublication.delete')}</a>
            </div>
            </div>
        )
    } else {
        return (
            <div>
            <div class="more-info">
                <Link to={{pathname: "/publications", search: "?publicationid=" + publicationid}}>
                    <a class="more-info-title" href="">{t('list.moreInfo')} ></a>
                </Link>
            {erasableComponent}
            </div>
            </div>
        )
    }
}

const Publication = ({ t , publication, page, faveable, editable, eraseFunction, ready, index }) => {
    let erasableComponent = isErasable(t, eraseFunction, publication.publicationid);
    let editableComponent = isEditable(t, erasableComponent, eraseFunction, publication.publicationid, editable);
        return(
            <div class="polaroid-property">
                <ImgVisualizer
                    publicationid={publication.publicationid}
                    price={publication.price}
                    maxImages={publication.images}
                    page={page}
                    isFavourite={faveable && UserService.isLogged() ? publication.favourite : null}
                    imageClass="polaroid-property-img"
                    containerClass="img-with-tag"
                    nextClass="next-image pointer"
                    previousClass="prev-image pointer"
                    setReady={ready}
                    index={index}
                />
                <div class="property-container">
                    <div class="first-column">								
                        <div class="property-title-container">
                            <h3 class="property-title">{publication.title}</h3>
                            <h4 class="address" id="address"> {publication.address}, {publication.neighborhoodid}, {publication.cityid}, {publication.provinceid}</h4>
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
                        {editableComponent}
                    </div>
                </div>
            </div>
        )
}

export default Publication;