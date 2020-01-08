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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_userid_seq")
	@SequenceGenerator(sequenceName = "users_userid_seq", name = "users_userid_seq", allocationSize = 1)
	@Column(name="userid")
	private long userid;
	
	@Column(length = 30, nullable = false, unique = false)
	private String firstName;
	
	@Column(length = 30, nullable = false, unique = false)
	private String lastName;
	
	@Column(length = 250, nullable = false, unique = true)
	private String email;
	
	@Column(length = 70, nullable = false, unique = false)
	private String password;
	
	@Column(length = 30, nullable = false, unique = false)
	private String phoneNumber;
	
	@Column(length = 10, nullable = false, unique = false)
	private String role;
	
	@Column(length = 30, nullable = false, unique = false)
	private String languaje;
	
	@Column(nullable = false, unique = false)
	private boolean locked;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Publication> publications;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<FavPublications> favPublications;
	
	
	User(){ }
	
	
	public User(long userid,String firstName, String lastName,
			String email, String password, String phoneNumber, String role, String languaje) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.userid = userid;
		this.setRole(role);
		this.languaje = languaje;
		this.locked = false;
	}
	
	public User(String firstName, String lastName,
			String email, String password, String phoneNumber, String role, String languaje) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.role = role;
		this.languaje = languaje;
		this.locked = false;
	}
	
	public String getFirstName() {
		return this.firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return this.lastName;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	public long getUserid() {
		return userid;
	}

	public void setUserid(long userid) {
		this.userid = userid;
	}
	
	public void setPublications(List<Publication> publications) {
		this.publications = publications;
	}
	
	public List<Publication> getPublications(){
		return publications;
	}
	
	public List<FavPublications> getFavPublications(){
		return favPublications;
	}
	
	public void setFavPublications(List<FavPublications> favPublications) {
		this.favPublications = favPublications;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public String getLanguaje() {
		return languaje;
	}


	public void setLanguaje(String languaje) {
		this.languaje = languaje;
	}


	public boolean isLocked() {
		return locked;
	}


	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	
}
