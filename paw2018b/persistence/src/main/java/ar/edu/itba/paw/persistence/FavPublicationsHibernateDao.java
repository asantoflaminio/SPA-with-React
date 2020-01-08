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
import ar.edu.itba.paw.models.FavPublications;
import ar.edu.itba.paw.models.Publication;

@Repository
public class FavPublicationsHibernateDao implements FavPublicationsDao{
	
	private static Integer MAX_RESULTS = 3;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PublicationDao publicationDao;
	
	@PersistenceContext
	private EntityManager em;

	@Override
	@Transactional
	public void addFavourite(long userid, long publicationid) {
		final FavPublications favPublications = new FavPublications();
		favPublications.setUser(userDao.findById(userid));
		favPublications.setPublication(publicationDao.findById(publicationid));
		em.persist(favPublications);
	}

	@Override
	@Transactional
	public void removeFavourite(long userid, long publicationid) {
		final String queryString = "from FavPublications as fav where fav.publication.publicationid = :publicationid "
				 + "AND fav.user.userid = :userid";
		TypedQuery<FavPublications> query = em.createQuery(queryString, FavPublications.class);
		query.setParameter("publicationid", publicationid); 
		query.setParameter("userid", userid);
		em.remove(query.getResultList().get(0));
	}
	
	@Override
	@Transactional
	public boolean isFavourite(long userid, long publicationid) {
		final String queryString = "from FavPublications as fav where fav.publication.publicationid = :publicationid "
				 + "AND fav.user.userid = :userid";
		TypedQuery<FavPublications> query = em.createQuery(queryString, FavPublications.class);
		query.setParameter("publicationid", publicationid); 
		query.setParameter("userid", userid);
		if(query.getResultList().size() > 0)
			return true;
		else
			return false;
	}
	
	@Override
	@Transactional
	public List<Long> getUserFavourites(long userid) {
		final String queryString = "select distinct favPub.publication.publicationid from FavPublications as favPub "
								 + "WHERE favPub.user.userid = :userid AND favPub.publication.locked != true";
		TypedQuery<Long> query = em.createQuery(queryString, Long.class);
		query.setParameter("userid", userid);
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<Publication> getUserFavouritesPagination(long userid, String pageFav) {
		final String queryString = "select distinct pub from Publication as pub "
								 + "INNER JOIN pub.favPublications "
								 + "LEFT JOIN FETCH pub.images "
								 + "LEFT JOIN FETCH pub.province "
								 + "LEFT JOIN FETCH pub.city "
								 + "LEFT JOIN FETCH pub.neighborhood "
								 + "WHERE pub.user.userid = :userid AND pub.locked != true";
		TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		query.setParameter("userid", userid);
		query.setFirstResult((Integer.parseInt(pageFav) - 1) * MAX_RESULTS);
		query.setMaxResults(MAX_RESULTS);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public int getCountUserFavourites(long userid) {
		final String queryString = "select COUNT(favPub) from FavPublications as favPub "
								+ "WHERE favPub.user.userid = :userid";
		TypedQuery<Long> query = em.createQuery(queryString, Long.class);
		query.setParameter("userid", userid);
		return query.getResultList().get(0).intValue();
	}

	@Override
	public void removeFavouriteByPublication(long publicationid) {
		final Query query =  em.createQuery("delete FavPublications as fav WHERE fav.publication.publicationid = :publicationid");
		query.setParameter("publicationid", publicationid);
		query.executeUpdate();
	}
}
