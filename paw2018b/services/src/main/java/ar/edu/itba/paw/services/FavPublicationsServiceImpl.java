package ar.edu.itba.paw.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.FavPublicationsDao;
import ar.edu.itba.paw.interfaces.FavPublicationsService;
import ar.edu.itba.paw.models.Publication;

@Service
public class FavPublicationsServiceImpl implements FavPublicationsService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private FavPublicationsDao favPublicationDao;

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
	public List<Publication> getUserFavourites(long userid) {
		return favPublicationDao.getUserFavourites(userid);
	}
	
	@Override
	public List<Publication> getUserFavouritesPagination(long userid, String pageFav) {
		return favPublicationDao.getUserFavouritesPagination(userid,pageFav);
	}
	
	@Override
	public int getCountUserFavourites(long userid) {
		return favPublicationDao.getCountUserFavourites(userid);
	}
	
	@Override
	public boolean isFavourite(long userid, long publicationid) {
		return favPublicationDao.isFavourite(userid, publicationid);
	}

}
