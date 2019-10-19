package ar.edu.itba.paw.models.dto;

public class NeighborhoodDTO {
	
	private String neighborhood;
	private long neighborhoodID;
	
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

}
