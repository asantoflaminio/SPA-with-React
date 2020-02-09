package ar.edu.itba.paw.persistence;

import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.models.City;
import ar.edu.itba.paw.models.FavPublication;
import ar.edu.itba.paw.models.Neighborhood;
import ar.edu.itba.paw.models.Province;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
@Transactional
public class FavPublicationsHibernateDaoTest {

	private static final String FIRSTNAME = "TestFirstName";
	private static final String LASTNAME = "TestLastName";
	private static final String EMAIL = "test@mail.com";
	private static final String PASSWORD = "TestPassword";
	private static final String PHONENUMBER = "1522334455";
	private static final String ROLE = "USER";
	private static final String LANGUAGE = "es-4";

	private static final String TITLE = "TestTitle";
	private static final String ADDRESS = "TestAddress";
	private static final String NEIGHBORHOOD = "TestNeighborhood";
	private static final String CITY = "TestCity";
	private static final String PROVINCE = "TestProvince";
	private static final String OPERATION = "TestOperation";
	private static final String PRICE = "4242412";
	private static final String DESCRIPTION = "TestDescription";
	private static final String PROPERTYTYPE = "TestPropertyType";
	private static final String BEDROOMS = "3";
	private static final String BATHROOMS = "1";
	private static final String FLOORSIZE = "50";
	private static final String PARKING = "1";
	private static final String COVEREDFLOORSIZE = "50";
	private static final String BALCONIES = "0";
	private static final String AMENITIES = "SUM, PILETA";
	private static final String STORAGE = "Yes";
	private static final String EXPENSES = "500";

	@PersistenceContext
	private EntityManager em;

	@Autowired
	private UserHibernateDao userDao;

	@Autowired
	private PublicationHibernateDao publicationDao;

	@Autowired
	private LocationHibernateDao locationDao;

	@Autowired
	private FavPublicationsHibernateDao favDao;

	private long user_id;
	private long pub_id;

	@Before
	@Transactional
	public void setUp() {

		final User user = userDao.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, LANGUAGE, PHONENUMBER, ROLE);
		em.persist(user);
		this.user_id = user.getUserid();

		Province p = locationDao.createProvince(PROVINCE);
		City c = locationDao.createCity(CITY, p.getProvinceid());
		Neighborhood n = locationDao.createNeighborhood(NEIGHBORHOOD, c.getCityid());
		em.persist(p);
		em.persist(c);
		em.persist(n);

		final Publication pub = publicationDao.create(TITLE, ADDRESS, String.valueOf(n.getNeighborhoodid()),
				String.valueOf(c.getCityid()), String.valueOf(p.getProvinceid()), OPERATION, PRICE, DESCRIPTION,
				PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, COVEREDFLOORSIZE, BALCONIES, AMENITIES, STORAGE,
				EXPENSES, user_id);
		pub_id = pub.getPublicationid();
		em.persist(pub);

	}

	@Rollback
	@Test
	public void testAddFavourite() {

		final FavPublication fp = favDao.addFavourite(user_id, pub_id);
		assertNotNull(fp);
		assertEquals(user_id, fp.getUser().getUserid());
		assertEquals(pub_id, fp.getPublication().getPublicationid());

		Query query = em.createQuery("SELECT COUNT(*) FROM FavPublication WHERE favpublicationid = :favpublicationid");
		query.setParameter("favpublicationid", fp.getFavPublicationid());
		assertEquals(new Long(1), query.getSingleResult());

	}

	@Rollback
	@Test
	public void testRemoveFavourite() {

		favDao.addFavourite(user_id, pub_id);

		boolean remove = favDao.removeFavourite(user_id, pub_id);
		assertEquals(true, remove);

		Query query = em.createQuery("SELECT COUNT(*) FROM FavPublication WHERE userid = :userid");
		query.setParameter("userid", user_id);
		assertEquals(new Long(0), query.getSingleResult());
	}

	@Rollback
	@Test
	public void testIsFavourite() {

		favDao.addFavourite(user_id, pub_id);
		assertTrue(favDao.isFavourite(user_id, pub_id));
	}

}
