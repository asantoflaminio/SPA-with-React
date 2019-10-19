package ar.edu.itba.paw.models.dto;

import java.util.List;


public class ProvincesDTO {
	
	private List<ProvinceDTO> provinces;
	
	public ProvincesDTO(List<ProvinceDTO> provinces) {
		this.provinces = provinces;
	}
	
	public ProvincesDTO() {}

	public List<ProvinceDTO> getProvinces() {
		return provinces;
	}

	public void setProvinces(List<ProvinceDTO> provinces) {
		this.provinces = provinces;
	}
	
	

}
