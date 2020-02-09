package ar.edu.itba.paw.interfaces;

import ar.edu.itba.paw.models.FavPublication;
import ar.edu.itba.paw.models.dto.PublicationDTO;

import java.util.List;

public interface FavPublicationsService {

	public FavPublication addFavourite(long userid, long publicationid);

	public boolean removeFavourite(long userid, long publicationid);

	public List<PublicationDTO> getUserFavourites(long userid, Integer page, Integer limit);

	public int getCountUserFavourites(long userid);

	public List<PublicationDTO> checkFavourites(List<PublicationDTO> publications, long userid);

	public PublicationDTO checkFavourite(PublicationDTO publicationDTO, long userid);

}
