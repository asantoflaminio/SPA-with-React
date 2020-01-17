import React from 'react';
import '../css/ProfileAsideBar.css';
import {Link} from 'react-router-dom';

const ProfileAsideBar = ({ t }) => (

    <aside>
      	<div className="leftcol">
	       	<ul>
				<li id="pub">
					<Link to={{pathname: "/MyPublications"}}>
						<a href="./MyPublications">{t('profileAsideBar.optionPublications')}</a>
					</Link> 
				</li>
				<li id="dat">
					<Link to={{pathname: "/MyInformation"}}>
						<a href="./MyInformation">{t('profileAsideBar.optionData')}</a>
					</Link>
				</li>
				<li id="fav">
					<Link to={{pathname: "/MyFavorites"}}>
						<a href="./MyFavorites">{t('profileAsideBar.optionFavorites')}</a>
					</Link>
				</li>
			</ul>
      	</div>
	</aside>
)
export default ProfileAsideBar;