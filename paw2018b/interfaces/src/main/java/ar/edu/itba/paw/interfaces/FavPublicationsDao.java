package ar.edu.itba.paw.interfaces;

import java.util.List;

import ar.edu.itba.paw.models.FavPublication;

public interface FavPublicationsDao {
	
	public FavPublication addFavourite(long userid, long publicationid);
	
	public boolean removeFavourite(long userid, long publicationid);
	
	public void removeFavouriteByPublication(long publicationid);
	
	public List<Long> getUserFavourites(long userid, Integer page, Integer limit);
	
	public int getCountUserFavourites(long userid);
	
	public List<Long> getUserAllFavourites(long userid);
	
	public boolean isFavourite(long userid, long publicationid);

}
