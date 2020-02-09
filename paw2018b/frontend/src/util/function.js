import defaultImage from '../resources/default.jpg';

export const appendSelectElement = (select, text, value) => {
	let option = document.createElement('option');
	option.value = value;
	option.innerHTML = text;
	select.appendChild(option);
};

export const decidePlural = (informationSingular, informationPlural, value) => {
	if (value > 1 || value === 0) return informationPlural;
	else return informationSingular;
};

export const decideOperation = (buy, rent, value) => {
	if (value === 'FSale') return buy;
	else return rent;
};

export const setSRC = (base64) => {
	if (base64 == null || base64 === '' || base64 === 'undefined') {
		return defaultImage;
	} else {
		return 'data:image/png;base64,' + base64;
	}
};
