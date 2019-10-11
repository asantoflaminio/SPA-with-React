package ar.edu.itba.paw.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "favPublications")
public class FavPublications {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "favPublications_favPublicationid_seq")
	@SequenceGenerator(sequenceName = "favPublications_favPublicationid_seq", name = "favPublications_favPublicationid_seq", allocationSize = 1)
	@Column(name="favPublicationid")
	private long favPublicationid;

	@Column(name="publicationid")
	private long publicationid;
	
	@Column(name="userid")
	private long userid;
	
	public FavPublications() { }
	
	public FavPublications(final long publicationid, final long userid) { 
		this.publicationid = publicationid;
		this.userid = userid;
	}
	
	public long getFavPublicationid() {
		return favPublicationid;
	}

	public void setFavPublicationid(long favPublicationid) {
		this.favPublicationid = favPublicationid;
	}

	public long getPublicationid() {
		return publicationid;
	}

	public void setPublicationid(long publicationid) {
		this.publicationid = publicationid;
	}

	public long getUserid() {
		return userid;
	}

	public void setUserid(long userid) {
		this.userid = userid;
	}


}
