import Details from '../../pages/Details';
import Home from '../../pages/Home';
import List from '../../pages/List';
import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyInformation from '../../pages/MyInformation';
import MyFavourites from '../../pages/MyFavourites';
import MyPublications from '../../pages/MyPublications';

configure({adapter: new Adapter()});

const publicationDTO = {
	title: 'test',
	provinceid: '123',
	cityid: '123',
	neighborhoodid: '123',
	address: 'street 123',
	operation: 'FSale',
	price: '400000',
	description: 'Nice apartment',
	propertyType: 'Apartment',
	bedrooms: '3',
	bathrooms: '2',
	dimention: '80',
	parking: '3',
	coveredFloorSize: '80',
	balconies: '2',
	amenities: 'SUM',
	storage: 'Yes',
	expenses: '2000',
	publicationid: 123,
	date: 'testDate',
	images: 0,
	userEmail: 'test@mail.com',
	phoneNumber: '00000000',
	isFavourite: false,
};

describe('Details component', () => {
	it('renders correctly', () => {
		const rendered = shallow(<Details />);
		expect(rendered).toMatchSnapshot();
	});

	it('renders with parameters correctly', () => {
		const rendered = shallow(
			<Details
				publication={publicationDTO}
				circleLoading={false}
				error={null}
				loading={false}
				showModal={false}
				code={null}
			/>,
		);
		expect(rendered).toMatchSnapshot();
	});
});

describe('List component', () => {
	it('renders correctly', () => {
		const rendered = shallow(<List />);
		expect(rendered).toMatchSnapshot();
	});

	it('renders with parameters correctly', () => {
		const rendered = shallow(
			<List
				loadingPublications={false}
				publications={[publicationDTO]}
				operation={'FSale'}
				propertyType={'Apartment'}
				page={0}
			/>,
		);
		expect(rendered).toMatchSnapshot();
	});
});

describe('Home component', () => {
	it('renders correctly', () => {
		const rendered = shallow(<Home />);
		expect(rendered).toMatchSnapshot();
	});
	it('renders with parameters correctly', () => {
		const rendered = shallow(
			<Home loading={false} publicationsSale={[publicationDTO]} operation={'FSale'} propertyType={'Apartment'} />,
		);
		expect(rendered).toMatchSnapshot();
	});
});

describe('MyFavourites component', () => {
	it('renders correctly', () => {
		const rendered = shallow(<MyFavourites />);
		expect(rendered).toMatchSnapshot();
	});
});

describe('MyInformation component', () => {
	it('renders correctly', () => {
		const rendered = shallow(<MyInformation />);
		expect(rendered).toMatchSnapshot();
	});

	it('renders with parameters correctly', () => {
		const rendered = shallow(
			<MyInformation
				firstName={'TestName'}
				lastName={'TestLastName'}
				email={'test@mail.com'}
				phoneNumber={'150000000'}
				publicationsSale={[publicationDTO]}
				operation={'FSale'}
				propertyType={'Apartment'}
			/>,
		);
		expect(rendered).toMatchSnapshot();
	});
});

describe('MyPublications component', () => {
	it('renders correctly', () => {
		const rendered = shallow(<MyPublications />);
		expect(rendered).toMatchSnapshot();
	});

	it('renders with parameters correctly', () => {
		const rendered = shallow(
			<MyPublications
				initialPage={0}
				myPublicationsCounter={1}
				myPublications={[publicationDTO]}
				page={0}
				pagesQuantity={1}
			/>,
		);
		expect(rendered).toMatchSnapshot();
	});
});
