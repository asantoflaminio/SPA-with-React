package ar.edu.itba.paw.models.dto;

public class ProvinceDTO {
	
	private String province;
	private long provinceid;
	
	public ProvinceDTO(String province, long provinceid) {
		this.setProvince(province);
		this.setProvinceid(provinceid);
	}
	
	public ProvinceDTO() {}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public long getProvinceid() {
		return provinceid;
	}

	public void setProvinceid(long provinceid) {
		this.provinceid = provinceid;
	}
	
	

}
