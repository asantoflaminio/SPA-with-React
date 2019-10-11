package ar.edu.itba.paw.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name = "cities")
public class City {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cities_city_seq")
	@SequenceGenerator(sequenceName = "cities_city_seq", name = "cities_city_seq", allocationSize = 1)
	@Column(name = "cityid")
	private long cityid;
	
	@Column(length = 40, nullable = false, unique = false)
	private String city;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "province", nullable = false)
	private Province province;
	
	@OneToMany(mappedBy = "city", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@OrderBy("neighborhood ASC")
	private List<Neighborhood> neighborhoods;
	
	public City() { }
	
	public City(String city) { 
		this.setCity(city);
	}
	
	public long getCityid() {
		return cityid;
	}
	
	public void setCityid(long cityid) {
		this.cityid = cityid;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

	public List<Neighborhood> getNeighborhoods() {
		return neighborhoods;
	}

	public void setNeighborhoods(List<Neighborhood> neighborhoods) {
		this.neighborhoods = neighborhoods;
	}

}
