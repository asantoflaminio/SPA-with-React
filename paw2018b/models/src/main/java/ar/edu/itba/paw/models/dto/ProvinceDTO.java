package ar.edu.itba.paw.models.dto;

public class ProvinceDTO {
	
	private String province;
	private long provinceID;
	
	public ProvinceDTO(String province, long provinceID) {
		this.setProvince(province);
		this.setProvinceID(provinceID);
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
	
	

}
