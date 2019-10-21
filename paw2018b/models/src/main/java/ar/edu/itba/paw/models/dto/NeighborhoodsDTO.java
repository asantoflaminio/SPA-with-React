package ar.edu.itba.paw.models.dto;

import java.util.List;


public class NeighborhoodsDTO {
	
	private List<NeighborhoodDTO> neighborhoods;
	
	public NeighborhoodsDTO(List<NeighborhoodDTO> neighborhoods) {
		this.neighborhoods = neighborhoods;
	}
	
	public NeighborhoodsDTO() {}

	public List<NeighborhoodDTO> getNeighborhoods() {
		return neighborhoods;
	}

	public void setNeighborhoods(List<NeighborhoodDTO> neighborhoods) {
		this.neighborhoods = neighborhoods;
	}
	
	

}
