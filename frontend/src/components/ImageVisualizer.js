import React from 'react';
import { withTranslation } from 'react-i18next';
import nextArrow from '../resources/arrow_right.png';
import previousArrow from '../resources/arrow_left.png';
import heartFilled from '../resources/heart_filled.png';
import * as utilFunction from '../util/function';
import * as axiosRequest from '../util/axiosRequest';

class ImageVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index : 0,
        }
      }

    getNextImage = (partID) => {
        let id = partID + this.props.publicationID;
        let img = document.getElementById(id);
        let currentIndex = this.state.index
        let nextIndex;
        
        if(currentIndex + 1 === this.props.maxImages)
            nextIndex = 0;
        else
            nextIndex = currentIndex + 1;
    
        let component = this;
        axiosRequest.getImage(this.props.publicationID,nextIndex).then(function (src){
            img.src = utilFunction.setSRC(src)
            component.setState({
                index: nextIndex
            })
        })

    }
    
    getPreviousImage = (partID) => {
        let id = partID + this.props.publicationID;
        let img = document.getElementById(id);
        let currentIndex = this.state.index
        let previousIndex;
    
        if(currentIndex - 1 < 0)
            previousIndex = this.props.maxImages - 1;
        else
            previousIndex = currentIndex - 1;
    
        let component = this
        axiosRequest.getImage(this.props.publicationID,previousIndex).then(function (src){
            img.src = utilFunction.setSRC(src)
            component.setState({
                index: previousIndex
            })
        })
    
    }

    render(){
        let price;
        if(this.props.price != null){
            price = <h2 class="price-tag">U$S {this.props.price}</h2>
        }

        return(
            <div class={this.props.containerClass}>
                <img class={this.props.imageClass} id={this.props.page + this.props.publicationID} src={utilFunction.setSRC(this.props.image)} />
                <img class="favorite-icon" src={heartFilled} alt="Fave" />
                <img class={this.props.previousClass} src={previousArrow} alt="Previous" onClick={() => this.getPreviousImage(this.props.page)}/>
                <img class={this.props.nextClass} src={nextArrow} alt="Next" onClick={() => this.getNextImage(this.props.page)}/>
                {price}
            </div>
           
        )
    }

}

export default withTranslation()(ImageVisualizer);