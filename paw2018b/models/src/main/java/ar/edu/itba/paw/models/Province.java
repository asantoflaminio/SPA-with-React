package ar.edu.itba.paw.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "provinces")
public class Province {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "provinces_province_seq")
	@SequenceGenerator(sequenceName = "provinces_province_seq", name = "provinces_province_seq", allocationSize = 1)
	@Column(name = "provinceid")
	private long provinceid;

	@Column(length = 40, nullable = false, unique = false)
	private String province;

	@OneToMany(mappedBy = "province", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@OrderBy("city ASC")
	private List<City> cities;

	public Province() {
	}

	public Province(String province) {
		this.province = province;
	}

	public long getProvinceid() {
		return provinceid;
	}

	public void setProvinceid(long provinceid) {
		this.provinceid = provinceid;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public List<City> getCities() {
		return cities;
	}

	public void setCities(List<City> cities) {
		this.cities = cities;
	}

}
