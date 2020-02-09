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
import ar.edu.itba.paw.interfaces.ImageDao;
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

	@Autowired
	private ImageDao imageDao;

	@Override
	public FavPublication addFavourite(long userid, long publicationid) {
		LOGGER.debug("Adding publiction with id {} to favourites of user with id {}", publicationid, userid);
		return favPublicationDao.addFavourite(userid, publicationid);
	}

	@Override
	public boolean removeFavourite(long userid, long publicationid) {
		LOGGER.debug("Removing publiction with id {} to favourites of user with id {}", publicationid, userid);
		return favPublicationDao.removeFavourite(userid, publicationid);
	}

	@Override
	public List<PublicationDTO> getUserFavourites(long userid, Integer page, Integer limit) {
		List<Long> ids = favPublicationDao.getUserFavourites(userid, page, limit);
		List<Publication> publications = new LinkedList<Publication>();
		for (Long publicationid : ids) {
			publications.add(publicationDao.findById(publicationid));
		}
		return transform(publications);
	}

	@Override
	public int getCountUserFavourites(long userid) {
		return favPublicationDao.getCountUserFavourites(userid);
	}

	@Override
	public List<PublicationDTO> checkFavourites(List<PublicationDTO> publications, long userid) {
		List<Long> ids = favPublicationDao.getUserAllFavourites(userid);
		for (Long publicationid : ids) {
			for (PublicationDTO publication : publications) {
				if (publicationid.equals(publication.getPublicationid())) {
					publication.setFavourite(true);
				}
			}
		}
		return publications;
	}

	@Override
	public PublicationDTO checkFavourite(PublicationDTO publicationDTO, long userid) {
		if (favPublicationDao.isFavourite(userid, publicationDTO.getPublicationid()))
			publicationDTO.setFavourite(true);
		return publicationDTO;

	}

	public List<PublicationDTO> transform(List<Publication> publications) { // ojo, codigo repetido
		List<PublicationDTO> publicationsDTO = new LinkedList<PublicationDTO>();
		PublicationDTO current;

		for (Publication pub : publications) {
			current = new PublicationDTO(pub.getPublicationid(), pub.getTitle(), pub.getProvince().getProvince(),
					pub.getCity().getCity(), pub.getNeighborhood().getNeighborhood(), pub.getAddress(),
					pub.getOperation(), pub.getPrice().toString(), pub.getDescription(), pub.getPropertyType(),
					pub.getBedrooms().toString(), pub.getBathrooms().toString(), pub.getFloorSize().toString(),
					pub.getParking().toString(), pub.getPublicationDate().toString(),
					Optional.ofNullable(pub.getCoveredFloorSize()).orElse(-1).toString(),
					Optional.ofNullable(pub.getBalconies()).orElse(-1).toString(),
					Optional.ofNullable(pub.getAmenities()).orElse("-1").toString(),
					Optional.ofNullable(pub.getStorage()).orElse("-1").toString(),
					Optional.ofNullable(pub.getExpenses()).orElse(-1).toString());
			current.setImages(imageDao.getImagesCountByPublicationId(pub.getPublicationid()));
			current.setFavourite(true);
			publicationsDTO.add(current);
		}

		return publicationsDTO;
	}

}
