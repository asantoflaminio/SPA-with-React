package ar.edu.itba.paw.services;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.Constants;
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
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Override
	public Publication create(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses, long userid) {
		
		
		if(userDao.findById(userid).isLocked())
			return null;
		
		LOGGER.debug("expenses era {}", expenses);
		LOGGER.debug("amenities era {}", amenities);
		LOGGER.debug("bedrooms era {}", bedrooms);
		LOGGER.debug("bathrooms era {}", bathrooms);
		LOGGER.debug("floorsize era {}", floorSize);
		LOGGER.debug("coveredFloorSize era {}", coveredFloorSize);
		LOGGER.debug("parking era {}", parking);
		LOGGER.debug("baulera era {}", storage);
		
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
		if(publicationid < 0){
            LOGGER.error("Attempted to find a publication with a negative id");
            throw new IllegalArgumentException("id must be positive");
        }
		
        LOGGER.trace("Looking up publication with id {}", publicationid);
        pub = publicationDao.findById(publicationid);
        publication = new PublicationDTO(pub.getPublicationid(),pub.getTitle(), pub.getProvince().getProvince(), pub.getCity().getCity(), pub.getNeighborhood().getNeighborhood(), pub.getAddress(),
				pub.getOperation(), pub.getPrice().toString(), pub.getDescription(), pub.getPropertyType(), pub.getBedrooms().toString(), pub.getBathrooms().toString() , 
				pub.getFloorSize().toString() , pub.getParking().toString(), pub.getPublicationDate().toString(),
				Optional.ofNullable(pub.getCoveredFloorSize()).orElse(-1).toString(),
				Optional.ofNullable(pub.getBalconies()).orElse(-1).toString(), 
				Optional.ofNullable(pub.getAmenities()).orElse("-1").toString(),
				Optional.ofNullable(pub.getStorage()).orElse("-1").toString(),
				Optional.ofNullable(pub.getExpenses()).orElse(-1).toString());
        publication.setImages(pub.getImages().size());
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
	public List<PublicationDTO> findByUserId(long id, String pagePub){
		LOGGER.debug("Looking for publications of user with id {}", id);
		List<PublicationDTO> publicationsDTO = new LinkedList<PublicationDTO>();
		for(Publication publication: publicationDao.findByUserId(id, pagePub)) {
			publicationsDTO.add(transform(publication));
		}
		return publicationsDTO;
		
	}
	
	@Override
	public int getCountPublicationsOfUser(long id) {
		return publicationDao.getCountPublicationsOfUser(id);
	}
	
	@Override
	public List<PublicationDTO> findSearchFiltering(String operation, String propertyType,  String address, String minPrice, String maxPrice,
												 String minFloorSize, String maxFloorSize,
												 String bedrooms, String bathrooms, String parking, String order, String page){
		List<PublicationDTO> publicationsDTO = new LinkedList<PublicationDTO>();

		if(! vs.validateSearch(address, minPrice , maxPrice, minFloorSize, maxFloorSize)) {
			return null;
		}
		
		List<Publication> publications = publicationDao.findSearchFiltering(operation,propertyType,address,minPrice,maxPrice,minFloorSize,
				  maxFloorSize,bedrooms,bathrooms, parking, order, page);
		
		for(Publication publication: publications) {
			publicationsDTO.add(transform(publication));
		}
		return publicationsDTO;
	}

	@Override
	public int getSearchFilteringCount(String operation, String propertyType, String address, String minPrice, String maxPrice,
			   String minFloorSize, String maxFloorSize,
			   String bedrooms, String bathrooms, String parking) {
		return publicationDao.getSearchFilteringCount(operation, propertyType, address, minPrice, maxPrice, minFloorSize, 
													  maxFloorSize, bedrooms, bathrooms, parking);
	}
	
	@Override
	public HashMap<Integer,Long> getBedroomsFilter(String operation,String propertyType, String address, String minPrice, String maxPrice, 
												   String minFloorSize, String maxFloorSize,
												   String bedrooms, String parking, String bathrooms) {
		return publicationDao.getBedroomsFilter(operation,propertyType,address,minPrice,maxPrice,minFloorSize,maxFloorSize,bedrooms,bathrooms, parking);
	}
	
	@Override
	public HashMap<Integer,Long> getBathroomsFilter(String operation,String propertyType, String address, String minPrice, String maxPrice, 
												    String minFloorSize, String maxFloorSize,
												    String bedrooms, String parking, String bathrooms) {
		return publicationDao.getBathroomsFilter(operation,propertyType,address,minPrice,maxPrice,minFloorSize,maxFloorSize,bedrooms,bathrooms, parking);
	}
	
	@Override
	public HashMap<Integer,Long> getParkingFilter(String operation, String propertyType, String address, String minPrice, String maxPrice, 
												  String minFloorSize, String maxFloorSize,
												  String bedrooms, String parking, String bathrooms) {
		return publicationDao.getParkingFilter(operation,propertyType,address,minPrice,maxPrice,minFloorSize,maxFloorSize,bedrooms,bathrooms, parking);
	}
	
	@Override
	public HashMap<String,Long> getLocationFilter(String operation, String propertyType, String address, String minPrice, String maxPrice, 
												  String minFloorSize, String maxFloorSize,
												  String bedrooms, String parking, String bathrooms) {
		return publicationDao.getLocationFilter(operation,propertyType,address,minPrice,maxPrice,minFloorSize,maxFloorSize,bedrooms,bathrooms, parking);
	}
	
	@Override
	public void lockUnlockPublication(boolean status, long publicationid) {
		LOGGER.debug("Changing status of publication with id {} to {}", publicationid, ! status);
		publicationDao.lockUnlockPublication(status, publicationid);
	}
	
	@Override
	public List<PublicationDTO> findAllPublications(int page, int limit){
		List<PublicationDTO> publicationsDTO = new LinkedList<PublicationDTO>();
		
		for(Publication publication: publicationDao.findAllPublications(page,limit)) {
			publicationsDTO.add(transform(publication));
		}
		LOGGER.debug("Looking up for all publications in data base");
		return publicationsDTO;
	}
	
	@Override
	public int getCountAllPublications(){
		return publicationDao.getCountAllPublications();
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
		publicationDTO.setImages(publication.getImages().size());
		
		
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
	public List<Filter> generateFilters(String operation, String propertyType, Integer minPrice, Integer maxPrice, Integer minFloorSize, Integer maxFloorSize,
										Integer bedrooms, Integer bathrooms, Integer parking){
		List<Filter> filters = new LinkedList<Filter>();
		addStringFilter(filters,operation,Constants.QueryFilterName.OPERATION,Constants.QueryOperator.EQUAL);
		addStringFilter(filters,propertyType,Constants.QueryFilterName.PROPERTYTYPE,Constants.QueryOperator.EQUAL);
		addIntegerFilter(filters,minPrice,Constants.QueryFilterName.PRICE,Constants.QueryOperator.LESS_OR_EQUAL);
		addIntegerFilter(filters,maxPrice,Constants.QueryFilterName.PRICE,Constants.QueryOperator.GREATER_OR_EQUAL);
		addIntegerFilter(filters,minFloorSize,Constants.QueryFilterName.FLOORSIZE,Constants.QueryOperator.LESS_OR_EQUAL);
		addIntegerFilter(filters,maxFloorSize,Constants.QueryFilterName.FLOORSIZE,Constants.QueryOperator.GREATER_OR_EQUAL);
		addIntegerFilter(filters,bedrooms,Constants.QueryFilterName.BEDROOMS,Constants.QueryOperator.EQUAL);
		addIntegerFilter(filters,bathrooms,Constants.QueryFilterName.BATHROOMS,Constants.QueryOperator.EQUAL);
		addIntegerFilter(filters,parking,Constants.QueryFilterName.PARKING,Constants.QueryOperator.EQUAL);
		
		return filters;
	}
	
	public void addStringFilter(List<Filter> filters, String value, QueryFilterName name, QueryOperator operator) {
		if(value != null) {
			Filter filter = new Filter(value,name,operator);
			filters.add(filter);
		}
	}
	
	public void addIntegerFilter(List<Filter> filters, Integer value, QueryFilterName name, QueryOperator operator) {
		if(value != null) {
			Filter filter = new Filter(value,name,operator);
			filters.add(filter);
		}
	}
	
	


}