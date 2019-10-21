package ar.edu.itba.paw.models.dto;

public class NeighborhoodDTO {
	
	private String neighborhood;
	private long neighborhoodID;
	private long cityID;
	
	public NeighborhoodDTO(String neighborhood, long neighborhoodID) {
		this.setNeighborhood(neighborhood);
		this.setNeighborhoodID(neighborhoodID);
	}
	
	public NeighborhoodDTO() {}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public long getNeighborhoodID() {
		return neighborhoodID;
	}

	public void setNeighborhoodID(long neighborhoodID) {
		this.neighborhoodID = neighborhoodID;
	}

	public long getCityID() {
		return cityID;
	}

	public void setCityID(long cityID) {
		this.cityID = cityID;
	}

}
