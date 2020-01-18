package ar.edu.itba.paw.models.dto;

public class NeighborhoodDTO {
	
	private String neighborhood;
	private long neighborhoodid;
	private long cityid;
	private long provinceid;
	
	public NeighborhoodDTO(String neighborhood, long neighborhoodid) {
		this.setNeighborhood(neighborhood);
		this.setNeighborhoodid(neighborhoodid);
	}
	
	public NeighborhoodDTO() {}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}
	
	public long getCityid() {
		return cityid;
	}

	public void setCityid(long cityid) {
		this.cityid = cityid;
	}

	public long getProvinceid() {
		return provinceid;
	}

	public void setProvinceid(long provinceid) {
		this.provinceid = provinceid;
	}

	public long getNeighborhoodid() {
		return neighborhoodid;
	}

	public void setNeighborhoodid(long neighborhoodid) {
		this.neighborhoodid = neighborhoodid;
	}

}
