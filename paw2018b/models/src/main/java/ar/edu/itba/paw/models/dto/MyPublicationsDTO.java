package ar.edu.itba.paw.models.dto;

public class MyPublicationsDTO {

	private long id;
	private Integer page;
	
	public MyPublicationsDTO (long id, Integer page) {
		this.setUserID(id);
		this.setPage(page);
	}
	
	public MyPublicationsDTO() {}

	public long getUserID() {
		return id;
	}

	public void setUserID(long userid) {
		this.id = userid;
	}

	public Integer getPage() {
		return page;
	}
	
	public void setPage(Integer page) {
		this.page = page;
	}
}
