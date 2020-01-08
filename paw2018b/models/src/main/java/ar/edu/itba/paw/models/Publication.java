package ar.edu.itba.paw.models;

import java.util.Date;
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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name = "publications")
public class Publication {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "publications_publication_seq")
	@SequenceGenerator(sequenceName = "publications_publication_seq", name = "publications_publication_seq", allocationSize = 1)
	@Column(name = "publicationid")
	private long publicationid;
	
	@Column(length = 50, nullable = false, unique = false)
	private String title;
	
	@Column(length = 140, nullable = false, unique = false)
	private String address;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "neighborhood", nullable = false)
	private Neighborhood neighborhood;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "city", nullable = false)
	private City city;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "province", nullable = false)
	private Province province;
	
	@Column(length = 30, nullable = false, unique = false)
	private String operation;
	
	@Column(length = 30, nullable = false, unique = false)
	private Integer price;
	
	@Column(length = 2500, nullable = false, unique = false)
	private String description;
	
	@Column(length = 30, nullable = false, unique = false)
	private String propertyType;
	
	@Column(length = 3, nullable = false, unique = false)
	private Integer bedrooms;
	
	@Column(length = 3, nullable = false, unique = false)
	private Integer bathrooms;
	
	@Column(length = 5, nullable = false, unique = false)
	private Integer floorSize;
	
	@Column(length = 3, nullable = false, unique = false)
	private Integer parking;
	
	@Column(length = 5, nullable = false, unique = false)
	private Integer coveredFloorSize;
	
	@Column(length = 1, nullable = false, unique = false)
	private Integer balconies;
	
	@Column(length = 140, nullable = false, unique = false)
	private String amenities;
	
	@Column(length = 140, nullable = false, unique = false)
	private String storage;
	
	@Column(length = 30, nullable = false, unique = false)
	private Integer expenses;
	
	@Column(length = 25, nullable = false, unique = false)
	private Date publicationDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userid", nullable = false)
	private User user;
	
	@OneToMany(mappedBy = "publication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<UploadFile> images;
	
	@OneToMany(mappedBy = "publication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<FavPublications> favPublications;
	
	@Column(nullable = false, unique = false)
	private boolean locked;

	public Publication(){ }
	
	public Publication(long publicationid, String title, String address, 
					   String operation, Integer price,
					   String description, String propertyType, Integer bedrooms,
					   Integer bathrooms, Integer floorSize, Integer parking, Date publicationDate, 
					   Integer coveredFloorSize, Integer balconies, String amenities, String storage, Integer expenses) {
		
		this.publicationid = publicationid;
		this.title = title;
		this.address = address;
		this.operation = operation;
		this.setPrice(price);
		this.description = description;
		this.propertyType = propertyType;
		this.setBedrooms(bedrooms);
		this.setBathrooms(bathrooms);
		this.setFloorSize(floorSize);
		this.setParking(parking);
		this.publicationDate = publicationDate;
		this.locked = false;
		this.setCoveredFloorSize(coveredFloorSize);
		this.setBalconies(balconies);
		this.setAmenities(amenities);
		this.setStorage(storage);
		this.setExpenses(expenses);
		
	}
	

	public Publication(String title, String address, 
			   String operation, Integer price,
			   String description, String propertyType, Integer bedrooms,
			   Integer bathrooms, Integer floorSize, Integer parking, Date publicationDate,
			   Integer coveredFloorSize, Integer balconies, String amenities, String storage, Integer expenses) {
	
		this.title = title;
		this.address = address;
		this.operation = operation;
		this.setPrice(price);
		this.description = description;
		this.propertyType = propertyType;
		this.setBedrooms(bedrooms);
		this.setBathrooms(bathrooms);
		this.setFloorSize(floorSize);
		this.setParking(parking);
		this.publicationDate = publicationDate;
		this.locked = false;
		this.setCoveredFloorSize(coveredFloorSize);
		this.setBalconies(balconies);
		this.setAmenities(amenities);
		this.setStorage(storage);
		this.setExpenses(expenses);
	}
	
	public long getPublicationid() {
		return publicationid;
	}

	public void setPublicationid(long publicationid) {
		this.publicationid = publicationid;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getOperation() {
		return operation;
	}
	
	public void setOperation(String operation) {
		this.operation = operation;
	}
	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public Integer getBedrooms() {
		return bedrooms;
	}

	public void setBedrooms(Integer bedrooms) {
		this.bedrooms = bedrooms;
	}

	public Integer getBathrooms() {
		return bathrooms;
	}
	
	public Neighborhood getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(Neighborhood neighborhood) {
		this.neighborhood = neighborhood;
	}
	
	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}
	
	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

	public void setBathrooms(Integer bathrooms) {
		this.bathrooms = bathrooms;
	}

	public Integer getFloorSize() {
		return floorSize;
	}

	public void setFloorSize(Integer floorSize) {
		this.floorSize = floorSize;
	}

	public Integer getParking() {
		return parking;
	}

	public void setParking(Integer parking) {
		this.parking = parking;
	}

	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public List<UploadFile> getImages(){
		return images;
	}
	
	public void setImages(List<UploadFile> images) {
		this.images = images;
	}
	
	public List<FavPublications> getFavPublications(){
		return favPublications;
	}
	
	public void setFavPublications(List<FavPublications> favPublications) {
		this.favPublications = favPublications;
	}


	public Date getPublicationDate() {
		return publicationDate;
	}

	public void setPublicationDate(Date publicationDate) {
		this.publicationDate = publicationDate;
	}

	public boolean isLocked() {
		return locked;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}
	

	public Integer getCoveredFloorSize() {
		return coveredFloorSize;
	}

	public void setCoveredFloorSize(Integer coveredFloorSize) {
		this.coveredFloorSize = coveredFloorSize;
	}

	public Integer getBalconies() {
		return balconies;
	}

	public void setBalconies(Integer balconies) {
		this.balconies = balconies;
	}

	public String getAmenities() {
		return amenities;
	}

	public void setAmenities(String amenities) {
		this.amenities = amenities;
	}

	public String getStorage() {
		return storage;
	}

	public void setStorage(String storage) {
		this.storage = storage;
	}

	public Integer getExpenses() {
		return expenses;
	}

	public void setExpenses(Integer expenses) {
		this.expenses = expenses;
	}

}
