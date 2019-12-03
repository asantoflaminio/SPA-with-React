import React from 'react';
import '../css/ProfileAsideBar.css';
import logo from '../resources/Logo4.png';
import {Link} from 'react-router-dom';

const ProfileAsideBar = ({ t }) => (

    <aside>
      	<div class="leftcol">
	       	<ul>
	       		<li id="pub"><a href="#">{t('profileAsideBar.optionPublications')}</a></li>
		        <li id="dat"><a href="#">{t('profileAsideBar.optionData')}</a></li>
		        <li id="fav"><a href="#">{t('profileAsideBar.optionFavorites')}</a></li>
	        </ul>
      	</div>
	</aside>
)
export default ProfileAsideBar;