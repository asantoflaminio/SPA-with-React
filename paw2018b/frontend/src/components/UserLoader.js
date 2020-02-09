import React from 'react';
import ContentLoader from 'react-content-loader';

const UserLoader = () => (
	<ContentLoader height={50} width={400}>
		<rect x='1' y='2.5' width='398' height='0.3' />
		<rect x='2' y='20' width='125' rx='10' ry='10' height='10' />
		<rect x='290' y='20' width='75' rx='10' ry='10' height='10' />
		<rect x='370' y='21' width='25' rx='5' ry='5' height='7' />
		<circle cx='375' cy='24' r='6' />
	</ContentLoader>
);

export default UserLoader;
