import React from 'react';
import {
    GoogleMap, 
    withScriptjs,
    withGoogleMap,
    Marker
} from 'react-google-maps'
import Geocode from "react-geocode";
import credentials from '../components/credentials'





class MapContainer extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          address : props.address,
          neighborhood: props.neighborhood,
          city : props.city,
          province : props.province,
          lat: null,
          lng: null
      };
    }

    componentDidUpdate(prevProps) {
      if (prevProps.neighborhood !== this.props.neighborhood) {
          this.setState({neighborhood: this.props.neighborhood});;
          let component = this
          Geocode.setApiKey(credentials.mapsKey);
          Geocode.setRegion("AR");
          const fullAddress = this.props.address + ", " + this.props.neighborhood + ", " + this.props.city + ", " + this.props.province
          //alert(fullAddress);
          Geocode.fromAddress(fullAddress).then(
            response => {
              const latResponse = response.results[0].geometry.location.lat;
              const lngResponse = response.results[0].geometry.location.lng;
              component.setState({
                lat: latResponse,
                lng: lngResponse
              })
            },
            error => {
              console.error(error);
            }
          );
      }
    }



    render(){
      const X = this.state.lat;
      const Y = this.state.lng;
      if(X && Y) {
        return (
          
          <GoogleMap 
          zoom={16}
          center={{lat: X, lng: Y}}
         >
          <Marker position={{lat: X, lng: Y}}/>
          </GoogleMap>
  
          
      );
      }
      else {
        return (
          
          <GoogleMap 
          defaultZoom={4}
          defaultCenter={{lat: -34.208, lng: -64.7}}>>
          </GoogleMap>

          
      );
      } 
      
  }
}

export default withScriptjs(
    withGoogleMap(
        MapContainer
    )
)