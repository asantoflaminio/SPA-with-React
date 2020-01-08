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
import ar.edu.itba.paw.models.FavPublications;
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
	public void addFavourite(long userid, long publicationid) {
		LOGGER.debug("Adding publiction with id {} to favourites of user with id {}", publicationid, userid);
		favPublicationDao.addFavourite(userid, publicationid);
	}
	
	@Override
	public void removeFavourite(long userid, long publicationid) {
		LOGGER.debug("Removing publiction with id {} to favourites of user with id {}", publicationid, userid);
		favPublicationDao.removeFavourite(userid, publicationid);
	}
	
	@Override
	public List<PublicationDTO> getUserFavourites(long userid) {
		List<Long> ids = favPublicationDao.getUserFavourites(userid);
		List<Publication> publications = new LinkedList<Publication>();
		for(Long publicationid: ids) {
			publications.add(publicationDao.findById(publicationid));
		}
		return transform(publications);
	}
	
	
	@Override
	public List<PublicationDTO> getUserFavouritesPagination(long userid, String pageFav) {
		//return transform(favPublicationDao.getUserFavouritesPagination(userid, pageFav));
		return null;
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
