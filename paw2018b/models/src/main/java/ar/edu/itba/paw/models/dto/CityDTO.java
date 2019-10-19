package ar.edu.itba.paw.models.dto;

import java.util.List;

public class CityDTO {
	
	private String city;
	private long cityID;
	private List<NeighborhoodDTO> neighborhoods;
	
	public CityDTO(String city, long cityID, List<NeighborhoodDTO> neighborhoods) {
		this.setCity(city);
		this.setCityID(cityID);
		this.setNeighborhoods(neighborhoods);
	}
	
	public CityDTO(){}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public long getCityID() {
		return cityID;
	}

	public void setCityID(long cityID) {
		this.cityID = cityID;
	}

	public List<NeighborhoodDTO> getNeighborhoods() {
		return neighborhoods;
	}

	public void setNeighborhoods(List<NeighborhoodDTO> neighborhoods) {
		this.neighborhoods = neighborhoods;
	}


}
