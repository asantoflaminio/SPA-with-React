//User form constants

export const SHORT_STRING_MIN_LENGTH = 3;
export const SHORT_STRING_MAX_LENGTH = 30;
export const EMAIL_MAX_LENGTH = 50;
export const LONG_STRING_MIN_LENGTH = 6;
export const LONG_STRING_MAX_LENGTH = 30;
export const LONG_STRING_MAX_LENGTH_PASS = 70;

//Publication constants

export const FIRST_FORM_MIN_LENGTH = 3;
export const FIRST_FORM_MAX_LENGTH = 50;
export const FIRST_FORM_MAX_LENGTH_ADDRESS = 140;
export const PRICE_MIN_LENGTH = 1;
export const PRICE_MAX_LENGTH = 10;
export const SECOND_FORM_MIN_LENGTH = 1;
export const SECOND_FORM_MAX_LENGTH = 2500;
export const THIRD_FORM_MIN_LENGTH = 1;
export const THIRD_FORM_MAX_LENGTH = 3;
export const DIMENSION_MAX_LENGTH = 5;
export const AMENITIES_MAX_LENGTH = 140;
export const STORAGE_MIN_LENGTH = 2;
export const STORAGE_MAX_LENGTH = 140;
export const BLANK_LENGTH = 0;

//Patterns

export const numbersRegex = "[0-9]+";
export const emptyOrNumbersRegex = "^$|[0-9]+";
export const lettesNumersAndSpacesRegex = new RegExp("^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ ]*$");
export const lettesNumersAndSpacesRegexOrEmpty = "^$|[\\p{L}0-9 ]+";
export const lettesNumersAndSpacesRegexComma = "[\\p{L}0-9, ]+";
export const descriptionRegex = "[-\\p{L}0-9¿?:%!¡,.()$ ]+";