package ar.edu.itba.paw.models.dto;

import java.util.List;


public class NeighborhoodsDTO {
	
	private List<NeighborhoodDTO> neighborhoods;
	
	public NeighborhoodsDTO(List<NeighborhoodDTO> neighborhoods) {
		this.neighborhoods = neighborhoods;
	}
	
	public NeighborhoodsDTO() {}

	public List<NeighborhoodDTO> getProvinces() {
		return neighborhoods;
	}

	public void setProvinces(List<NeighborhoodDTO> neighborhoods) {
		this.neighborhoods = neighborhoods;
	}
	
	

}
