import React from 'react';
import '../css/Publication.css';
import * as utilFunction from '../util/function';
import trash from '../resources/trash.png';
import pencil from '../resources/pencil.png';
import ImgVisualizer from './ImageVisualizer';
import {Link} from 'react-router-dom';
import UserService from '../services/UserService';

function isErasable(t, eraseFunction, publicationid, page){
    if(eraseFunction && page !== "MyFavorites"){
        return(
            <div className="more-info">
                <img className="delete" src={trash} alt="Delete" />
                <p className="more-info-title" onClick={() => eraseFunction(publicationid)}>{t('admin.delete')}</p>
            </div>	
        )
    }
}

function isEditable(t, editable, publicationid) {
    if(editable) {
        return(	
            <div className="more-info">
                <Link to={{pathname: "/EditPublication", search: "?publicationid=" + publicationid}}>
                    <img className="delete" src={pencil} alt="Edit" />
                    <p className="more-info-title">{t('profilepublication.edit')} </p> 
                </Link>
            </div>
        )
    } else {
        return (
            <div className="more-info">
                <Link to={{pathname: "/publications", search: "?publicationid=" + publicationid}}>
                    <p className="more-info-title">{t('list.moreInfo')} ></p>
                </Link>
            </div>
        )
    }
}

const Publication = ({ t , publication, page, faveable, editable, eraseFunction, ready, index }) => {
    let erasableComponent = isErasable(t, eraseFunction, publication.publicationid, page);
    let editableComponent = isEditable(t, editable, publication.publicationid);
        return(
            <div className="polaroid-property">
                <ImgVisualizer
                    publicationid={publication.publicationid}
                    price={publication.price}
                    maxImages={publication.images}
                    page={page}
                    isFavourite={faveable && UserService.isLogged() ? publication.favourite : null}
                    showModal={eraseFunction}
                    imageClass="polaroid-property-img"
                    containerClass="img-with-tag"
                    nextClass="next-image pointer"
                    previousClass="prev-image pointer"
                    setReady={ready}
                    index={index}
                />
                <div className="property-container">
                    <div className="first-column">								
                        <div className="property-title-container">
                            <h3 className="property-title">{publication.title}</h3>
                            <h4 className="address" id="address"> {publication.address}, {publication.neighborhoodid}, {publication.cityid}, {publication.provinceid}</h4>
                        </div>					
                    
                        <div className="property-characteristics">
                            <div className="column-1">
                                <h4 className="littleCharacteristic"><strong>{publication.bedrooms}</strong> {utilFunction.decidePlural(t('list.bedroomSingular'),t('list.bedroomPlural'),publication.bedrooms)}</h4>
                                <h4 className="littleCharacteristic"><strong>{publication.bathrooms}</strong> {utilFunction.decidePlural(t('list.bathroomSingular'),t('list.bathroomPlural'),publication.bedrooms)}</h4>
                                <h4 className="littleCharacteristic"><strong>{publication.parking}</strong> {utilFunction.decidePlural(t('list.parkingSingular'),t('list.parkingPlural'),publication.bedrooms)}</h4>						
                            </div>
                            <div className="column-2">
                                <h4 className="littleCharacteristic"><strong>{publication.dimention}</strong> {t('list.sqmeters')}</h4>
                                <h3 className="bigCharacteristic">{utilFunction.decideOperation(t('list.buy'),t('list.rent'),publication.operation)}</h3>
                            </div>				
                        </div>
                    </div>
                    <div className="second-column">
                        <div className="pub-date">
                            {publication.date}
                        </div>
                        {editableComponent}
                        {erasableComponent}
                    </div>
                </div>
            </div>
        )
}

export default Publication;