package ar.edu.itba.paw.models.dto;

public class CityDTO {
	
	private String city;
	private long cityid;
	private long provinceid;
	
	public CityDTO(String city, long cityid) {
		this.setCity(city);
		this.setCityid(cityid);
	}
	
	public CityDTO(){}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}
	
	public long getProvinceid() {
		return provinceid;
	}

	public void setProvinceid(long provinceid) {
		this.provinceid = provinceid;
	}

	public long getCityid() {
		return cityid;
	}

	public void setCityid(long cityid) {
		this.cityid = cityid;
	}

}
