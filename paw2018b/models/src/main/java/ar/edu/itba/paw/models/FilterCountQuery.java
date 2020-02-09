package ar.edu.itba.paw.models;

public class FilterCountQuery {
	private Long count;
	private Integer filterInt;
	private String filterString;

	public FilterCountQuery() {

	}

	public FilterCountQuery(Long count, Integer filterInt) {
		this.count = count;
		this.filterInt = filterInt;
	}

	public FilterCountQuery(Long count, String filterString) {
		this.count = count;
		this.filterString = filterString;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public Integer getFilter() {
		return filterInt;
	}

	public void setFilter(Integer filterInt) {
		this.filterInt = filterInt;
	}

	public String getFilterString() {
		return filterString;
	}

	public void setFilterString(String filterString) {
		this.filterString = filterString;
	}
}
