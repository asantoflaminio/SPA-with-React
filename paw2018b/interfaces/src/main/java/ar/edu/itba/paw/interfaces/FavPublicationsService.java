package ar.edu.itba.paw.interfaces;

import ar.edu.itba.paw.models.FavPublication;
import ar.edu.itba.paw.models.dto.PublicationDTO;

import java.util.List;

public interface FavPublicationsService {
	
	public FavPublication addFavourite(long userid, long publicationid);
	
	public void removeFavourite(long userid, long publicationid);
	
	public List<PublicationDTO> getUserFavourites(long userid);
	
	public List<PublicationDTO> getUserFavouritesPagination(long userid, String pageFav);
	
	public int getCountUserFavourites(long userid);
	
	public boolean isFavourite(long userid, long publicationid);

}
