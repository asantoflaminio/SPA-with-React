package ar.edu.itba.paw.models.dto;

import java.util.List;


public class CitiesDTO {
	
	private List<CityDTO> cities;
	
	public CitiesDTO(List<CityDTO> cities) {
		this.cities = cities;
	}
	
	public CitiesDTO() {}

	public List<CityDTO> getCities() {
		return cities;
	}

	public void setCities(List<CityDTO> cities) {
		this.cities = cities;
	}
	
	

}
