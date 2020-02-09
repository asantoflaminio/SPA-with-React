package ar.edu.itba.paw.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.User;

@Repository
public class UserHibernateDao implements UserDao {
	
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private PublicationDao publicationDao;
	
	@Transactional
	public User create(final String firstName, final String lastName, final String email, final String password, 
					final String phoneNumber, final String languaje,  String role) {
		
		final User user = new User(firstName, lastName, email, password, phoneNumber, languaje, role);
		em.persist(user);
		return user;
	}
	
	
	@Override
	@Transactional
	public User findById(long id) {
		return em.find(User.class, id);
	}

	@Override
	@Transactional
	public User findByUsername(String email) {
		final TypedQuery<User> query = em.createQuery("from User as u where u.email = :email", User.class);
		query.setParameter("email", email);
		final List<User> list = query.getResultList();
		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	@Transactional
	public void editData(String firstName, String lastName, String email, String phoneNumber, long userid) {
		final Query query =  em.createQuery("update User as u set u.firstName = :firstName, "
													 + "u.lastName = :lastName, u.email = :email, u.phoneNumber = :phoneNumber " 
													 + "where u.userid = :userid");
		query.setParameter("firstName", firstName);
		query.setParameter("lastName", lastName);
		query.setParameter("email", email);
		query.setParameter("phoneNumber", phoneNumber);
		query.setParameter("userid", userid);
		query.executeUpdate();

		
	}

	@Override
	@Transactional
	public void editPassword(String newPassword, long userid) {
		final Query query =  em.createQuery("update User as u set u.password = :password where u.userid = :userid");
		query.setParameter("password", newPassword);
		query.setParameter("userid", userid);
		query.executeUpdate();
		
	}
	
	@Override
	@Transactional
	public List<User> findAllUsers(int page, int limit) {
		final TypedQuery<User> query = em.createQuery("select distinct u from User as u where u.role != :role Order by u.email ASC", User.class);
		query.setParameter("role", Constants.Role.ADMIN.getRole());
		query.setFirstResult(page * limit);
		query.setMaxResults(limit);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public int getAllUsersCount() {
		final TypedQuery<Long> query = em.createQuery("select distinct COUNT(u) from User as u where u.role != :role", Long.class);
		query.setParameter("role", Constants.Role.ADMIN.getRole());
		return query.getResultList().get(0).intValue();
	}
	
	@Override
	@Transactional
	public void lock(boolean lock, long userid) {
		final Query query =  em.createQuery("update User as u set u.locked = :locked where u.userid = :userid");
		query.setParameter("locked", lock);
		query.setParameter("userid", userid);
		query.executeUpdate();
		
		List<Publication> userPublications = publicationDao.findByUserId(userid, null, null);
		for(Publication publication: userPublications) {
			publicationDao.updateLockUserPublications(lock, publication.getPublicationid(), userid);
		}
		
	}
}