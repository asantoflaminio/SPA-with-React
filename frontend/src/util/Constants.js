//User form constants

export const SHORT_STRING_MIN_LENGTH = 3;
export const SHORT_STRING_MAX_LENGTH = 30;
export const EMAIL_MAX_LENGTH = 50;
export const LONG_STRING_MIN_LENGTH = 6;
export const LONG_STRING_MAX_LENGTH = 30;
export const LONG_STRING_MAX_LENGTH_PASS = 70;

//Publication form constants

export const FIRST_FORM_MIN_LENGTH = 3;
export const FIRST_FORM_MAX_LENGTH = 50;
export const FIRST_FORM_MAX_LENGTH_ADDRESS = 140;
export const PRICE_MIN_LENGTH = 0;
export const PRICE_MAX_LENGTH = 9999999999;
export const LOW_MIN_NUMBER = 0;
export const LOW_MAX_NUMBER = 999;
export const HIGH_MIN_NUMBER = 0;
export const HIGH_MAX_NUMBER = 99999;
export const SECOND_FORM_MIN_LENGTH = 1;
export const SECOND_FORM_MAX_LENGTH = 2500;
export const THIRD_FORM_MIN_LENGTH = 1;
export const THIRD_FORM_MAX_LENGTH = 3;
export const DIMENSION_MAX_LENGTH = 99999;
export const AMENITIES_MAX_LENGTH = 140;

//Patterns

export const numbersRegex = new RegExp("^[0-9]*$");
export const emptyOrNumbersRegex = new RegExp("^$|^[0-9]*$");
export const lettersAndSpacesRegex = new RegExp("^[a-zA-ZñÑáÁéÉíÍóÓúÚüÜ ]*$")
export const lettesNumersAndSpacesRegex = new RegExp("^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ ]*$");
export const lettesNumersAndSpacesRegexOrEmpty = new RegExp("^$|^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ ]*$");
export const lettesNumersAndSpacesRegexComma = new RegExp("^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ, ]*$");
export const descriptionRegex = new RegExp("^[-a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ¿?:%!¡,.()$ ]*$"); //ESTE \n produce excepciones OJO!
export const emailRegex = new RegExp("(.+)@(.+){2,}.(.+){2,}")
export const simpleLettersAndNumbersRegex = new RegExp("^[0-9a-zA-Z]+$");
export const numbersDashRegex = new RegExp("^[-0-9]*$");

//Pagination constants

export const USERS_PAGE_LIMIT = 5;
export const PUBLICATIONS_PAGE_LIMIT = 3;
export const HOME_MAX_PUBLICATIONS = 8;

//Logic Constants

export const FSALE = "FSale"
export const FRENT = "FRent"

export const HOUSE = "House"
export const APARTMENT = "Apartment"

export const NO_ORDER = "No order"
export const ASCENDANT_ORDER = "Ascending order"
export const DESCENDANT_ORDER = "Descending order"
export const OLDEST_PUBLICATION = "Oldest publications"
export const NEWEST_PUBLICATION = "Newest publications"

//Query parameters

export const OPERATION = "operation"
export const PROPERTYTYPE = "propertyType"
export const ADDRESS = "address"
export const MINPRICE = "minPrice"
export const MAXPRICE = "maxPrice"
export const MINFLOORSIZE = "minFloorSize"
export const MAXFLOORSIZE = "maxFloorSize"
export const BEDROOMS = "bedrooms"
export const BATHROOMS = "bathrooms"
export const PARKING = "parking"
export const PAGE = "page"
