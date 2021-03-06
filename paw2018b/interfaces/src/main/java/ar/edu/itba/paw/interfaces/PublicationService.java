package ar.edu.itba.paw.interfaces;

import java.util.List;
import java.util.Map;

import ar.edu.itba.paw.models.Filter;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.Constants.DataBaseFilterName;
import ar.edu.itba.paw.models.Constants.QueryFilterName;
import ar.edu.itba.paw.models.Constants.QueryOperator;
import ar.edu.itba.paw.models.dto.PublicationDTO;

public interface PublicationService {

	public PublicationDTO findById(final long publicationid);

	public Publication create(String title, String address, String neighborhood, String city, String province,
			String operation, String price, String description, String propertyType, String bedrooms, String bathrooms,
			String floorSize, String parking, String coveredFloorSize, String balconies, String amenities,
			String storage, String expenses, long userid);

	public List<PublicationDTO> findByUserId(long userid, Integer page, Integer limit);

	public int getCountPublicationsOfUser(long id);

	public boolean deletePublication(long publicationid);

	public boolean editData(String title, String address, String neighborhood, String city, String province,
			String operation, String price, String description, String propertyType, String bedrooms, String bathrooms,
			String floorSize, String parking, String coveredFloorSize, String balconies, String amenities,
			String storage, String expenses, long publicationid);

	public List<PublicationDTO> getPublications(String address, List<Filter> filters, Integer page, Integer limit,
			String order);

	public Map<Integer, Long> getSimpleFilter(List<Filter> filters, String address, String filterName);

	public Map<String, Long> getLocationFilter(List<Filter> filters, String address);

	public int getCountPublications(String address, List<Filter> filters);

	public PublicationDTO transform(Publication publication);

	public List<Filter> generateFilters(String operation, String propertyType, Integer minPrice, Integer maxPrice,
			Integer minFloorSize, Integer maxFloorSize, Integer bedrooms, Integer bathrooms, Integer parking,
			Boolean locked);
	
	public void addStringFilter(List<Filter> filters, String value, DataBaseFilterName dataBaseName,
			QueryFilterName name, QueryOperator operator);
	
	public void addIntegerFilter(List<Filter> filters, Integer value, DataBaseFilterName dataBaseName,
			QueryFilterName name, QueryOperator operator);
	
	public void addBooleanFilter(List<Filter> filters, Boolean value, DataBaseFilterName dataBaseName,
			QueryFilterName name, QueryOperator operator);

}
