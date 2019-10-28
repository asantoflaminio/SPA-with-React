package ar.edu.itba.paw.models.dto;

public class PageDTO {
	
	private Integer page;
	
	public PageDTO(Integer page) {
		this.setPage(page);
	}
	
	public PageDTO() {}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}
	
	

}
