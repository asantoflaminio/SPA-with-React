import React from 'react';
import '../css/ProfileAsideBar.css';
import logo from '../resources/Logo4.png';
import {Link} from 'react-router-dom';

const ProfileAsideBar = ({ t }) => (

    <aside>
      	<div class="leftcol">
	       	<ul>
				<li id="pub">
					<Link to={{pathname: "/MyPublications"}}>
						<a>{t('profileAsideBar.optionPublications')}</a>
					</Link> 
				</li>
				<li id="dat"><a href="#">{t('profileAsideBar.optionData')}</a></li>
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