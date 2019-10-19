package ar.edu.itba.paw.models.dto;

import java.util.List;

public class ProvinceDTO {
	
	private String province;
	private long provinceID;
	private List<CityDTO> cities;
	
	public ProvinceDTO(String province, long provinceID, List<CityDTO> cities) {
		this.setProvince(province);
		this.setProvinceID(provinceID);
		this.setCities(cities);
	}
	
	public ProvinceDTO() {}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public long getProvinceID() {
		return provinceID;
	}

	public void setProvinceID(long provinceID) {
		this.provinceID = provinceID;
	}

	public List<CityDTO> getCities() {
		return cities;
	}

	public void setCities(List<CityDTO> cities) {
		this.cities = cities;
	}
	
	

}
