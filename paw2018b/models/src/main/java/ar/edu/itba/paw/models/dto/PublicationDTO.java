package ar.edu.itba.paw.models.dto;

public class PublicationDTO {
	
	private String title;
	private String province;
	private String city;
	private String neighborhood;
	private String address;
	private String operation;
	private String price;
	private String description;
	private String propertyType;
	private String bedrooms;
	private String bathrooms;
	private String dimention;
	private String parking;
	
	public PublicationDTO(String title, String province, String city, String neighborhood,
							String address, String operation, String price, String description,
							String propertyType, String bedrooms, String bathrooms, String dimention,
							String parking) {
		this.title = title;
		this.province = province;
		this.city = city;
		this.neighborhood = neighborhood;
		this.address = address;
		this.operation = operation;
		this.price = price;
		this.description = description;
		this.propertyType = propertyType;
		this.bedrooms = bedrooms;
		this.bathrooms = bathrooms;
		this.dimention = dimention;
		this.parking = parking;
	}
	
	public PublicationDTO() {} ;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public String getBedrooms() {
		return bedrooms;
	}

	public void setBedrooms(String bedrooms) {
		this.bedrooms = bedrooms;
	}
	
	public String getBathrooms() {
		return bathrooms;
	}

	public void setBathrooms(String bathrooms) {
		this.bathrooms = bathrooms;
	}

	public String getDimention() {
		return dimention;
	}

	public void setDimention(String dimention) {
		this.dimention = dimention;
	}


	public String getParking() {
		return parking;
	}

	public void setParking(String parking) {
		this.parking = parking;
	}

}
