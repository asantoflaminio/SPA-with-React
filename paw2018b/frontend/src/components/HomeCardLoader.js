import React from 'react';
import ContentLoader from 'react-content-loader';

const HomeCardLoader = () => (
	<ContentLoader height={100} width={50}>
		<rect x='2.5' y='2' width='45' height='30' />
		<rect x='0' y='35' width='50' height='0.3' />
		<rect x='3' y='38' rx='3' ry='3' width='25' height='5' />
		<rect x='3' y='45' rx='3' ry='3' width='35' height='3' />
		<rect x='3' y='50' rx='3' ry='3' width='35' height='3' />
		<rect x='23' y='56' rx='3' ry='3' width='25' height='3' />
	</ContentLoader>
);

export default HomeCardLoader;
