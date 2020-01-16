import React from 'react';
import '../css/Profile.css';
import * as utilFunction from '../util/function';
import trash from '../resources/trash.png';
import pencil from '../resources/pencil.png';
import ImageVisualizer from './ImageVisualizer';
import {Link} from 'react-router-dom';


const ProfilePublication = ({ t, publication, image, page, eraseFunction}) => {
    
    return(
        <div class="polaroid-property">
            <ImageVisualizer //hay que cambiar esto
                publicationID={publication.publicationID}
                price={publication.price}
                maxImages={publication.images}
                page={page}
                imageClass="polaroid-property-img"
                containerClass="img-with-tag"
                nextClass="next-image pointer"
                previousClass="prev-image pointer"
            />
            <div class="property-container">
                <div class="first-column">								
                    <div class="property-title-container">
                        <h3 class="property-title">{publication.title}</h3>
                        <h4 class="address" id="address"> {publication.address}, {publication.neighborhoodID}, {publication.cityID}, {publication.provinceID}</h4>
                    </div>					
                    <div class="property-characteristics">
                        <div class="column-1">
                            <h4><strong>{publication.bedrooms}</strong> {utilFunction.decidePlural(t('list.bedroomSingular'),t('list.bedroomPlural'),publication.bedrooms)}</h4>
                            <h4><strong>{publication.bathrooms}</strong> {utilFunction.decidePlural(t('list.bathroomSingular'),t('list.bathroomPlural'),publication.bedrooms)}</h4>
                            <h4 ><strong>{publication.parking}</strong> {utilFunction.decidePlural(t('list.parkingSingular'),t('list.parkingPlural'),publication.bedrooms)}</h4>						
                        </div>
                        <div class="column-2">
                            <h4><strong>{publication.dimention}</strong> {t('list.sqmeters')}</h4>
                            <h3>{utilFunction.decideOperation(t('list.buy'),t('list.rent'),publication.operation)}</h3>
                        </div>				
                    </div>
                </div>
                <div class="second-column">
                    <div class="pub-date">
                        {publication.date}
                    </div>
                    <div class="more-info">
                        <Link to={{pathname: "/EditPublication", search: "?publicationID=" + publication.publicationID}}>
                        <img class="delete" src={pencil} alt="Edit" />
                        <a class="more-info-title">{t('profilepublication.edit')} </a> 
                        </Link>
                    </div>
                    <div class="more-info">
                        <img class="delete" src={trash} alt="Delete" />
                        <a class="more-info-title" onClick={() => eraseFunction(publication.publicationID)}>{t('profilepublication.delete')}</a>
                    </div>	
                </div>
            </div>
        </div>
    )
}

export default ProfilePublication;