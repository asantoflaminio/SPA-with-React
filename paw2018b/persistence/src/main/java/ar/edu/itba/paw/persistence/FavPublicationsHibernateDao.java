package ar.edu.itba.paw.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.interfaces.FavPublicationsDao;
import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.FavPublication;

@Repository
public class FavPublicationsHibernateDao implements FavPublicationsDao{
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PublicationDao publicationDao;
	
	@PersistenceContext
	private EntityManager em;

	@Override
	@Transactional
	public FavPublication addFavourite(long userid, long publicationid) {
		final FavPublication favPublication = new FavPublication();
		favPublication.setUser(userDao.findById(userid));
		favPublication.setPublication(publicationDao.findById(publicationid));
		em.persist(favPublication);
		return favPublication;
	}

	@Override
	@Transactional
	public void removeFavourite(long userid, long publicationid) {
		final String queryString = "from FavPublication as fav where fav.publication.publicationid = :publicationid "
				 + "AND fav.user.userid = :userid";
		TypedQuery<FavPublication> query = em.createQuery(queryString, FavPublication.class);
		query.setParameter("publicationid", publicationid); 
		query.setParameter("userid", userid);
		em.remove(query.getResultList().get(0));
	}
	
	@Override
	@Transactional
	public boolean isFavourite(long userid, long publicationid) {
		final String queryString = "from FavPublication as fav where fav.publication.publicationid = :publicationid "
				 + "AND fav.user.userid = :userid";
		TypedQuery<FavPublication> query = em.createQuery(queryString, FavPublication.class);
		query.setParameter("publicationid", publicationid); 
		query.setParameter("userid", userid);
		if(query.getResultList().size() > 0)
			return true;
		else
			return false;
	}
	
	@Override
	@Transactional
	public List<Long> getUserFavourites(long userid, Integer page, Integer limit) {
		final String queryString = "select distinct favPub.publication.publicationid from FavPublication as favPub "
								 + "WHERE favPub.user.userid = :userid AND favPub.publication.locked != true";
		TypedQuery<Long> query = em.createQuery(queryString, Long.class);
		query.setParameter("userid", userid);
		query.setFirstResult(page * limit);
		query.setMaxResults(limit);
		return query.getResultList();
	}


	
	@Override
	@Transactional
	public int getCountUserFavourites(long userid) {
		final String queryString = "select COUNT(favPub) from FavPublication as favPub "
								+ "WHERE favPub.user.userid = :userid";
		TypedQuery<Long> query = em.createQuery(queryString, Long.class);
		query.setParameter("userid", userid);
		return query.getResultList().get(0).intValue();
	}

	@Override
	public void removeFavouriteByPublication(long publicationid) {
		final Query query =  em.createQuery("delete FavPublication as fav WHERE fav.publication.publicationid = :publicationid");
		query.setParameter("publicationid", publicationid);
		query.executeUpdate();
	}
}
