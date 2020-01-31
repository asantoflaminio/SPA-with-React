import Details from '../pages/Details'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LocationService from '../services/LocationService'
import PublicationService from '../services/PublicationService'
import UserService from '../services/UserService'
import CancelTokenService from '../services/CancelRequestService'
import ErrorService from '../services/ErrorService'
import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Details component', () => {
    it('renders correctly', () => {
        const rendered = shallow(<Details/>);
        expect(rendered).toMatchSnapshot();
    });
    // it('renders correctly with params', () => {
    //     const rendered = shallow(<RegisterPopup/>);
    //     expect(rendered.find('#name')).toHaveLength(1);
    //     expect(rendered.find('#surname')).toHaveLength(1);
    //     expect(rendered.find('#dni')).toHaveLength(1);
    //     expect(rendered.find('#phone')).toHaveLength(1);
    //     expect(rendered.find('#email')).toHaveLength(1);
    //     expect(rendered.find('#repeatEmail')).toHaveLength(1);
    //     expect(rendered.find('#username-r')).toHaveLength(1);
    //     expect(rendered.find('#password-r')).toHaveLength(1);
    //     expect(rendered.find('#repeatPassword')).toHaveLength(1);
    // });
    // it('renders RegisterToApiButton child component correctly', function () {
    //     const rendered = shallow(<RegisterPopup/>);
    //     expect(rendered.find(RegisterToApiButton)).toHaveLength(1);
    // });
});

// describe('RegisterToApiButton component', () => {
//     it('renders error1 correctly', () => {
//         const rendered = shallow(<RegisterToApiButton/>);
//         rendered.setState({isLoading: false, error: 1});
//         expect(rendered.find('#error1')).toHaveLength(1);
//     });
//     it('renders error2 correctly', () => {
//         const rendered = shallow(<RegisterToApiButton/>);
//         rendered.setState({isLoading: false, error: 2});
//         expect(rendered.find('#error2')).toHaveLength(1);
//     });
//     it('renders error3 correctly', () => {
//         const rendered = shallow(<RegisterToApiButton/>);
//         rendered.setState({isLoading: false, error: 3});
//         expect(rendered.find('#error3')).toHaveLength(1);
//     });
//     it('renders error4 correctly', () => {
//         const rendered = shallow(<RegisterToApiButton/>);
//         rendered.setState({isLoading: false, error: 4});
//         expect(rendered.find('#error4')).toHaveLength(1);
//     });
// });