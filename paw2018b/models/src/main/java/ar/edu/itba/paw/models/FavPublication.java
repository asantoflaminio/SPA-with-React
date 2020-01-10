package ar.edu.itba.paw.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "favPublications")
public class FavPublication {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "favPublications_favPublicationid_seq")
	@SequenceGenerator(sequenceName = "favPublications_favPublicationid_seq", name = "favPublications_favPublicationid_seq", allocationSize = 1)
	@Column(name="favPublicationid")
	private long favPublicationid;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "publicationid", nullable = false)
	private Publication publication;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userid", nullable = false)
	private User user;
	
	public FavPublication() { }
	
	
	public long getFavPublicationid() {
		return favPublicationid;
	}

	public void setFavPublicationid(long favPublicationid) {
		this.favPublicationid = favPublicationid;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public Publication getPublication() {
		return publication;
	}
	
	public void setPublication(Publication publication) {
		this.publication = publication;
	}


}
