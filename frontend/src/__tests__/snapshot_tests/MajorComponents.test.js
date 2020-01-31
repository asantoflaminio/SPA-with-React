import Details from '../../pages/Details'
import Home from '../../pages/Home'
import List from '../../pages/List'
import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyInformation from '../../pages/MyInformation';
import MyFavourites from '../../pages/MyFavourites';
import MyPublications from '../../pages/MyPublications';

configure({adapter: new Adapter()});

describe('Details component', () => {
    it('renders correctly', () => {
        const rendered = shallow(<Details/>);
        expect(rendered).toMatchSnapshot();
    });
});

describe('List component', () => {
    it('renders correctly', () => {
        const rendered = shallow(<List/>);
        expect(rendered).toMatchSnapshot();
    });
});

describe('MyFavourites component', () => {
    it('renders correctly', () => {
        const rendered = shallow(<MyFavourites/>);
        expect(rendered).toMatchSnapshot();
    });
});

describe('MyInformation component', () => {
    it('renders correctly', () => {
        const rendered = shallow(<MyInformation/>);
        expect(rendered).toMatchSnapshot();
    });
});

describe('MyPublications component', () => {
    it('renders correctly', () => {
        const rendered = shallow(<MyPublications/>);
        expect(rendered).toMatchSnapshot();
    });
});
