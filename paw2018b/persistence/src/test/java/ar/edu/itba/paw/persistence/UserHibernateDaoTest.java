package ar.edu.itba.paw.persistence;

import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.models.User;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
@Transactional
public class UserHibernateDaoTest {
	
	private static final String FIRSTNAME = "TestFirstName";
	private static final String LASTNAME = "TestLastName";
	private static final String EMAIL = "test@mail.com";
	private static final String PASSWORD = "TestPassword";
	private static final String PHONENUMBER = "1522334455";
	private static final String ROLE = "USER";
	private static final String LANGUAGE = "es-4";

	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private UserHibernateDao userDao; 
	private JdbcTemplate jdbcTemplate;
	private long user_id;
	
	@Before
	@Transactional
	public void setUp() {

		User u;
		for (int i = 10; i < 50; i++) {
			u = new User(i+FIRSTNAME, i+LASTNAME, i+EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE);
			em.merge(u);
			if (i == 10) {
				this.user_id = u.getUserid();
			}

		}
	}
	
	
	@Rollback
	@Test
	public void testCreate() {
		
		final User user =  userDao.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, LANGUAGE, PHONENUMBER, ROLE);
		assertNotNull(user);
		assertEquals(LASTNAME, user.getLastName());
		Query query = em.createQuery("SELECT COUNT(*) FROM User WHERE email = :email");
		query.setParameter("email", EMAIL);
		assertEquals(new Long(1), query.getSingleResult());
		
	}
	
	@Rollback
	@Test
	public void testFindById() {
		
		final User user =  userDao.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, LANGUAGE, PHONENUMBER, ROLE);
		final User actualUser = userDao.findById(user.getUserid());
		final User nullUser = userDao.findById(10000);
		assertNotNull(actualUser);
		assertNull(nullUser);
		
	}
	
	@Rollback
	@Test
	public void testFindByUserAndId() {

		for (int i = 11; i < 50; i++) {
			final User user1 =  userDao.findByUsername(i + EMAIL);
			final User user2 = userDao.findById(user1.getUserid());
			assertEquals(user1, user2);
		}
	}
	
}
