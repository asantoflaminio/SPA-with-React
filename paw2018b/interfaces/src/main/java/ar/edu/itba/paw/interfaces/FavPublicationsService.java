package ar.edu.itba.paw.interfaces;

import ar.edu.itba.paw.models.Publication;

import java.util.List;

public interface FavPublicationsService {
	
	public void addFavourite(long userid, long publicationid);
	
	public void removeFavourite(long userid, long publicationid);
	
	public List<Publication> getUserFavourites(long userid);
	
	public List<Publication> getUserFavouritesPagination(long userid, String pageFav);
	
	public int getCountUserFavourites(long userid);
	
	public boolean isFaved(long userid, long publicationid);

}
