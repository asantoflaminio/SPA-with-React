package ar.edu.itba.paw.models.dto;

public class PaginationDTO {
	
	private Integer count;
	private Integer limit;
	
	public PaginationDTO (Integer count, Integer limit) {
		this.setCount(count);
		this.setLimit(limit);
	}
	
	public PaginationDTO() {}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

}
