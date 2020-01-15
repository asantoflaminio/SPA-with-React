package ar.edu.itba.paw.interfaces;

import java.util.HashMap;
import java.util.List;

import ar.edu.itba.paw.models.Filter;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.dto.PublicationDTO;

public interface PublicationService {
	
	public PublicationDTO findById(final long publicationid);
	
	public Publication create(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses, long userid);
	
	public List<PublicationDTO> findByUserId(long userid, Integer page, Integer limit);
	
	public int getCountPublicationsOfUser(long id);
	
	public List<PublicationDTO> findSearchFiltering(String operation, String propertyType, String address, String minPrice, String maxPrice,
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
	
	public boolean deletePublication(long publicationid);
	
	public boolean editData(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long publicationid,
			   String coveredFloorSize, String balconies, String amenities,
			   String storage, String expenses);
	
	public void lockUnlockPublication(boolean status, long publicationid);
	
	public List<PublicationDTO> findAllPublications(int page, int limit);
	
	public int getCountAllPublications();
	
	public PublicationDTO transform(Publication publication);

	public Integer getMaxResultProfile();

	public Integer getMaxResultList();

	public List<Filter> generateFilters(String operation, String propertyType, Integer minPrice, Integer maxPrice,
			Integer minFloorSize, Integer maxFloorSize, Integer bedrooms, Integer bathrooms, Integer parking);

	public List<PublicationDTO> getPublications(String address, List<Filter> filters, Integer page, Integer limit, String order);

	
}
