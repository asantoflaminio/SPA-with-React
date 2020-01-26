import React from 'react';
import '../css/AdminManagment.css';
import {Link} from 'react-router-dom';

const AdminManagment = ({ t, active }) => (
    <aside>
      	<div className="leftcol">
	       	<ul>
			   <Link to={{pathname: "/AdminGenerator"}}>
					<li className={(active === "AdminGenerator") ? "current" : null} id="adminLocations">
						<p>{t('admin.locations')}</p>
					</li>
				</Link>
				<Link to={{pathname: "/AdminUsers"}}>
					<li className={(active === "AdminUsers") ? "current" : null} id="adminUsers">
						<p>{t('admin.users')}</p>
					</li>
				</Link>
				<Link to={{pathname: "/AdminPublications"}}>
					<li className={(active === "AdminPublications") ? "current" : null} id="adminPublications">
						<p>{t('admin.publications')}</p>
					</li>
				</Link>
			</ul>
      	</div>
	</aside>
)

export default AdminManagment;