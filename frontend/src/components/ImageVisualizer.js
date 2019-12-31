import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import nextArrow from '../resources/arrow_right.png';
import previousArrow from '../resources/arrow_left.png';
import heartFilled from '../resources/heart_filled.png';
import heartEmpty from '../resources/heart.png'
import * as utilFunction from '../util/function';
import PublicationService from '../services/PublicationService';
import JsonService from '../services/JsonService'
import UserService from '../services/UserService'

class ImageVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index : 0,
            isFavourite : false
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
        let names = ["publicationID","index"]
        let values = [this.props.publicationID,nextIndex]
        PublicationService.getImage(JsonService.createJSONArray(names,values), this.props).then(function (src){
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
        let names = ["publicationID","index"]
        let values = [this.props.publicationID,previousIndex]
        PublicationService.getImage(JsonService.createJSONArray(names,values), this.props).then(function (src){
            img.src = utilFunction.setSRC(src)
            component.setState({
                index: previousIndex
            })
        })
    }

    componentDidMount(){
        let currentComponent = this
        if(UserService.isLogged()){
            let names = ["id"]
            let values = [this.props.publicationID]
            PublicationService.isFavourite(JsonService.createJSONArray(names,values),this.props).then(function (request){
                currentComponent.setState({
                    isFavourite : request.response
                })
            })
        }
    }

    favouritePublication(boolean){
        let names = ["id"]
        let values = [this.props.publicationID]
        let currentComponent = this;
        if(boolean){
            UserService.favouritePublication(JsonService.createJSONArray(names,values),this.props).then(function (){
                currentComponent.setState({
                    isFavourite: boolean
                })
            })
        }
        else{
            UserService.unfavouritePublication(JsonService.createJSONArray(names,values),this.props).then(function (){
                currentComponent.setState({
                    isFavourite: boolean
                })
            })
        }
    }

    render(){
        let price;
        let favIcon;
        if(this.props.price != null){
            price = <h2 class="price-tag">U$S {this.props.price}</h2>
        }
        if(UserService.isLogged()){
            if(this.state.isFavourite)
                favIcon = <img class="favorite-icon" src={heartFilled} onClick={() => this.favouritePublication(! this.state.isFavourite)} alt="Fave" />
            else
                favIcon = <img class="favorite-icon" src={heartEmpty} onClick={() => this.favouritePublication(! this.state.isFavourite)} alt="Fave" />
        }

                
        

        return(
            <div class={this.props.containerClass}>
                <img class={this.props.imageClass} alt="img" id={this.props.page + this.props.publicationID} src={utilFunction.setSRC(this.props.image)} />
                {favIcon}
                <img class={this.props.previousClass} src={previousArrow} alt="Previous" onClick={() => this.getPreviousImage(this.props.page)}/>
                <img class={this.props.nextClass} src={nextArrow} alt="Next" onClick={() => this.getNextImage(this.props.page)}/>
                {price}
            </div>
           
        )
    }

}

export default withRouter(withTranslation()(ImageVisualizer));