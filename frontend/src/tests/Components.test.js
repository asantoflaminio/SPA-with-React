import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import renderer from 'react-test-renderer'
import Navbar from '../components/Navbar'
import HomeCard from '../components/HomeCard'
import { withTranslation } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';

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