import React from 'react';
import '../css/ProfileAsideBar.css';
import {Link} from 'react-router-dom';

const ProfileAsideBar = ({ t, active }) => (

    <aside>
      	<div className="leftcol">
	       	<ul>
				<li className={(active === "MyPublications") ? "current" : null} id="pub">
					<Link to={{pathname: "/MyPublications"}}>
						<a href="#">{t('profileAsideBar.optionPublications')}</a>
					</Link> 
				</li>
				<li className={(active === "MyInformation") ? "current" : null} id="dat">
					<Link to={{pathname: "/MyInformation"}}>
						<a href="#">{t('profileAsideBar.optionData')}</a>
					</Link>
				</li>
				<li className={(active === "MyFavourites") ? "current" : null} id="fav">
					<Link to={{pathname: "/MyFavourites"}}>
						<a href="#">{t('profileAsideBar.optionFavorites')}</a>
					</Link>
				</li>
			</ul>
      	</div>
	</aside>
)
export default ProfileAsideBar;