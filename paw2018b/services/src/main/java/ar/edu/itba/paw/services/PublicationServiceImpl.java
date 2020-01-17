package ar.edu.itba.paw.services;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.ImageDao;
import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.Constants.DataBaseFilterName;
import ar.edu.itba.paw.models.Constants.QueryFilterName;
import ar.edu.itba.paw.models.Constants.QueryOperator;
import ar.edu.itba.paw.models.Filter;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.dto.PublicationDTO;

@Service
public class PublicationServiceImpl implements PublicationService {
	
	@Autowired
	private PublicationDao publicationDao;
	
	@Autowired
	private ValidateServiceImpl vs;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ImageDao imageDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Override
	public Publication create(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses, long userid) {
		
		
		if(userDao.findById(userid).isLocked())
			return null;
		
		LOGGER.debug("Publication expenses are {}", expenses);
		LOGGER.debug("Publication amenities are {}", amenities);
		LOGGER.debug("Publication bedrooms are {}", bedrooms);
		LOGGER.debug("Publication bathrooms era {}", bathrooms);
		LOGGER.debug("Publication floorsize is {}", floorSize);
		LOGGER.debug("Publication coveredFloorSize is {}", coveredFloorSize);
		LOGGER.debug("Publication parking is {}", parking);
		LOGGER.debug("Publication baulera is {}", storage);
		
		if(! vs.validatePublication(title, address, neighborhood,
				   city, province, operation, price,
				   description, propertyType, bedrooms,
				   bathrooms, floorSize, parking, userid, coveredFloorSize, balconies, amenities, storage, expenses)) 
			return null;
		
		LOGGER.debug("Creating publication with title {}", title);
		
		if(expenses.length() == 0) {
			expenses = "-1";
		}
		if(storage.equals("notCorresponding")) {
			storage = "-1";
		}
		if(amenities.length() == 0) {
			amenities = "-1";
		}
		
		return publicationDao.create(title, address, neighborhood, city, province, operation, price,
				   description, propertyType, bedrooms,
				   bathrooms, floorSize, parking, coveredFloorSize, balconies, amenities, storage, expenses, userid);
	}
	
	@Override
	public PublicationDTO findById(final long publicationid) {
		PublicationDTO publication;
		Publication pub;
		
        LOGGER.trace("Looking up publication with id {}", publicationid);
        pub = publicationDao.findById(publicationid);
        
        if(pub == null)
        	return null;
        
        publication = transform(pub);
        publication.setUserEmail(pub.getUser().getEmail());
        publication.setPhoneNumber(pub.getUser().getPhoneNumber());
        return publication;
	}
	
	
	@Override
	public boolean deletePublication(long publicationid) {	
        LOGGER.trace("Deleting publication with id {}", publicationid);
		return  publicationDao.deletePublication(publicationid);
	}
	
	@Override
	public boolean editData(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long publicationid,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses) {
		
		if(! vs.validatePublication(title, address, neighborhood,
				   city, province, operation, price,
				   description, propertyType, bedrooms,
				   bathrooms, floorSize, parking, publicationid,
				   coveredFloorSize, balconies, amenities, storage, expenses))
			return false;
		
		LOGGER.debug("Editing data of publication with title {}", title);
		return publicationDao.editData(title, address, neighborhood, city, province, operation, price,
				   description, propertyType, bedrooms,
				   bathrooms, floorSize, parking, publicationid,
				   coveredFloorSize, balconies, amenities, storage, expenses);

	}
	
	@Override
	public List<PublicationDTO> findByUserId(long userid, Integer page, Integer limit){
		LOGGER.debug("Looking for publications of user with id {}", userid);
		List<PublicationDTO> publicationsDTO = new LinkedList<PublicationDTO>();
		for(Publication publication: publicationDao.findByUserId(userid, page,limit)) {
			publicationsDTO.add(transform(publication));
		}
		return publicationsDTO;
		
	}
	
	@Override
	public int getCountPublicationsOfUser(long id) {
		return publicationDao.getCountPublicationsOfUser(id);
	}
	
	@Override
	public void lockUnlockPublication(boolean status, long publicationid) {
		LOGGER.debug("Changing status of publication with id {} to {}", publicationid, ! status);
		publicationDao.lockUnlockPublication(status, publicationid);
	}
	
	@Override
	public int getCountPublications(String address, List<Filter> filters){
		return publicationDao.getCountPublications(address,filters);
	}
	
