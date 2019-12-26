package ar.edu.itba.paw.interfaces;

import java.util.regex.Pattern;

public interface ValidateService {
	
	public boolean validatePublication(String title, String address, String neighborhood,
			   String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long userid,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses);
	
	public boolean validateUser(String firstName, String lastName, String email, String password, String phoneNumber);
	
	public boolean validateUserData(String firstName, String lastName, String email, String phoneNumber);
	
	public boolean validateUserPassword(String password);
	
	public boolean validateInputText(String text, Integer minLength, Integer maxLength, String regex, String input);
	
	public boolean validateInputEmail(String email, Integer minLength, Integer maxLength, Pattern regex, String input);
	
	public boolean validateInputNumber(String text, Integer minLength, Integer maxLength, String regex, String input);
	
	public boolean validateSearch(String address, String minPrice, String maxPrice, String minFloorSize, String maxFloorSize);
	
	public boolean valideBothInputNumberFields(String minInput, String maxInput, Integer minLength, Integer maxLength, 
			   String firstInput, String secondInput);
	
	public boolean validateLocation(String location, String field);
	
	public boolean validateLocationAdmin(String location, String field);


}
