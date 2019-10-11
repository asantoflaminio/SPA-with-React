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
@Table(name = "neighborhoods")
public class Neighborhood {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "neighborhoods_neighborhood_seq")
	@SequenceGenerator(sequenceName = "neighborhoods_neighborhood_seq", name = "neighborhoods_neighborhood_seq", allocationSize = 1)
	@Column(name = "neighborhoodid")
	private long neighborhoodid;
	
	@Column(length = 40, nullable = false, unique = false)
	private String neighborhood;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "city", nullable = false)
	private City city;
	
	public Neighborhood() { }
	
	public Neighborhood(String neighborhood) { 
		this.neighborhood = neighborhood;
	}
	
	public long getNeighborhoodid() {
		return neighborhoodid;
	}
	
	public void setNeighborhoodid(long neighborhoodid) {
		this.neighborhoodid = neighborhoodid;
	}
	
	public String getNeighborhood() {
		return neighborhood;
	}
	
	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}
	

}
