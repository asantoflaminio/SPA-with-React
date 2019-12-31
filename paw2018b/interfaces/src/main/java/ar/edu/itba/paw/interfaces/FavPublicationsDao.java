package ar.edu.itba.paw.interfaces;

import java.util.List;


import ar.edu.itba.paw.models.Publication;

public interface FavPublicationsDao {
	
	public void addFavourite(long userid, long publicationid);
	
	public void removeFavourite(long userid, long publicationid);
	
	public void removeFavouriteByPublication(long publicationid);
	
	public List<Publication> getUserFavourites(long userid);
	
	public List<Publication> getUserFavouritesPagination(long userid, String pageFav);
	
	public int getCountUserFavourites(long userid);
	
	public boolean isFavourite(long userid, long publicationid);

}
