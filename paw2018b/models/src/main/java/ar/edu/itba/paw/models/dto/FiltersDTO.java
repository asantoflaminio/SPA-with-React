package ar.edu.itba.paw.models.dto;

import java.util.Map;

public class FiltersDTO {

	public final static String MediaType = "application/vnd.meinHaus.filters-v1.0+json";

	private Map<String, Long> locations;
	private Map<Integer, Long> bedrooms;
	private Map<Integer, Long> bathrooms;
	private Map<Integer, Long> parking;

	public FiltersDTO() {
	}

	public Map<Integer, Long> getParking() {
		return parking;
	}

	public void setParking(Map<Integer, Long> parking) {
		this.parking = parking;
	}

	public Map<Integer, Long> getBathrooms() {
		return bathrooms;
	}

	public void setBathrooms(Map<Integer, Long> bathrooms) {
		this.bathrooms = bathrooms;
	}

	public Map<Integer, Long> getBedrooms() {
		return bedrooms;
	}

	public void setBedrooms(Map<Integer, Long> bedrooms) {
		this.bedrooms = bedrooms;
	}

	public Map<String, Long> getLocations() {
		return locations;
	}

	public void setLocations(Map<String, Long> locations) {
		this.locations = locations;
	}

}
