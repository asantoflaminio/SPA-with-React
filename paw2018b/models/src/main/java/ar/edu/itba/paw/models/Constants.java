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
		ADMIN("ADMIN");
		
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


}
