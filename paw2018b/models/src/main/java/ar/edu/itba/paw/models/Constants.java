package ar.edu.itba.paw.models;

public class Constants {
	
	public static final Integer MAX_LANGUAJE = 4; 
	public static final Integer MAX_RESULTS_USERS = 7;
	
	public static final String COUNT_HEADER = "X-Total-Count";
	
	public static enum Operation {
		FSALE ("FSale"),
		FRENT ("FRent");
		
		private final String operation;
		
		Operation(String operation){
			this.operation = operation;
		}

		public String getOperation() {
			return operation;
		}
	}
	
	public static enum PropertyType {
		HOUSE ("House"),
		APARTMENT ("Apartment");
		
		private final String propertyType;
		
		PropertyType(String propertyType){
			this.propertyType = propertyType;
		}

		public String getPropertyType() {
			return propertyType;
		}
	}
	
	public static enum Role{
		USER("USER"),
		ADMIN("ADMIN"),
		LOCKED("LOCKED");
		
		private final String role;
	
		Role(String role){
			this.role = role;
		}
	
		public String getRole() {
			return role;
		}
	}
	
	public static enum Location{
		PROVINCE("Province"),
		CITY("City"),
		NEIGHBORHOOD("Neighborhood");
		
		private final String location;
	
		Location(String location){
			this.location = location;
		}
	
		public String getLocation() {
			return location;
		}
	}
	
	public static enum DataBaseFilterName{
		OPERATION("operation"),
		PROPERTYTYPE("propertyType"),
		PRICE("price"),
		FLOORSIZE("floorSize"),
		BEDROOMS("bedrooms"),
		BATHROOMS("bathrooms"),
		PARKING("parking"),
		LOCKED("locked");
		
		private final String dataBaseFilterName;
	
		DataBaseFilterName(String dataBaseFilterName){
			this.dataBaseFilterName = dataBaseFilterName;
		}
	
		public String getDataBaseFilterName() {
			return dataBaseFilterName;
		}
	}
	
	public static enum QueryFilterName{
		OPERATION("operation"),
		PROPERTYTYPE("propertyType"),
		MINPRICE("minPrice"),
		MAXPRICE("maxPrice"),
		MINFLOORSIZE("minFloorSize"),
		MAXFLOORSIZE("maxFloorSize"),
		BEDROOMS("bedrooms"),
		BATHROOMS("bathrooms"),
		PARKING("parking"),
		LOCKED("locked");
		
		private final String queryFilterName;
	
		QueryFilterName(String queryFilterName){
			this.queryFilterName = queryFilterName;
		}
	
		public String getQueryFilterName() {
			return queryFilterName;
		}
	}
	
	public static enum QueryOperator{
		EQUAL("="),
		LESS_OR_EQUAL("<="),
		GREATER_OR_EQUAL(">=");
		
		private final String queryOperator;
	
		QueryOperator(String queryOperator){
			this.queryOperator = queryOperator;
		}
	
		public String getQueryOperator() {
			return queryOperator;
		}
	}
	
	public static enum QueryOrder{
		NO_ORDER("No order"),
		ASCENDANT_ORDER("Ascending order"),
		DESCENDANT_ORDER("Descending order"),
		OLDEST_PUBLICATION("Oldest publications"),
		NEWEST_PUBLICATION("Newest publications");
		
		private final String queryOrder;
	
		QueryOrder(String queryOrder){
			this.queryOrder = queryOrder;
		}
	
		public String getQueryOrder() {
			return queryOrder;
		}
	}
	
	public static enum Error{
		BAD_REQUEST("The request could not be understood by the server due to malformed syntax"),
		UNAUTHORIZED("The request requires user authentication"),
		FORBIDDEN("The server understood the request, but is refusing to fulfill it"),
		NOT_FOUND("The server has not found any resource matching the Request-URI"),
		CONFLICT("The request could not be completed due to a conflict with the current state of the resource"),
		BAD_GATEWAY("The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request");
		
		private final String error;
	
		Error(String error){
			this.error = error;
		}
	
		public String getError() {
			return error;
		}
	}


}
