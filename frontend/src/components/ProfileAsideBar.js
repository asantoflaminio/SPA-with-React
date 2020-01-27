import React from 'react';
import '../css/ProfileAsideBar.css';
import {Link} from 'react-router-dom';

const ProfileAsideBar = ({ t, active }) => (

    <aside>
      	<div className="leftcol">
	       	<ul>
			   <Link to={{pathname: "/MyPublications"}}>
					<li className={(active === "MyPublications") ? "current" : null} id="pub">
						<p>{t('profileAsideBar.optionPublications')}</p>
					</li>
				</Link> 
				<Link to={{pathname: "/MyInformation"}}>
					<li className={(active === "MyInformation") ? "current" : null} id="dat">
						<p>{t('profileAsideBar.optionData')}</p>
					</li>
				</Link>
				<Link to={{pathname: "/MyFavourites"}}>
					<li className={(active === "MyFavourites") ? "current" : null} id="fav">
						<p>{t('profileAsideBar.optionFavorites')}</p>
					</li>
				</Link>
			</ul>
      	</div>
	</aside>
)
export default ProfileAsideBar;