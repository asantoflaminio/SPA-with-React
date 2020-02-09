import React from 'react';
import {Link} from 'react-router-dom';

const AdminManagment = ({t, active}) => (
	<aside>
		<div className='leftcol'>
			<ul>
				<Link to={{pathname: '/AdminGenerator'}}>
					<li className={active === 'AdminGenerator' ? 'current' : null} id='adminLocations'>
						<p className='aside-option'>{t('admin.locations')}</p>
					</li>
				</Link>
				<Link to={{pathname: '/AdminUsers'}}>
					<li className={active === 'AdminUsers' ? 'current' : null} id='adminUsers'>
						<p className='aside-option'>{t('admin.users')}</p>
					</li>
				</Link>
				<Link to={{pathname: '/AdminPublications'}}>
					<li className={active === 'AdminPublications' ? 'current' : null} id='adminPublications'>
						<p className='aside-option'>{t('admin.publications')}</p>
					</li>
				</Link>
			</ul>
		</div>
	</aside>
);

export default AdminManagment;
