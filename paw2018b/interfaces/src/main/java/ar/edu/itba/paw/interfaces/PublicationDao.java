package ar.edu.itba.paw.interfaces;

import java.util.HashMap;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.Filter;

@Service
public interface PublicationDao {
	
	public Publication findById(final long publicationid); 
	
	public Publication create(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses, long userid);
	
	
	public List<Publication> findByUserId(long userid, Integer page, Integer limit, String order);
	
	public int getCountPublicationsOfUser(long id);
	
	public boolean deletePublication(long publicationid);
	
	public boolean editData(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses, long publicationid);
	
	public void lockUnlockPublication(boolean status, long publicationid);
	
	public int getCountPublications(String address, List<Filter> filters);

	public Integer getMaxResultProfile();
	
	public Integer getMaxResultList();

	public List<Publication> getPublications(String address, List<Filter> filters, Integer page, Integer limit, String order);
	
	public HashMap<Integer, Long> getSimpleFilter(List<Filter> filters, String address, String filterName);
	
	public HashMap<String, Long> getLocationFilter(List<Filter> filters, String address);
	
	public void addLocationFilter(List<Filter> filters, String address, HashMap<String, Long> locationMap, String location);

	public String addFiltersStatement(String query, List<Filter> filters, String address);

	public String setOrderFilter(String query, String order);
	
	public void addFiltersValues(TypedQuery<?> query, List<Filter> filters, String address);

	public void setPagination(TypedQuery<?> query, Integer page, Integer limit);

}
