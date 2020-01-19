import React from 'react';
import '../css/AdminManagment.css';
import {Link} from 'react-router-dom';

const AdminManagment = ({ t, active }) => (
    <aside>
      	<div className="leftcol">
	       	<ul>
				<li className={(active === "AdminGenerator") ? "current" : null} id="adminLocations">
					<Link to={{pathname: "/AdminGenerator"}}>
						<a href="#">{t('admin.locations')}</a>
					</Link> 
				</li>
				<li className={(active === "AdminUsers") ? "current" : null} id="adminUsers">
					<Link to={{pathname: "/AdminUsers"}}>
						<a href="#">{t('admin.users')}</a>
					</Link>
				</li>
				<li className={(active === "AdminPublications") ? "current" : null} id="adminPublications">
					<Link to={{pathname: "/AdminPublications"}}>
						<a href="#">{t('admin.publications')}</a>
					</Link>
				</li>
			</ul>
      	</div>
	</aside>
)

export default AdminManagment;