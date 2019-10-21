package ar.edu.itba.paw.models.dto;

public class CityDTO {
	
	private String city;
	private long cityID;
	private long provinceID;
	
	public CityDTO(String city, long cityID) {
		this.setCity(city);
		this.setCityID(cityID);
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

	public long getProvinceID() {
		return provinceID;
	}

	public void setProvinceID(long provinceID) {
		this.provinceID = provinceID;
	}


}
