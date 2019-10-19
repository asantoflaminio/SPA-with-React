package ar.edu.itba.paw.models.dto;

public class ProvinceDTO {
	
	private String province;
	
	public ProvinceDTO(String province) {
		this.setProvince(province);
	}
	
	public ProvinceDTO() {}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}
	
	

}
