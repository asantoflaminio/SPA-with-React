import React from 'react';
import '../css/HomeCard.css';
import * as utilFunction from '../util/function';
import ImgVisualizer from './ImageVisualizer';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import * as axiosRequest from '../util/axiosRequest'

class HomeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
      }

      componentDidMount(){
          let component = this
          axiosRequest.getImage(this.props.publication.publicationID,0, this.props).then(function (img){
              component.setState({
                  image: img
              })
          })
      }

      render(){
          const {t} = this.props
          return(
            <div>
                <li class="polaroid">
                    <ImgVisualizer
                        publicationID={this.props.publication.publicationID}
                        price={this.props.publication.price}
                        maxImages={this.props.publication.images}
                        image={this.state.image}
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
                            <Link to={{pathname: "/publication", search: "?publicationID=" + this.props.publication.publicationID}}>
                                <a class="more-info-home" href="">{t('home.moreInfo')} ></a>
                            </Link>
                        </div>
                </li>
            </div>
          )
    }
}



export default withTranslation()(HomeCard);