	@Override
	public PublicationDTO transform(Publication publication){
		PublicationDTO publicationDTO;
		
		publicationDTO = new PublicationDTO(publication.getPublicationid(),publication.getTitle(), publication.getProvince().getProvince(), publication.getCity().getCity(), 
										publication.getNeighborhood().getNeighborhood(), publication.getAddress(),publication.getOperation(), publication.getPrice().toString(), 
										publication.getDescription(), publication.getPropertyType(), publication.getBedrooms().toString(), publication.getBathrooms().toString(), 
										publication.getFloorSize().toString() , publication.getParking().toString(), publication.getPublicationDate().toString(),
										Optional.ofNullable(publication.getCoveredFloorSize()).orElse(-1).toString(),
										Optional.ofNullable(publication.getBalconies()).orElse(-1).toString(), 
										Optional.ofNullable(publication.getAmenities()).orElse("-1").toString(),
										Optional.ofNullable(publication.getStorage()).orElse("-1").toString(),
										Optional.ofNullable(publication.getExpenses()).orElse(-1).toString());
		publicationDTO.setImages(imageDao.getImagesCountByPublicationId(publication.getPublicationid()));
		
		
		return publicationDTO;
	}
	
	public Integer getMaxResultProfile() {
		return publicationDao.getMaxResultProfile();
	}
	
	public Integer getMaxResultList() {
		return publicationDao.getMaxResultList();
	}
	
	@Override
	public List<PublicationDTO> getPublications(String address, List<Filter> filters, Integer page, Integer limit, String order){
		List<PublicationDTO> publicationsDTO = new LinkedList<PublicationDTO>();
		for(Publication publication: publicationDao.getPublications(address, filters, page, limit, order)) {
			publicationsDTO.add(transform(publication));
		}
		return publicationsDTO;
	}
	
	@Override
	public HashMap<Integer, Long> getSimpleFilter(List<Filter> filters, String address, String filterName) {
		return publicationDao.getSimpleFilter(filters, address, filterName);
	}
	
	@Override
	public HashMap<String, Long> getLocationFilter(List<Filter> filters, String address){
		return publicationDao.getLocationFilter(filters, address);
	}
	
	@Override
	public List<Filter> generateFilters(String operation, String propertyType, Integer minPrice, Integer maxPrice, Integer minFloorSize, Integer maxFloorSize,
										Integer bedrooms, Integer bathrooms, Integer parking, Boolean locked){
		List<Filter> filters = new LinkedList<Filter>();
		addStringFilter(filters,operation,Constants.DataBaseFilterName.OPERATION,Constants.QueryFilterName.OPERATION,Constants.QueryOperator.EQUAL);
		addStringFilter(filters,propertyType,Constants.DataBaseFilterName.PROPERTYTYPE,Constants.QueryFilterName.PROPERTYTYPE,Constants.QueryOperator.EQUAL);
		addIntegerFilter(filters,minPrice,Constants.DataBaseFilterName.PRICE,Constants.QueryFilterName.MINPRICE,Constants.QueryOperator.GREATER_OR_EQUAL);
		addIntegerFilter(filters,maxPrice,Constants.DataBaseFilterName.PRICE,Constants.QueryFilterName.MAXPRICE,Constants.QueryOperator.LESS_OR_EQUAL);
		addIntegerFilter(filters,minFloorSize,Constants.DataBaseFilterName.FLOORSIZE,Constants.QueryFilterName.MINFLOORSIZE,Constants.QueryOperator.GREATER_OR_EQUAL);
		addIntegerFilter(filters,maxFloorSize,Constants.DataBaseFilterName.FLOORSIZE,Constants.QueryFilterName.MAXFLOORSIZE,Constants.QueryOperator.LESS_OR_EQUAL);
		addIntegerFilter(filters,bedrooms,Constants.DataBaseFilterName.BEDROOMS,Constants.QueryFilterName.BEDROOMS,Constants.QueryOperator.EQUAL);
		addIntegerFilter(filters,bathrooms,Constants.DataBaseFilterName.BATHROOMS,Constants.QueryFilterName.BATHROOMS,Constants.QueryOperator.EQUAL);
		addIntegerFilter(filters,parking,Constants.DataBaseFilterName.PARKING,Constants.QueryFilterName.PARKING,Constants.QueryOperator.EQUAL);
		
		if(!locked)
			addBooleanFilter(filters,locked,Constants.DataBaseFilterName.LOCKED,Constants.QueryFilterName.LOCKED,Constants.QueryOperator.EQUAL);
		
		return filters;
	}
	
	public void addStringFilter(List<Filter> filters, String value, DataBaseFilterName dataBaseName, QueryFilterName name, QueryOperator operator) {
		if(value != null && value != "") {
			Filter filter = new Filter(value,dataBaseName,name,operator);
			//System.out.println("Filter: " + name + " Value:" + value);
			filters.add(filter);
		}
	}
	
	public void addIntegerFilter(List<Filter> filters, Integer value, DataBaseFilterName dataBaseName, QueryFilterName name, QueryOperator operator) {
		if(value != null) {
			//System.out.println("Filter: " + name + " Value:" + value);
			Filter filter = new Filter(value,dataBaseName,name,operator);
			filters.add(filter);
		}
	}
	
	public void addBooleanFilter(List<Filter> filters, Boolean value, DataBaseFilterName dataBaseName, QueryFilterName name, QueryOperator operator) {
		if(value != null) {
			//System.out.println("Filter: " + name + " Value:" + value);
			Filter filter = new Filter(value,dataBaseName,name,operator);
			filters.add(filter);
		}
	}

}