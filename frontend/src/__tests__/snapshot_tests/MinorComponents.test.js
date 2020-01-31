import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../App'
import renderer from 'react-test-renderer'
import Navbar from '../../components/Navbar'
import HomeCard from '../../components/HomeCard'
import { withTranslation } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import ImageVisualizer from '../../components/ImageVisualizer'
import ToastNotification from '../../components/ToastNotification'
import MapContainer from '../../components/MapContainer'
import credentials from '../../components/credentials'
import Publication from '../../components/Publication'

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}` ;

describe('homecardTest', () => {

    const testPublication  = {
        publicationid: Math.floor(Math.random() * 20),
        price: Math.floor(Math.random() * 20),
        images: '0',
        favourite: 'true',
        title: 'Test Title',
        address: 'Test Address'
      };
    
    it('matches the snapshot', () => {
        const tree = renderer.create(<Router><HomeCard publication={testPublication} ready={null} index= {0}/></Router>).toJSON;
        expect(tree).toMatchSnapshot();
    })
});


describe('navbarTest', () => {
    
    it('matches the snapshot', () => {
        const tree = renderer.create(<Router><Navbar /></Router>).toJSON;
        expect(tree).toMatchSnapshot();
    })
});

describe('toastTest', () => {
    
    it('matches the snapshot', () => {
        const tree = renderer.create(<Router><ToastNotification title={'Test'} information={'Test'} checkModal={true}/></Router>).toJSON;
        expect(tree).toMatchSnapshot();
    })
});

describe('mapContainerTest', () => {
    
    it('matches the snapshot', () => {
        const tree = renderer.create(<Router><MapContainer address={'Av. Eduardo Madero 399'} 
        neighborhood={'Puerto Madero'} city={'CABA'} province={'CABA'}
        googleMapURL= {mapURL}
        containerElement= {<div style={{height: '300px'}}/>}
        mapElement= {<div style={{height:'100%'}} />}
        loadingElement= {<p></p>}/></Router>).toJSON;
        expect(tree).toMatchSnapshot();
    })
});

describe('publicationTest', () => {

    const myMock = jest.fn();

    const testPublication  = {
        publicationid: Math.floor(Math.random() * 20),
        price: Math.floor(Math.random() * 20),
        images: '0',
        favourite: 'true',
        title: 'Test Title',
        address: 'Test Address',
        bathrooms: '2',
        parking: '0',
        bedrooms: '2',
        dimention: '200'
      };

    
    it('matches the snapshot', () => {
        const tree = renderer.create(<Router><Publication publication={testPublication} t={myMock} ready={null} index= {0}/></Router>).toJSON;
        expect(tree).toMatchSnapshot();
    })
});