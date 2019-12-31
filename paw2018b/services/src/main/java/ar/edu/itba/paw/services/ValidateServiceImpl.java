package ar.edu.itba.paw.services;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.ValidateService;
import ar.edu.itba.paw.models.EnumContainer;

@Service
public class ValidateServiceImpl implements ValidateService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
	
	//User constants
	private final static int SHORT_STRING_MIN_LENGTH = 3;
	private final static int SHORT_STRING_MAX_LENGTH = 30;
	private final static int EMAIL_MAX_LENGTH = 50;
	private final static int LONG_STRING_MIN_LENGTH = 6;
	private final static int LONG_STRING_MAX_LENGTH = 30;
	private final static int LONG_STRING_MAX_LENGTH_PASS = 70;
	private final static String CORRECT_PASSWORD = "Correct";
	
	
	//Publication constants
	private final static int FIRST_FORM_MIN_LENGTH = 3;
	private final static int FIRST_FORM_MAX_LENGTH = 50;
	private final static int FIRST_FORM_MAX_LENGTH_ADDRESS = 140;
	private final static int PRICE_MIN_LENGTH = 1;
	private final static int PRICE_MAX_LENGTH = 10;
	private final static int SECOND_FORM_MIN_LENGTH = 1;
	private final static int SECOND_FORM_MAX_LENGTH = 2500;
	private final static int THIRD_FORM_MIN_LENGTH = 1;
	private final static int THIRD_FORM_MAX_LENGTH = 3;
	private final static int DIMENSION_MAX_LENGTH = 5;
	private final static int AMENITIES_MAX_LENGTH = 140;
	private final static int STORAGE_MIN_LENGTH = 2;
	private final static int STORAGE_MAX_LENGTH = 140;
	private final static int BLANK_LENGTH = 0;
	
	
	//Location constants
	private final static int MIN_LOCATION_LENGTH = 3;
	private final static int MAX_LOCATION_LENGTH = 40;
	
	
	@Override
	public boolean validateUser(String firstName, String lastName, String email, String password, String phoneNumber) {
		
		final String lettersAndSpacesRegex = "[\\p{L} ]+";
		final String lettersAndNumbersRegex = "[0-9\\p{L} ]+";
		final Pattern emailRegex = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
		
		
		if(
			! validateInputText(firstName, SHORT_STRING_MIN_LENGTH, SHORT_STRING_MAX_LENGTH, lettersAndSpacesRegex, "FirstName") ||
			! validateInputText(lastName, SHORT_STRING_MIN_LENGTH, SHORT_STRING_MAX_LENGTH, lettersAndSpacesRegex, "LastName") ||
			! validateInputEmail(email, SHORT_STRING_MIN_LENGTH, EMAIL_MAX_LENGTH, emailRegex, "Email") ||
			! validateInputText(password, LONG_STRING_MIN_LENGTH, LONG_STRING_MAX_LENGTH_PASS, lettersAndNumbersRegex, "Password") ||
			! validateInputText(phoneNumber, LONG_STRING_MIN_LENGTH, LONG_STRING_MAX_LENGTH, lettersAndNumbersRegex, "PhoneNumber"))
		   {
			return false;
		}
		LOGGER.debug("All fields are valid");
		return true;
	}
	
	@Override
	public boolean validateUserData(String firstName, String lastName, String email, String phoneNumber) {
		return validateUser(firstName,lastName,email,CORRECT_PASSWORD,phoneNumber);
	}
	
	@Override
	public boolean validateUserPassword(String password) {
		final String lettersAndNumbersRegex = "[0-9\\p{L} ]+";
		return validateInputText(password, LONG_STRING_MIN_LENGTH, LONG_STRING_MAX_LENGTH_PASS, lettersAndNumbersRegex, "Password");
	}
	
	
	@Override
	public boolean validatePublication(String title, String address, String neighborhood,
			   String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long userid,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses){
		
		final String numbersRegex = "^[0-9]*$";
		final String emptyOrNumbersRegex = "$|^[0-9]*$";
		final String lettesNumersAndSpacesRegex = "^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ ]*$";
		final String lettesNumersAndSpacesRegexOrEmpty = "^$|^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ ]*$";
		final String lettesNumersAndSpacesRegexComma = "^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ ,]*$";
		final String descriptionRegex = "^[-a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ¿?:%!¡,.()$/\n/ ]*$";
		
		if(
			! validateInputText(title, FIRST_FORM_MIN_LENGTH, FIRST_FORM_MAX_LENGTH, lettesNumersAndSpacesRegex, "Title") ||
			! validateInputText(address, FIRST_FORM_MIN_LENGTH, FIRST_FORM_MAX_LENGTH_ADDRESS, lettesNumersAndSpacesRegexComma, "Address") ||
			! validateLocation(neighborhood,"Neighborhood") ||
			! validateLocation(city,"City") ||
			! validateLocation(province,"Province") ||
			! validateInputNumber(price, PRICE_MIN_LENGTH, PRICE_MAX_LENGTH, numbersRegex, "Price") ||
			! validateInputText(description, SECOND_FORM_MIN_LENGTH, SECOND_FORM_MAX_LENGTH, descriptionRegex, "Description") ||
			! validateInputNumber(bedrooms, THIRD_FORM_MIN_LENGTH, THIRD_FORM_MAX_LENGTH, numbersRegex, "Bedrooms") ||
			! validateInputNumber(bathrooms, THIRD_FORM_MIN_LENGTH, THIRD_FORM_MAX_LENGTH, numbersRegex, "Bathrooms") ||
			! validateInputNumber(floorSize, THIRD_FORM_MIN_LENGTH, DIMENSION_MAX_LENGTH, numbersRegex, "FloorSize") ||
			! validateInputNumber(parking, THIRD_FORM_MIN_LENGTH, THIRD_FORM_MAX_LENGTH, numbersRegex, "Parking") ||
			! validateInputNumber(coveredFloorSize, THIRD_FORM_MIN_LENGTH, DIMENSION_MAX_LENGTH, numbersRegex, "CoveredFloorSize") ||
			! validateInputNumber(balconies, THIRD_FORM_MIN_LENGTH, THIRD_FORM_MIN_LENGTH, numbersRegex, "Balconies") ||
			! validateInputText(amenities, BLANK_LENGTH, AMENITIES_MAX_LENGTH, lettesNumersAndSpacesRegexComma, "Amenities") ||
			! validateInputText(storage, STORAGE_MIN_LENGTH, STORAGE_MAX_LENGTH, lettesNumersAndSpacesRegexOrEmpty, "Storage") ||
			! validateInputText(expenses, BLANK_LENGTH, PRICE_MAX_LENGTH, emptyOrNumbersRegex, "Expenses")
			
		  ) {
			return false;
		}
		
		if(! operation.equals(EnumContainer.Operation.FSALE.getOperation()) && ! operation.equals(EnumContainer.Operation.FRENT.getOperation()))
			return false;
		
		if(! propertyType.equals(EnumContainer.PropertyType.HOUSE.getPropertyType()) && ! propertyType.equals(EnumContainer.PropertyType.APARTMENT.getPropertyType()))
			return false;
		
		LOGGER.debug("The publication with title {} of user {} is valid", title, userid);
		return true;
	}
	
	@Override
	public boolean validateInputText(String text, Integer minLength, Integer maxLength, String regex, String input) {
		if(text.length() > maxLength || text.length() < minLength) {
			LOGGER.debug("The field {} has an invalid length", input);
			return false;
		}else if(! text.matches(regex) && text != "") {
			LOGGER.debug("The field {} does not match the regular expression", input);
			return false;
		}
		return true;
	}
	
	@Override
	public boolean validateInputEmail(String email, Integer minLength, Integer maxLength, Pattern regex, String input) {
		if(email.length() > maxLength || email.length() < minLength) {
			LOGGER.debug("The field {} has an invalid length", input);
			return false;
		}		
		
		Matcher matcher = regex.matcher(email);
		if(! matcher.find()) {
			LOGGER.debug("Email format is wrong");
			return false;
		}
		return true;
	}
	
	@Override
	public boolean validateInputNumber(String text, Integer minLength, Integer maxLength, String regex, String input) {
		if(! validateInputText(text,minLength,maxLength,regex,input))
			return false;
		
		if(text.length() > 0 && Integer.parseInt(text) < 0) {
			LOGGER.debug("The field {} has a negative number", input);
			return false;
		}
		return true;	
	}
	
	@Override
	public boolean validateSearch(String address, String minPrice, String maxPrice, String minFloorSize, String maxFloorSize) {
		final String lettesNumersAndSpacesRegexComma = "[\\p{L}0-9, ]+";
		
		if(! valideBothInputNumberFields(minPrice, maxPrice, PRICE_MIN_LENGTH, PRICE_MAX_LENGTH, "MinPrice", "MaxPrice")|| 
		   ! valideBothInputNumberFields(minFloorSize, maxFloorSize, THIRD_FORM_MIN_LENGTH, THIRD_FORM_MAX_LENGTH, "MinFloorSize", "MaxFloorSize") ||
		   ! validateInputText(address, 0, FIRST_FORM_MAX_LENGTH_ADDRESS, lettesNumersAndSpacesRegexComma, "Address"))
					return false;
		
		return true;
	}
	
	@Override
	public boolean valideBothInputNumberFields(String minInput, String maxInput, Integer minLength, Integer maxLength, 
											   String firstInput, String secondInput) {
		final String numbersRegex = "[0-9]+";
		
		if(! minInput.equals("")) {
			if(! validateInputNumber(minInput, minLength, maxLength, numbersRegex, firstInput))
				return false;
		}
		
		if(! maxInput.equals("")) {
			if(! validateInputNumber(maxInput, minLength, maxLength, numbersRegex, secondInput))
				return false;
		}
		
		if(! minInput.equals("") && ! maxInput.equals("")) {
			if(Integer.parseInt(minInput) > Integer.parseInt(maxInput)) {
				LOGGER.debug("The field {} is greater than field {}", firstInput, secondInput);
				return false;
			}
		}
		return true;
	}

	@Override
	public boolean validateLocation(String location, String field) {
		final String numbersRegex = "[0-9]+";
		if(! location.matches(numbersRegex)) {
			LOGGER.debug("The field {} has not a correct id for a location ", field);
			return false;
		}
		
		if(Long.parseLong(location) <= 0) {
			LOGGER.debug("The field {} has has a negative ", field);
			return false;
		}
		return true;
	}
	
	@Override
	public boolean validateLocationAdmin(String location, String field) {
		final String lettersAndSpacesRegex = "[\\p{L} ]+";
		return validateInputText(location, MIN_LOCATION_LENGTH, MAX_LOCATION_LENGTH, lettersAndSpacesRegex, field);
	}

}
