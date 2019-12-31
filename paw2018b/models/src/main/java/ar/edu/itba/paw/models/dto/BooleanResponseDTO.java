package ar.edu.itba.paw.models.dto;

public class BooleanResponseDTO {
	
	private boolean response;
	
	public BooleanResponseDTO(boolean response) {
		this.response = response;
	}
	
	public BooleanResponseDTO() {}

	public boolean isResponse() {
		return response;
	}

	public void setResponse(boolean response) {
		this.response = response;
	}
	
	

}
