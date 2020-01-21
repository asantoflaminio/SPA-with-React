package ar.edu.itba.paw.models.dto;

public class FavPublicationDTO {
	
	public final static String MediaType ="application/vnd.meinHaus.favPublication-v1.0+json";
	
	private long publicationid;
	
	public FavPublicationDTO() {}

	public long getPublicationid() {
		return publicationid;
	}

	public void setPublicationid(long publicationid) {
		this.publicationid = publicationid;
	}

}
