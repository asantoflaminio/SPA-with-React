import React from 'react';
import {
    GoogleMap, 
    withScriptjs,
    withGoogleMap,
    Marker
} from 'react-google-maps'

const MapContainer = ({ t }) => {
    return (
        <GoogleMap 
        defaultZoom={10}
        defaultCenter={{lat: -34.397, lng: 150.644 }}>

        <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>

        
    );
};

export default withScriptjs(
    withGoogleMap(
        MapContainer
    )
)