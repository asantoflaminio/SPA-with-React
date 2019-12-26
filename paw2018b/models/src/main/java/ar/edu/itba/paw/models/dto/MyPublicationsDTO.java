package ar.edu.itba.paw.models.dto;

public class MyPublicationsDTO {

	private long id;
	private Integer page;
	
	public MyPublicationsDTO (long id, Integer page) {
		this.setId(id);
		this.setPage(page);
	}
	
	public MyPublicationsDTO() {}

	public Integer getPage() {
		return page;
	}
	
	public void setPage(Integer page) {
		this.page = page;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}
