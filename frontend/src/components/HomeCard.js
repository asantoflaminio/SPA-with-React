import React from 'react';
import '../css/HomeCard.css';
import ImgVisualizer from './ImageVisualizer';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class HomeCard extends React.Component {
    render(){
        const {t} = this.props
        return(
            <div>
                <li className="polaroid">
                    <ImgVisualizer
                        publicationid={this.props.publication.publicationid}
                        price={this.props.publication.price}
                        maxImages={this.props.publication.images}
                        isFavourite={this.props.publication.favourite}
                        setReady={this.props.ready}
                        index={this.props.index}
                        page="Home"
                        imageClass="polaroid-property-img-home"
                        containerClass="arrows-div"
                        nextClass="next-image pointer"
                        previousClass="prev-image pointer"
                        
                    />                  
                    <div className="line_separator"></div>
                        <div className="description_box">
                            <label className="price">U$S {this.props.publication.price}</label>
                            <label  className="expenses">{this.props.publication.title}</label>
                            <label>{this.props.publication.address}</label>
                            <Link to={{pathname: "/publications", search: "?publicationid=" + this.props.publication.publicationid}}>
                                <p className="more-info-home">{t('home.moreInfo')} ></p>
                            </Link>
                        </div>
                </li>
            </div>
          )
    }
}



export default withTranslation()(HomeCard);