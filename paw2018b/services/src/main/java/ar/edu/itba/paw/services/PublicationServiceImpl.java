package ar.edu.itba.paw.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.dto.PublicationDTO;

@Service
public class PublicationServiceImpl implements PublicationService{
	
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
			   String bathrooms, String floorSize, String parking, long userid) {
		
		if(userDao.findById(userid).isLocked())
			return null;
		
		if(! vs.validatePublication(title, address, neighborhood,
				   city, province, operation, price,
				   description, propertyType, bedrooms,
				   bathrooms, floorSize, parking, userid)) 
			return null;
		
		LOGGER.debug("Creating publication with title {}", title);
		return publicationDao.create(title, address, neighborhood, city, province, operation, price,
				   description, propertyType, bedrooms,
				   bathrooms, floorSize, parking, userid);
	}
	
	@Override
	public Publication findById(final long publicationid) {
		if(publicationid < 0){
            LOGGER.error("Attempted to find a publication with a negative id");
            throw new IllegalArgumentException("id must be positive");
        }
		
        LOGGER.trace("Looking up publication with id {}", publicationid);
		return publicationDao.findById(publicationid);
	}
	
	@Override
	public void deleteById(final long publicationdid) {
		if(publicationdid < 0){
            LOGGER.error("Attempted to find a publication with a negative id");
            throw new IllegalArgumentException("id must be positive");
        }
		
        LOGGER.trace("Looking up publication with id {}", publicationdid);
		publicationDao.deleteById(publicationdid);
	}
	
	@Override
	public boolean editData(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long publicationid) {
		
		if(! vs.validatePublication(title, address, neighborhood,
				   city, province, operation, price,
				   description, propertyType, bedrooms,
				   bathrooms, floorSize, parking, publicationid))
			return false;
		
		LOGGER.debug("Editing data of publication with title {}", title);
		return publicationDao.editData(title, address, neighborhood, city, province, operation, price,
				   description, propertyType, bedrooms,
				   bathrooms, floorSize, parking, publicationid);

	}
	
	@Override
	public List<PublicationDTO> findNewest(String operation){
		LOGGER.debug("Getting most recently updated publications");
		
		List<PublicationDTO> publications = new ArrayList<PublicationDTO>();
		for(Publication publication: publicationDao.findNewest(operation)) {
			publications.add(new PublicationDTO(publication.getTitle(), publication.getProvince().getProvince(),
					publication.getCity().getCity(), publication.getNeighborhood().getNeighborhood(), publication.getAddress(), 
					publication.getOperation(), publication.getPrice().toString(), publication.getDescription(),
					publication.getPropertyType(), publication.getBedrooms().toString(), publication.getBathrooms().toString(),
					publication.getFloorSize().toString(), publication.getParking().toString(), publication.getPublicationDate().toString()));
		}
		return publications;
	}
	
	@Override
	public List<Publication> findByUserId(long id, String pagePub){
		LOGGER.debug("Looking for publications of user with id {}", id);
		return publicationDao.findByUserId(id,pagePub);
	}
	
	@Override
	public int getCountPublicationsOfUser(long id) {
		return publicationDao.getCountPublicationsOfUser(id);
	}
	
	@Override
	public List<PublicationDTO> findSearchFiltering(String operation, String propertyType,  String address, String minPrice, String maxPrice,
												 String minFloorSize, String maxFloorSize,
												 String bedrooms, String bathrooms, String parking, String order, String page){
		List<PublicationDTO> publications;
		if(! vs.validateSearch(address, minPrice , maxPrice, minFloorSize, maxFloorSize)) {
			return null;
		}
		publications = transform(publicationDao.findSearchFiltering(operation,propertyType,address,minPrice,maxPrice,minFloorSize,
												  maxFloorSize,bedrooms,bathrooms, parking, order, page));
		return publications;
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
	public List<PublicationDTO> findAllPublications(String pagePub){
		List<PublicationDTO> publications;
		
		publications = transform(publicationDao.findAllPublications(pagePub));
		LOGGER.debug("Looking up for all publications in data base");
		return publications;
	}
	
	@Override
	public int getCountAllPublications(){
		return publicationDao.getCountAllPublications();
	}
	
	@Override
	public List<PublicationDTO> transform(List<Publication> publications){
		List<PublicationDTO> publicationsDTO = new LinkedList<PublicationDTO>();
		PublicationDTO current;
		
		for(Publication pub: publications) {
			current = new PublicationDTO(pub.getTitle(), pub.getProvince().getProvince(), pub.getCity().getCity(), pub.getNeighborhood().getNeighborhood(), pub.getAddress(),
										pub.getOperation(), pub.getPrice().toString(), pub.getDescription(), pub.getPropertyType(), pub.getBedrooms().toString(), pub.getBathrooms().toString() , 
										pub.getFloorSize().toString() , pub.getParking().toString(), pub.getPublicationDate().toString());
			publicationsDTO.add(current);
		}
		
		return publicationsDTO;
	}

}