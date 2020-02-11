import React from 'react';
import {withTranslation} from 'react-i18next';
import {withRouter} from 'react-router';
import ReactPaginate from 'react-paginate';
import Publication from '../components/Publication';
import PublicationLoader from '../components/PublicationLoader';
import FilterLoader from '../components/FilterLoader';
import arrowDown from '../resources/arrow_down.png';
import arrowUp from '../resources/arrow_up.png';
import PublicationService from '../services/PublicationService';
import ErrorService from '../services/ErrorService';
import CancelTokenService from '../services/CancelRequestService';
import LocalStorageService from '../services/LocalStorageService';
import * as utilFunction from '../util/function';
import * as Constants from '../util/Constants';
import * as StatusCode from '../util/StatusCode';
import '../css/list.css';
import '../css/Pagination.css';


class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			resultsQuantity: 0,
			loadingPublications: false,
			loadingFilters: false,
			publications: [],
			readyPublications: 0,
			operation: '',
			propertyType: '',
			address: '',
			minPrice: '',
			maxPrice: '',
			minFloorSize: '',
			maxFloorSize: '',
			bedrooms: '',
			bathrooms: '',
			parking: '',
			order: Constants.NEWEST_PUBLICATION,
			page: this.setInitialPage(),
			pagesQuantity: 0,
			filters: null,
		};
		this.setReady = this.setReady.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		const queryString = require('query-string');
		const query = queryString.parse(this.props.location.search);
		let names = [
			'address',
			'operation',
			'propertyType',
			'minPrice',
			'maxPrice',
			'minFloorSize',
			'maxFloorSize',
			'bedrooms',
			'bathrooms',
			'parking',
			'page',
		];
		let values = [
			query.address,
			query.operation,
			query.propertyType,
			query.minPrice,
			query.maxPrice,
			query.minFloorSize,
			query.maxFloorSize,
			query.bedrooms,
			query.bathrooms,
			query.parking,
			this.setInitialPage(),
		];
		document.getElementById("search-holder").value = query.address;
		this.updatePublications(names, values, true);
		this.selectOperation(query.operation);
		this.selectPropertyType(query.propertyType);
		document.getElementById("search-holder").addEventListener('keydown', this.onKeyPressed);
		this.openFilters();
	}

	updatePublications(names, values, updateFilters) {
		let queryParameters = this.generateQueryParametersPackage();
		this.updateQueryParameters(queryParameters, names, values);
		let currentComponent = this;
		if (updateFilters === true) this.setState({loadingPublications: true, loadingFilters: true});
		else this.setState({loadingPublications: true});
		this.disableButtons();
		LocalStorageService.initializeCounter()
		PublicationService.getPublications(queryParameters).then(function(response) {
			if (CancelTokenService.isCancel(response)) return;
			if (response.status !== StatusCode.OK) {
				ErrorService.logError(currentComponent.props, response);
				return;
			}
			currentComponent.markSamePublications(currentComponent.state.publications, response.data);
			currentComponent.setState({
				publications: response.data,
				resultsQuantity: response.headers['x-total-count'],
				pagesQuantity: Math.ceil(response.headers['x-total-count'] / Constants.LIST_MAX_PUBLICATIONS),
				page: queryParameters.page,
				operation: queryParameters['operation'],
				propertyType: queryParameters['propertyType'],
				address: queryParameters['address'],
				minPrice: queryParameters['minPrice'],
				maxPrice: queryParameters['maxPrice'],
				minFloorSize: queryParameters['minFloorSize'],
				maxFloorSize: queryParameters['maxFloorSize'],
				bedrooms: queryParameters['bedrooms'],
				bathrooms: queryParameters['bathrooms'],
				parking: queryParameters['parking'],
				order: queryParameters['order'],
				readyPublications: 0
			});
			if (response.headers['x-total-count'] === '0') currentComponent.setState({loadingPublications: false});
			if (updateFilters === true) currentComponent.updateFilters(queryParameters);

			currentComponent.enableButtons();

			currentComponent.pushParameters(names, values);
		});
	}

	updateFilters(queryParameters) {
		let currentComponent = this;
		PublicationService.getFilters(queryParameters).then(function(response) {
			if (CancelTokenService.isCancel(response)) return;
			if (response.status !== StatusCode.OK) {
				ErrorService.logError(currentComponent.props, response);
				return;
			}
			currentComponent.setState({
				filters: response.data,
				loadingPublications: false
			});
			currentComponent.hideEmptyFilters(response.data, 'locations', 'filterLocationHeader');
			currentComponent.hideEmptyFilters(response.data, 'bedrooms', 'filterBedroomsHeader');
			currentComponent.hideEmptyFilters(response.data, 'bathrooms', 'filterBathroomsHeader');
			currentComponent.hideEmptyFilters(response.data, 'parking', 'filterParkingHeader');
			currentComponent.setState({loadingFilters: false});
		});
	}

	generateQueryParametersPackage() {
		const query = {
			operation: this.state.operation,
			propertyType: this.state.propertyType,
			address: this.state.address,
			minPrice: this.state.minPrice,
			maxPrice: this.state.maxPrice,
			minFloorSize: this.state.minFloorSize,
			maxFloorSize: this.state.maxFloorSize,
			bedrooms: this.state.bedrooms,
			bathrooms: this.state.bathrooms,
			parking: this.state.parking,
			order: this.state.order,
			page: this.state.page,
			limit: Constants.LIST_MAX_PUBLICATIONS,
		};
		return query;
	}

	updateQueryParameters(queryParameters, names, values) {
		for (let i = 0; i < names.length; i++) {
			queryParameters[names[i]] = values[i];
		}
	}
	markSamePublications(prevPublications, newPublications) {
		let equals = 0;
		for (let i = 0; i < prevPublications.length; i++) {
			for (let j = 0; j < newPublications.length; j++) {
				if (prevPublications[i].publicationid === newPublications[j].publicationid) {
					let currentReady = this.state.readyPublications
					this.setState({readyPublications: currentReady + 1})
					equals++;
				}
			}
		}
		if (equals === newPublications.length) this.setReady();
	}

	closeFilters() {
		let filterLocation = document.getElementById('filterLocation');
		let filterPrice = document.getElementById('filterPrice');
		let filterFloorSize = document.getElementById('filterFloorSize');
		let filterBedrooms = document.getElementById('filterBedrooms');
		let filterBathrooms = document.getElementById('filterBathrooms');
		let filterParking = document.getElementById('filterParking');
		filterLocation.classList.remove('show');
		filterPrice.classList.remove('show');
		filterFloorSize.classList.remove('show');
		filterBedrooms.classList.remove('show');
		filterBathrooms.classList.remove('show');
		filterParking.classList.remove('show');
	}

	openFilters() {
		let filterLocation = document.getElementById('filterLocation');
		let filterPrice = document.getElementById('filterPrice');
		let filterFloorSize = document.getElementById('filterFloorSize');
		let filterBedrooms = document.getElementById('filterBedrooms');
		let filterBathrooms = document.getElementById('filterBathrooms');
		let filterParking = document.getElementById('filterParking');
		filterLocation.classList.add('show');
		filterPrice.classList.add('show');
		filterFloorSize.classList.add('show');
		filterBedrooms.classList.add('show');
		filterBathrooms.classList.add('show');
		filterParking.classList.add('show');
	}


	hideEmptyFilters(filters, field, id) {
		if (Object.keys(filters[field]).length <= 1){
			document.getElementById(id).style.display = 'none';
			this.hideFilter(field);
		} else {
			document.getElementById(id).style.display = 'block';
		}
	}

	getResults(t) {
		if (this.state.resultsQuantity > 1 || this.state.resultsQuantity === 0)
			return (
				<h3 id='order-title'>
					{this.state.resultsQuantity} {t('list.resultsTitle')}
				</h3>
			);
		else
			return (
				<h3 id='order-title'>
					{this.state.resultsQuantity} {t('list.resultTitle')}
				</h3>
			);
	}

	initializePublications() {
		let pubComponents = [];
		const {t} = this.props;
		for (let i = 0; i < this.state.publications.length; i++) {
			pubComponents.push(
				<div key={this.state.publications[i].publicationid}>
					<Publication
						t={t}
						publication={this.state.publications[i]}
						page='List'
						editable={false}
						faveable={true}
						ready={this.setReady}
						index={i}
					/>
				</div>,
			);
		}

		if (this.state.publications.length === 0) {
			pubComponents.push(
				<div key={'No-Pubs'}>
					<p id='no-results-title'>{t('list.noPublications')}</p>
					<p id='no-results-info'>{t('list.noPublicationsText')}</p>
				</div>,
			);
		}

		return pubComponents;
	}

	checkFilterExistance(value) {
		if (value !== '' && value !== null && value !== 'undefined' && value !== undefined) return true;
		return false;
	}

	createDeleteAll(t) {
		if (
			this.checkFilterExistance(this.state.address) ||
			this.checkFilterExistance(this.state.minPrice) ||
			this.checkFilterExistance(this.state.maxPrice) ||
			this.checkFilterExistance(this.state.minFloorSize) ||
			this.checkFilterExistance(this.state.maxFloorSize) ||
			this.checkFilterExistance(this.state.bedrooms) ||
			this.checkFilterExistance(this.state.bathrooms) ||
			this.checkFilterExistance(this.state.parking)
		) {
			return (
				<button id='delete-filters-button' className='clean-all' onClick={() => this.deleteAllFilters(t)}>
					{' '}
					{t('list.cleanAll')}{' '}
				</button>
			);
		}

		return (
			<>
				<button id='delete-filters-button' className='clean-all hidden' onClick={() => this.deleteAllFilters(t)}>
					{' '}
					{t('list.cleanAll')}{' '}
				</button>
			</>
		);
	}

	createFiltersNotes() {
		let filters = [];
		filters.push(this.createFilter('address', this.state.address, null, null, ''));
		filters.push(this.createFilter('minPrice', this.state.minPrice, null, null, 'U$S'));
		filters.push(this.createFilter('maxPrice', this.state.maxPrice, null, null, 'U$S'));
		filters.push(this.createFilter('minFloorSize', this.state.minFloorSize, null, null, 'm2'));
		filters.push(this.createFilter('maxFloorSize', this.state.maxFloorSize, null, null, 'm2'));
		filters.push(
			this.createFilter('bedrooms', this.state.bedrooms, 'list.bedroomSingular', 'list.bedroomPlural', ''),
		);
		filters.push(
			this.createFilter('bathrooms', this.state.bathrooms, 'list.bathroomSingular', 'list.bathroomPlural', ''),
		);
		filters.push(this.createFilter('parking', this.state.parking, 'list.parkingSingular', 'list.parkingPlural', ''));
		return filters;
	}

	createFilter(stateName, value, singularInformation, pluralInformation, additionalInformation) {
		const {t} = this.props;
		if (!this.checkFilterExistance(value)) {
			return;
		}
		return (
			<li className='applied-filters-list-item' key={stateName}>
				<input value='x' className='delete-btn' onChange={this.noOp} onClick={() => this.deleteFilter(stateName)} />
				<p className='applied-filter-text'>
					{value} {utilFunction.decidePlural(t(singularInformation), t(pluralInformation), value)}
				</p>
				{additionalInformation}
			</li>
		);
	}

	noOp() {}

	createFilterFields(field, singularInformation, pluralInformation, t, stateName) {
		if (this.state.filters === null) return;
		return Object.entries(this.state.filters[field]).map(([key, value]) => (
			<div key={key}>
				<button className='filters-item-name' onClick={() => this.handleFilter(stateName, key)}>
					{key} {utilFunction.decidePlural(t(singularInformation), t(pluralInformation), key)} ({value})
				</button>
			</div>
		));
	}

	deleteAllFilters() {
		let addressValue = document.getElementById('search-holder').value;
		let names = [
			'address',
			'minPrice',
			'maxPrice',
			'minFloorSize',
			'maxFloorSize',
			'bedrooms',
			'bathrooms',
			'parking',
			'page',
		];
		let values = [addressValue, '', '', '', '', '', '', '', 0];
		this.updatePublications(names, values, true);
		this.openFilters();
	}

	deleteFilter(stateName) {
		let names = [stateName, 'page'];
		let values = ['', 0];
		this.updatePublications(names, values, true);
	}

	handleSelect(event, stateName) {
		let names = [stateName];
		let values = [event.target.value];
		this.updatePublications(names, values, false);
	}

	handleFilter(stateName, value) {
		this.hideFilter(stateName);
		let names = [stateName, 'page'];
		let values = [value, 0];
		this.updatePublications(names, values, true);
	}

	hideFilter(stateName) {
		switch(stateName) {
			case 'bedrooms':
				let filterBedrooms = document.getElementById('filterBedrooms');
				filterBedrooms.classList.remove('show');
				break;
			case 'parking':
				let filterParking = document.getElementById('filterParking');
				filterParking.classList.remove('show');
				break;
			case 'bathrooms':
				let filterBathrooms = document.getElementById('filterBathrooms');
				filterBathrooms.classList.remove('show');
				break;
			default:
			  	break;
		}
	}

	handleOperation(operation) {
		if (this.state.loadingPublications || this.state.loadingFilters) {
			return;
		}
		let names = ['operation', 'page'];
		let values = [operation, 0];
		this.selectOperation(operation);
		this.updatePublications(names, values, true);
	}

	handleSearch() {
		let value = document.getElementById('search-holder').value;
		let names = ['address', 'page'];
		let values = [value, 0];
		this.updatePublications(names, values, true);
	}

	handlePrice() {
		let minPrice = document.getElementById('minPrice');
		let maxPrice = document.getElementById('maxPrice');
		let names = ['minPrice', 'maxPrice', 'page'];
		let values = [minPrice.value, maxPrice.value, 0];
		this.updatePublications(names, values, true);
	}

	handleFloorSize() {
		let minFloorSize = document.getElementById('minFloorSize');
		let maxFloorSize = document.getElementById('maxFloorSize');

		let names = ['minFloorSize', 'maxFloorSize', 'page'];
		let values = [minFloorSize.value, maxFloorSize.value, 0];
		this.updatePublications(names, values, true);
	}

	selectOperation(operation) {
		let buy = document.getElementById('buy');
		let rent = document.getElementById('rent');

		if (operation === Constants.FSALE) {
			rent.classList.remove('search_list-item-active');
			buy.classList.add('search_list-item-active');
		} else {
			buy.classList.remove('search_list-item-active');
			rent.classList.add('search_list-item-active');
		}
	}

	selectPropertyType(propertyType) {
		let house = document.getElementById('House');
		let apartment = document.getElementById('Apartment');

		if (propertyType === Constants.HOUSE) house.selected = true;
		else apartment.selected = true;
	}

	setInitialPage() {
		const params = new URLSearchParams(this.props.location.search);
		const queryPageParam = params.get(Constants.PAGE);
		return parseInt(queryPageParam) - 1 || 0;
	}

	pushParameters(names, values) {
		if (names === []) return;
		const queryParser = require('query-string');
		const queryParams = queryParser.parse(this.props.history.location.search);
		for (let i = 0; i < names.length; i++) {
			if (names[i] === Constants.PAGE) queryParams[names[i]] = parseInt(values[i]) + 1;
			else queryParams[names[i]] = values[i];
		}

		this.props.history.push({
			path: '/List',
			search: queryParser.stringify(queryParams),
		});
	}

	handlePageClick = (data) => {
		let names = ['page'];
		let values = [data.selected];
		this.updatePublications(names, values, false);
	};

	expand(id) {
		let filter = document.getElementById(id);
		var filterArrow;

		switch(id) {
			case 'filterParking':
				filterArrow = document.getElementById('parkingArrow');
				break;
			case 'filterLocation':
				filterArrow = document.getElementById('locationArrow');
				break;
			case 'filterPrice':
				filterArrow = document.getElementById('priceArrow');
				break;
			case 'filterFloorSize':
				filterArrow = document.getElementById('floorSizeArrow');
				break;
			case 'filterBedrooms':
				filterArrow = document.getElementById('bedroomsArrow');
				break;
			case 'filterBathrooms':
				filterArrow = document.getElementById('bathroomsArrow');
				break;
			default:
			  	break;
		  }

		if (filter.classList.contains('show')){
			filterArrow.src = arrowUp;
			filter.classList.remove('show');
		} 
		else{
			filterArrow.src = arrowDown;
			filter.classList.add('show');
		}
	}

	setReady() {
		let currentReady = this.state.readyPublications;
		this.setState({ readyPublications: currentReady + 1 })
		if (this.state.readyPublications === this.state.publications.length) {
			this.setState({loadingPublications: false});
			LocalStorageService.deleteCounter()
		} 
	}

	loadingContainers() {
		let pubComponents = [];
		for (let i = 0; i < Constants.LIST_MAX_PUBLICATIONS; i++) {
			pubComponents.push(
				<div className='loader-container' key={i + '-loader'}>
					<PublicationLoader />
				</div>,
			);
		}
		return pubComponents;
	}

	disableButtons() {
		var deleteButtons = document.getElementsByClassName('delete-btn');
		document.getElementById('delete-filters-button').disabled = true;
		document.getElementById('search-btn').disabled = true;
		document.getElementById('select-type').disabled = true;
		document.getElementById('order-select').disabled = true;
		for (var i = 0; i < deleteButtons.length; i++) {
			deleteButtons[i].disabled = true;
		}
	}

	enableButtons() {
		var deleteButtons = document.getElementsByClassName('delete-btn');
		document.getElementById('delete-filters-button').disabled = false;
		document.getElementById('search-btn').disabled = false;
		document.getElementById('select-type').disabled = false;
		document.getElementById('order-select').disabled = false;
		for (var i = 0; i < deleteButtons.length; i++) {
			deleteButtons[i].disabled = false;
		}
	}

	componentWillUnmount() {
		CancelTokenService.getSource().cancel();
		CancelTokenService.refreshToken();
		LocalStorageService.deleteCounter()
		document.getElementById("search-holder").removeEventListener('keydown', this.onKeyPressed);
	}

	onKeyPressed = (e) => {
		if (e.keyCode === 13) {
			this.handleSearch();
		} 
	};

	render() {
		const {t} = this.props;
		let publications = this.initializePublications();
		let loadingPublications = this.loadingContainers();
		let filters = this.createFiltersNotes(t);
		let cleanAll = this.createDeleteAll(t);
		let locationFilter = this.createFilterFields('locations', '', '', t, 'address');
		let bedroomFilter = this.createFilterFields(
			'bedrooms',
			'list.bedroomSingular',
			'list.bedroomPlural',
			t,
			'bedrooms',
		);
		let bathroomFilter = this.createFilterFields(
			'bathrooms',
			'list.bathroomSingular',
			'list.bathroomPlural',
			t,
			'bathrooms',
		);
		let parkingFilter = this.createFilterFields(
			'parking',
			'list.parkingSingular',
			'list.parkingPlural',
			t,
			'parking',
		);

		return (
			<div>
				<div>
					<div className='wrap inlineBlock'>
						<div className='search_list inlineBlock'>
							<fieldset className='search_list-container rounded' id='operation-type'>
								<div className='search_list-item' id='buy' onClick={() => this.handleOperation('FSale')}>
									<p className='search_list-item-label'>{t('list.buy')}</p>
								</div>
								<div className='search_list-item' id='rent' onClick={() => this.handleOperation('FRent')}>
									<p className='search_list-item-label'>{t('list.rent')}</p>
								</div>
							</fieldset>
						</div>
						<div className='search'>
							<form>
								<select
									className='type-home-select'
									id='select-type'
									onChange={(event) => this.handleSelect(event, 'propertyType')}>
									<option value='House' id='House'>
										{t('list.house')}
									</option>
									<option value='Apartment' id='Apartment'>
										{t('list.apartment')}
									</option>
								</select>
							</form>
							<input
								type='text'
								className='searchTerm'
								id='search-holder'
								placeholder={t('list.searchPlaceholder')}
							/>
							<input
								type='submit'
								id='search-btn'
								value={t('list.search')}
								onClick={() => this.handleSearch()}
							/>
						</div>
					</div>

					<div className='results-container inlineBlock'>
						<div className='results' id='res'>
							{this.getResults(t)}
						</div>
						<div className='results' id='order' onChange={(event) => this.handleSelect(event, 'order')}>
							<select id='order-select' defaultValue={Constants.NEWEST_PUBLICATION}>
								<option disabled value={Constants.NO_ORDER}>
									{t('list.noOrder')}
								</option>
								<option value={Constants.NEWEST_PUBLICATION}>{t('list.newest')}</option>
								<option value={Constants.OLDEST_PUBLICATION}>{t('list.oldest')}</option>
								<option value={Constants.ASCENDANT_ORDER}>{t('list.lowest')}</option>
								<option value={Constants.DESCENDANT_ORDER}>{t('list.highest')}</option>
							</select>
							<h3 id='order-title-select'>{t('list.order')}</h3>
						</div>
					</div>

					<div className='filters'>
						<ul id='applied-filters-list'>
							{filters}
							{cleanAll}
						</ul>
					</div>

					<div>
						<div id='content-container'>
							<aside>
								{this.state.loadingFilters === true ? (
									<div className='filter-polaroid'>
										<div className='filter-polaroid-loader'>
											<FilterLoader />
										</div>
									</div>
								) : null}
								<div className={this.state.loadingFilters === true ? 'hidden' : 'filter-polaroid'}>
									<div className='container'>
										<div id='filters-title'>
											<h3>{t('list.filters')}</h3>
										</div>
										<div id='filters-list'>
											<div className='filters-list-item' id='filterLocationHeader'>
												{t('list.location')}
												<img
													src={arrowDown}
													alt='Arrow Up'
													id='locationArrow'
													onClick={() => this.expand('filterLocation')}
													className='arrow-up-filters'></img>
											</div>
											<div className='expandible filters-list-item-last' id='filterLocation'>
												<ul className='list-group'>{locationFilter}</ul>
											</div>

											<div className='filters-list-item'>
												{t('list.price')}
												<img
													src={arrowDown}
													alt='Arrow Up'
													id='priceArrow'
													onClick={() => this.expand('filterPrice')}
													className='arrow-up-filters'></img>
											</div>
											<div className='expandible' id='filterPrice'>
												<div className='slidecontainer'>
													<p className='filter-subtitle'>{t('list.dollarsMin')}</p>
													<input type='text' id='minPrice' />
													<p className='filter-subtitle filter-subtitle-not-first'>
														{t('list.dollarsMax')}
													</p>
													<input type='text' id='maxPrice' />

													<div className='apply-container'>
														<button
															type='button'
															className='apply-btn'
															onClick={() => this.handlePrice()}>
															{t('list.apply')}
														</button>
													</div>
												</div>
											</div>
											<div className='filters-list-item'>
												{t('list.floorSizeTitle')}
												<img
													src={arrowDown}
													alt='Arrow Up'
													id='floorSizeArrow'
													onClick={() => this.expand('filterFloorSize')}
													className='arrow-up-filters'></img>
											</div>
											<div className='expandible' id='filterFloorSize'>
												<div className='slidecontainer'>
													<p className='filter-subtitle'>{t('list.sqmetersMin')}</p>
													<input type='text' id='minFloorSize' />

													<p className='filter-subtitle filter-subtitle-not-first'>
														{t('list.sqmetersMax')}
													</p>
													<input type='text' id='maxFloorSize' />

													<div className='apply-container'>
														<button
															type='button'
															className='apply-btn'
															onClick={() => this.handleFloorSize()}>
															{t('list.apply')}
														</button>
													</div>
												</div>
											</div>
											<div className='filters-list-item' id='filterBedroomsHeader'>
												{t('list.bedrooms')}
												<img
													src={arrowDown}
													alt='Arrow Up'
													id='bedroomsArrow'
													onClick={() => this.expand('filterBedrooms')}
													className='arrow-up-filters'></img>
											</div>
											<div className='expandible filters-list-item-last' id='filterBedrooms'>
												<div className='radioFlexOption'>{bedroomFilter}</div>
											</div>
											<div className='filters-list-item' id='filterBathroomsHeader'>
												{t('list.bathrooms')}
												<img
													src={arrowDown}
													alt='Arrow Up'
													id='bathroomsArrow'
													onClick={() => this.expand('filterBathrooms')}
													className='arrow-up-filters'></img>
											</div>
											<div className='expandible filters-list-item-last' id='filterBathrooms'>
												<div className='radioFlexOption'>{bathroomFilter}</div>
											</div>
											<div className='filters-list-item' id='filterParkingHeader'>
												{t('list.parking')}
												<img
													src={arrowDown}
													alt='Arrow Up'
													id='parkingArrow'
													onClick={() => this.expand('filterParking')}
													className='arrow-up-filters'></img>
											</div>
											<div className='expandible filters-list-item-last' id='filterParking'>
												<div className='radioFlexOption'>{parkingFilter}</div>
											</div>
										</div>
									</div>
								</div>
							</aside>
							{this.state.loadingPublications === true ? (
								<div className='loader-all-container'>{loadingPublications}</div>
							) : null}
							<section id='publications'>
								<div className={this.state.loadingPublications === true ? 'hidden' : null}>{publications}</div>
								{this.state.publications.length !== 0 ? (
									<div className='pubsPagination'>
										<ReactPaginate
											forcePage={this.state.page}
											previousLabel={'<'}
											nextLabel={'>'}
											breakLabel={'...'}
											pageCount={this.state.pagesQuantity}
											marginPagesDisplayed={2}
											pageRangeDisplayed={3}
											onPageChange={this.handlePageClick}
											activeClassName={'active'}
											breakClassName={''}
											containerClassName={'container-pagination separation'}
											pageClassName={''}
											previousClassName={''}
											nextClassName={''}
										/>
									</div>
								) : null}
							</section>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(withTranslation()(List));
