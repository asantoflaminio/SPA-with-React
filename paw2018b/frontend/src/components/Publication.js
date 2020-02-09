import React from 'react';
import '../css/Publication.css';
import * as utilFunction from '../util/function';
import trash from '../resources/trash.png';
import pencil from '../resources/pencil.png';
import ImgVisualizer from './ImageVisualizer';
import {Link} from 'react-router-dom';
import UserService from '../services/UserService';

function isEditableErasable(t, editable, eraseFunction, page, publicationid) {
	if (eraseFunction && page !== 'MyFavorites' && editable) {
		return (
			<div className='more-info2'>
				<div>
					<img
						className='delete delete-icon'
						src={trash}
						alt='Delete'
						onClick={() => eraseFunction(publicationid)}
					/>
					<p className='more-info-title delete-title' onClick={() => eraseFunction(publicationid)}>
						{t('admin.delete')}
					</p>
				</div>
				<div>
					<Link to={{pathname: '/EditPublication', search: '?publicationid=' + publicationid}}>
						<img className='delete edit-icon' src={pencil} alt='Edit' />
						<p className='more-info-title edit-title'>{t('profilepublication.edit')} </p>
					</Link>
				</div>
			</div>
		);
	}

	if (eraseFunction && page !== 'MyFavorites') {
		return (
			<div className='more-info2'>
				<div>
					<img
						className='delete delete-icon2'
						src={trash}
						alt='Delete'
						onClick={() => eraseFunction(publicationid)}
					/>
					<p className='more-info-title delete-title' onClick={() => eraseFunction(publicationid)}>
						{t('admin.delete')}
					</p>
				</div>
				<div>
					<Link to={{pathname: '/publications', search: '?publicationid=' + publicationid}}>
						<p className='more-info-title edit-title'>{t('list.moreInfo')} ></p>
					</Link>
				</div>
			</div>
		);
	}

	if (editable) {
		return (
			<div className='more-info2'>
				<Link to={{pathname: '/EditPublication', search: '?publicationid=' + publicationid}}>
					<img className='delete' src={pencil} alt='Edit' />
					<p className='more-info-title'>{t('profilepublication.edit')} </p>
				</Link>
			</div>
		);
	} else {
		return (
			<div className='more-info'>
				<Link to={{pathname: '/publications', search: '?publicationid=' + publicationid}}>
					<p className='more-info-title'>{t('list.moreInfo')} ></p>
				</Link>
			</div>
		);
	}
}

const Publication = ({t, publication, page, faveable, editable, eraseFunction, ready, index}) => {
	let editableErasableComponent = isEditableErasable(t, editable, eraseFunction, page, publication.publicationid);
	var res = publication.date.split(':');
	var pubDate = res[0] + ':' + res[1];
	return (
		<div className='polaroid-property'>
			<ImgVisualizer
				publicationid={publication.publicationid}
				price={publication.price}
				maxImages={publication.images}
				page={page}
				isFavourite={faveable && UserService.isLogged() ? publication.favourite : null}
				showModal={eraseFunction}
				imageClass='polaroid-property-img'
				containerClass='img-with-tag'
				nextClass='next-image pointer'
				previousClass='prev-image pointer'
				setReady={ready}
				index={index}
			/>
			<div className='property-container'>
				<div className='first-column'>
					<div className='property-title-container'>
						<h3 className='property-title'>{publication.title}</h3>
						<h4 className='address' id='address'>
							{' '}
							{publication.address}, {publication.neighborhoodid}, {publication.cityid}, {publication.provinceid}
						</h4>
					</div>

					<div className='property-characteristics'>
						<div className='column-1'>
							<h4 className='littleCharacteristic'>
								<strong>{publication.bedrooms}</strong>{' '}
								{utilFunction.decidePlural(
									t('list.bedroomSingular'),
									t('list.bedroomPlural'),
									publication.bedrooms,
								)}
							</h4>
							<h4 className='littleCharacteristic'>
								<strong>{publication.bathrooms}</strong>{' '}
								{utilFunction.decidePlural(
									t('list.bathroomSingular'),
									t('list.bathroomPlural'),
									publication.bedrooms,
								)}
							</h4>
							<h4 className='littleCharacteristic'>
								<strong>{publication.parking}</strong>{' '}
								{utilFunction.decidePlural(
									t('list.parkingSingular'),
									t('list.parkingPlural'),
									publication.bedrooms,
								)}
							</h4>
						</div>
						<div className='column-2'>
							<h4 className='littleCharacteristic'>
								<strong>{publication.dimention}</strong> {t('list.sqmeters')}
							</h4>
							{publication.expenses === '-1' ? null : (
								<h4 className='littleCharacteristic'>
									{t('details.expenses')} <strong>U$S {publication.expenses}</strong>{' '}
								</h4>
							)}
							<h4 className='littleCharacteristic'>
								<strong>
									{utilFunction.decideOperation(t('list.forsale'), t('list.forrent'), publication.operation)}
								</strong>
							</h4>
						</div>
					</div>
				</div>
				<div className='second-column'>
					<div className='pub-date'>{pubDate}</div>
					{editableErasableComponent}
				</div>
			</div>
		</div>
	);
};

export default Publication;
