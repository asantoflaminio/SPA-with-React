package ar.edu.itba.paw.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "persistentLogin")
public class PersistentLogin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "persistentLogins_persistentLogin_seq")
	@SequenceGenerator(sequenceName = "persistentLogins_persistentLogin_seq", name = "persistentLogins_persistentLogin_seq", allocationSize = 1)
	@Column(name = "persistentLoginid")
	private long persistentLoginid;
	
	@Column(length = 250, nullable = false, unique = true)
	private String email;
	
	@Column(length = 250, nullable = false, unique = true)
	private String series;
	
	@Column(length = 250, nullable = false, unique = false)
	private String token;
	
	@Column(nullable = false, unique = false)
	private Date lastUsed;
	
	public PersistentLogin() { }
	
	public PersistentLogin(String email, String series, String token, Date lastUsed) { 
		this.setEmail(email);
		this.setSeries(series);
		this.setToken(token);
		this.setLastUsed(lastUsed);
	}

	public long getPersistentLoginid() {
		return persistentLoginid;
	}

	public void setPersistentLoginid(long persistentLoginid) {
		this.persistentLoginid = persistentLoginid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSeries() {
		return series;
	}

	public void setSeries(String series) {
		this.series = series;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getLastUsed() {
		return lastUsed;
	}

	public void setLastUsed(Date lastUsed) {
		this.lastUsed = lastUsed;
	}

}
