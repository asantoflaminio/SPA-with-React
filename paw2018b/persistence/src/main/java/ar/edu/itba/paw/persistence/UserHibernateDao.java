package ar.edu.itba.paw.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.EnumContainer;
import ar.edu.itba.paw.models.User;

@Repository
public class UserHibernateDao implements UserDao {
	
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private HttpServletRequest request;
	
	private static final Integer MAX_LANGUAJE = 4; 
	
	private static Integer MAX_RESULTS_USERS = 6;
	
	
	@Transactional
	public User create(final String firstName, final String lastName, final String email,
						final String password, final String phoneNumber, String role) {
		
		final User user = new User(firstName, lastName, email, password, phoneNumber, role, request.getHeader("Accept-Language").substring(0, MAX_LANGUAJE));
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
	public List<User> findAllUsers(String pageUsers) {
		final TypedQuery<User> query = em.createQuery("select distinct u from User as u where u.role != :role Order by u.locked DESC", User.class);
		query.setParameter("role", EnumContainer.Role.ADMIN.getRole());
		query.setFirstResult((Integer.parseInt(pageUsers) - 1) * MAX_RESULTS_USERS);
		query.setMaxResults(MAX_RESULTS_USERS);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public int getCountAllUsers() {
		final TypedQuery<Long> query = em.createQuery("select distinct COUNT(u) from User as u where u.role != :role", Long.class);
		query.setParameter("role", EnumContainer.Role.ADMIN.getRole());
		return query.getResultList().get(0).intValue();
	}
	
	@Override
	@Transactional
	public void lockUnlockUser(boolean status, long userid) {
		final Query query =  em.createQuery("update User as u set u.locked = :locked where u.userid = :userid");
		if(status == true)
			query.setParameter("locked", false);
		else
			query.setParameter("locked", true);
		query.setParameter("userid", userid);
		query.executeUpdate();
		
	}
}