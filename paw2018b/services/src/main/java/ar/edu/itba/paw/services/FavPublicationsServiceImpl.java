package ar.edu.itba.paw.services;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.FavPublicationsDao;
import ar.edu.itba.paw.interfaces.FavPublicationsService;
import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.models.FavPublication;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.dto.PublicationDTO;

@Service
public class FavPublicationsServiceImpl implements FavPublicationsService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private FavPublicationsDao favPublicationDao;
	
	@Autowired
	private PublicationDao publicationDao;

	@Override
	public FavPublication addFavourite(long userid, long publicationid) {
		if(userid == publicationDao.findById(publicationid).getUser().getUserid()) {
			LOGGER.debug("The publication belongs to the user");
			return null;
		}
		LOGGER.debug("Adding publiction with id {} to favourites of user with id {}", publicationid, userid);
		return favPublicationDao.addFavourite(userid, publicationid);
	}
	
	@Override
	public void removeFavourite(long userid, long publicationid) {
		LOGGER.debug("Removing publiction with id {} to favourites of user with id {}", publicationid, userid);
		favPublicationDao.removeFavourite(userid, publicationid);
	}
	
	@Override
	public List<PublicationDTO> getUserFavourites(long userid, Integer page, Integer limit) {
		List<Long> ids = favPublicationDao.getUserFavourites(userid,page,limit);
		List<Publication> publications = new LinkedList<Publication>();
		for(Long publicationid: ids) {
			publications.add(publicationDao.findById(publicationid));
		}
		return transform(publications);
	}
	
	@Override
	public int getCountUserFavourites(long userid) {
		return favPublicationDao.getCountUserFavourites(userid);
	}
	
	@Override
	public boolean isFavourite(long userid, long publicationid) {
		return favPublicationDao.isFavourite(userid, publicationid);
	}
	
	
	public List<PublicationDTO> transform(List<Publication> publications){ //ojo, codigo repetido
		List<PublicationDTO> publicationsDTO = new LinkedList<PublicationDTO>();
		PublicationDTO current;
		
		for(Publication pub: publications) {
			current = new PublicationDTO(pub.getPublicationid(),pub.getTitle(), pub.getProvince().getProvince(), pub.getCity().getCity(), pub.getNeighborhood().getNeighborhood(), pub.getAddress(),
					pub.getOperation(), pub.getPrice().toString(), pub.getDescription(), pub.getPropertyType(), pub.getBedrooms().toString(), pub.getBathrooms().toString() , 
					pub.getFloorSize().toString() , pub.getParking().toString(), pub.getPublicationDate().toString(),
										Optional.ofNullable(pub.getCoveredFloorSize()).toString(),
										Optional.ofNullable(pub.getBalconies()).toString(), 
										Optional.ofNullable(pub.getAmenities()).toString(),
										Optional.ofNullable(pub.getStorage()).toString(),
										Optional.ofNullable(pub.getExpenses()).toString());
			current.setImages(pub.getImages().size());
			
			publicationsDTO.add(current);
		}
		
		return publicationsDTO;
	}

}
