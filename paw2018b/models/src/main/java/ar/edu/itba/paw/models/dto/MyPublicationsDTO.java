package ar.edu.itba.paw.models.dto;

public class MyPublicationsDTO {

	private Integer id;
	private Integer page;
	
	public MyPublicationsDTO (Integer id, Integer page) {
		this.setUserID(id);
		this.setPage(page);
	}

	public Integer getUserID() {
		return id;
	}

	public void setUserID(Integer userid) {
		this.id = userid;
	}

	public Integer getPage() {
		return page;
	}
	
	public void setPage(Integer page) {
		this.page = page;
	}
}
