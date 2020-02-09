package ar.edu.itba.paw.interfaces;

import java.util.HashMap;
import java.util.List;

import ar.edu.itba.paw.models.Filter;
import ar.edu.itba.paw.models.Publication;
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

	public HashMap<Integer, Long> getSimpleFilter(List<Filter> filters, String address, String filterName);

	public HashMap<String, Long> getLocationFilter(List<Filter> filters, String address);

	public int getCountPublications(String address, List<Filter> filters);

	public PublicationDTO transform(Publication publication);

	public Integer getMaxResultProfile();

	public Integer getMaxResultList();

	public List<Filter> generateFilters(String operation, String propertyType, Integer minPrice, Integer maxPrice,
			Integer minFloorSize, Integer maxFloorSize, Integer bedrooms, Integer bathrooms, Integer parking,
			Boolean locked);

}
