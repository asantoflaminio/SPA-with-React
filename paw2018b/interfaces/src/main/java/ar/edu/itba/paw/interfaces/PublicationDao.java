package ar.edu.itba.paw.interfaces;

import java.util.HashMap;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.models.Publication;

@Service
public interface PublicationDao {
	
	public Publication findById(final long id); 
	
	public Publication create(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long userid,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses);
	
	public List<Publication> findNewest(String operation);
	
	public List<Publication> findByUserId(long id, String pagePub);
	
	public int getCountPublicationsOfUser(long id);
	
	public List<Publication> findSearchFiltering(String operation, String propertyType, String address, String minPrice, String maxPrice,
												 String minFloorSize, String maxFloorSize,
												 String bedrooms, String bathrooms, String parking, String order, String page);

	public int getSearchFilteringCount(String operation, String propertyType, String address, String minPrice, String maxPrice,
			   String minFloorSize, String maxFloorSize,
			   String bedrooms, String bathrooms, String parking);
	
	public HashMap<Integer,Long> getBedroomsFilter(String operation, String propertyType, String address, String minPrice, String maxPrice, 
												   String minFloorSize, String maxFloorSize,
												   String bedrooms, String parking, String bathrooms);
	
	public HashMap<Integer,Long> getBathroomsFilter(String operation, String propertyType, String address, String minPrice, String maxPrice, 
												   String minFloorSize, String maxFloorSize,
												   String bedrooms, String parking, String bathrooms);
	
	public HashMap<Integer,Long> getParkingFilter(String operation, String propertyType, String address, String minPrice, String maxPrice, 
												   String minFloorSize, String maxFloorSize,
												   String bedrooms, String parking, String bathrooms);
	
	public HashMap<String,Long> getLocationFilter(String operation, String propertyType, String address, String minPrice, String maxPrice, 
			  String minFloorSize, String maxFloorSize,
			  String bedrooms, String parking, String bathrooms);
	
	public void addLocationFilter(String operation, String propertyType, String address,
			String minPrice, String maxPrice, String minFloorSize, String maxFloorSize, String bedrooms, String parking,
			String bathrooms, HashMap<String, Long> locationMap, String location);
	
	public String generateStringQuery(String operation, String propertyType, String address, String minPrice, String maxPrice, 
			   String minFloorSize, String maxFloorSize,
			   String bedrooms, String bathrooms, String parking);
	
	public void setQueryParameters(TypedQuery<?> query, String operation, String propertyType, String address, String minPrice, String maxPrice, 
			   String minFloorSize, String maxFloorSize,
			   String bedrooms, String bathrooms, String parking);
	
	public void deleteById(final long publicationdid);
	
	public boolean editData(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long publicationid,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses);
	
	public void lockUnlockPublication(boolean status, long publicationid);
	
	public List<Publication> findAllPublications(String pagePub);
	
	public int getCountAllPublications();


}
