package ar.edu.itba.paw.models.dto;

import java.util.List;

public class PublicationsDTO {

	private List<PublicationDTO> publications;
	
	public PublicationsDTO(List<PublicationDTO> publications) {
		this.publications = publications;
	}
	
	public PublicationsDTO() {}

	public List<PublicationDTO> getPublications() {
		return publications;
	}

	public void setPublications(List<PublicationDTO> publications) {
		this.publications = publications;
	}
}
