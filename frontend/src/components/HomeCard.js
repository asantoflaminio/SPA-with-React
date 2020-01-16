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
                <li class="polaroid">
                    <ImgVisualizer
                        publicationid={this.props.publication.publicationid}
                        price={this.props.publication.price}
                        maxImages={this.props.publication.images}
                        page="Home"
                        imageClass="polaroid-property-img-home"
                        containerClass="arrows-div"
                        nextClass="next-image pointer"
                        previousClass="prev-image pointer"
                        
                    />                  
                    <div class="line_separator"></div>
                        <div class="description_box">
                            <label class="price">U$S {this.props.publication.price}</label>
                            <label  class="expenses">{this.props.publication.title}</label>
                            <label>{this.props.publication.address}</label>
                            <Link to={{pathname: "/publication", search: "?publicationid=" + this.props.publication.publicationid}}>
                                <a class="more-info-home" href="">{t('home.moreInfo')} ></a>
                            </Link>
                        </div>
                </li>
            </div>
          )
    }
}



export default withTranslation()(HomeCard);