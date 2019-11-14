package ar.edu.itba.paw.models.dto;

public class QueryDTO {
	
	private String propertyType;
	private String operation;
	private String search;
	private String minPrice;
	private String maxPrice;
	private String bedrooms;
	private String bathrooms;
	private String parking;
	private String minFloorSize;
	private String maxFloorSize;
	private String order;
	private String page;
	
	public QueryDTO(String propertyType, String operation, String address, String price, 
					String bedrooms, String bathrooms, String parking, String floorSize, String order, String page) {
		this.setPropertyType(propertyType);
		this.setOperation(operation);
		this.setBedrooms(bedrooms);
		this.setBathrooms(bathrooms);
		this.setParking(parking);
		this.setOrder(order);
		this.setPage(page);
	}
	
	public QueryDTO() {}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
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

	public String getParking() {
		return parking;
	}

	public void setParking(String parking) {
		this.parking = parking;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getMaxFloorSize() {
		return maxFloorSize;
	}

	public void setMaxFloorSize(String maxFloorSize) {
		this.maxFloorSize = maxFloorSize;
	}

	public String getMinFloorSize() {
		return minFloorSize;
	}

	public void setMinFloorSize(String minFloorSize) {
		this.minFloorSize = minFloorSize;
	}

	public String getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(String maxPrice) {
		this.maxPrice = maxPrice;
	}

	public String getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(String minPrice) {
		this.minPrice = minPrice;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

}
