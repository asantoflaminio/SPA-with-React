package ar.edu.itba.paw.models.dto;

public class IDResponseDTO {
	private long id;
	
	public IDResponseDTO(long id) {
		this.id = id;
	}
	
	public IDResponseDTO() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}
