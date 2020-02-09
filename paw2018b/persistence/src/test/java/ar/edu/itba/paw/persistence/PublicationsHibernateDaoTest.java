package ar.edu.itba.paw.persistence;

import org.junit.Assert;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.models.City;
import ar.edu.itba.paw.models.Neighborhood;
import ar.edu.itba.paw.models.Province;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
@Transactional
public class PublicationsHibernateDaoTest {
	
	private static final String FIRSTNAME = "TestFirstName";
	private static final String LASTNAME = "TestLastName";
	private static final String EMAIL = "test@mail.com";
	private static final String PASSWORD = "TestPassword";
	private static final String PHONENUMBER = "1522334455";
	private static final String ROLE = "USER";
	private static final String LANGUAGE = "es-4";

	private static final long NONEXISTENTPUBLICATIONID = -1;
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
	private static final String BALCONIES = "0";
	private static final String AMENITIES = "SUM, PILETA";
	private static final String STORAGE = "Yes";
	private static final String EXPENSES = "500";
	private static final String COVEREDFLOORSIZE = "50";

	private static final String TITLE2 = "TestTitle2";
	private static final String ADDRESS2 = "TestAddress2";
	private static final String OPERATION2 = "TestOperation2";
	private static final String PRICE2 = "3333332";
	private static final String DESCRIPTION2 = "TestDescription2";
	private static final String PROPERTYTYPE2 = "TestPropertyType2";
	private static final String BEDROOMS2 = "32";
	private static final String BATHROOMS2 = "12";
	private static final String FLOORSIZE2 = "502";
	private static final String PARKING2 = "12";
	private static final String BALCONIES2 = "0";
	private static final String AMENITIES2 = "SUM, PILETA";
	private static final String STORAGE2 = "Yes";
	private static final String EXPENSES2 = "500";
	private static final String COVEREDFLOORSIZE2 = "50";
	
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private UserHibernateDao userDao; 
	
	@Autowired
	private PublicationHibernateDao publicationDao; 
	
	@Autowired
	private LocationHibernateDao locationDao;
	
	private long user_id;
	private long pub_id;
	private long pub_id2;
	private Province p;
	private City c;
	private Neighborhood n;

	@Before
	@Transactional
	public void setUp() {
		
		final User user =  userDao.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, LANGUAGE, PHONENUMBER, ROLE);
		em.persist(user);
		this.user_id = user.getUserid();
		
		p = locationDao.createProvince(PROVINCE);
		c = locationDao.createCity(CITY, p.getProvinceid());
		n = locationDao.createNeighborhood(NEIGHBORHOOD, c.getCityid());
		em.persist(p);
		em.persist(c);
		em.persist(n);
		
	}
	
	@Test
	public void testCreate() {
		
		final Publication pub = publicationDao.create(TITLE, ADDRESS, String.valueOf(n.getNeighborhoodid()), String.valueOf(c.getCityid()), String.valueOf(p.getProvinceid()), OPERATION,
				PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, COVEREDFLOORSIZE, 
				BALCONIES, AMENITIES, STORAGE, EXPENSES, user_id);
		pub_id = pub.getPublicationid();
		em.persist(pub);
		
		final Publication pub2 = publicationDao.create(TITLE2, ADDRESS2, String.valueOf(n.getNeighborhoodid()), String.valueOf(c.getCityid()), String.valueOf(p.getProvinceid()), OPERATION2,
				PRICE2, DESCRIPTION2, PROPERTYTYPE2, BEDROOMS2, BATHROOMS2, FLOORSIZE2, PARKING2, COVEREDFLOORSIZE2, 
				BALCONIES2, AMENITIES2, STORAGE2, EXPENSES2, user_id);
		pub_id2 = pub2.getPublicationid();
		em.persist(pub2);
		
		assertNotNull(pub);
		assertNotNull(pub2);
		assertNotEquals(pub.getPublicationid(), pub2.getPublicationid());
		
		Query query = em.createQuery("SELECT COUNT(*) FROM Publication WHERE userid = :userid");
		query.setParameter("userid", user_id);
		assertEquals(new Long(2), query.getSingleResult());
	}

	@Rollback
	@Test
	public void testFindById() {
		
		final Publication pub = publicationDao.create(TITLE, ADDRESS, String.valueOf(n.getNeighborhoodid()), String.valueOf(c.getCityid()), String.valueOf(p.getProvinceid()), OPERATION,
				PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, COVEREDFLOORSIZE, 
				BALCONIES, AMENITIES, STORAGE, EXPENSES, user_id);
		pub_id = pub.getPublicationid();
		em.persist(pub);
		
		final Publication pb = publicationDao.findById(pub_id);
		final Publication nonexistentpb = publicationDao.findById(NONEXISTENTPUBLICATIONID);
		
		Assert.assertNotNull(pb);
		Assert.assertNull(nonexistentpb);

	}
		
	@Rollback
	@Test
	public void testEditData() {
		
		Query query = em.createQuery("SELECT COUNT(*) FROM Publication WHERE title = :title");
		query.setParameter("title", TITLE);
		
		final Publication pub = publicationDao.create(TITLE, ADDRESS, String.valueOf(n.getNeighborhoodid()), String.valueOf(c.getCityid()), String.valueOf(p.getProvinceid()), OPERATION,
				PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, COVEREDFLOORSIZE, 
				BALCONIES, AMENITIES, STORAGE, EXPENSES, user_id);
		em.persist(pub);
		
		assertEquals(new Long(1), query.getSingleResult());
		
		publicationDao.editData(TITLE2, ADDRESS2, String.valueOf(n.getNeighborhoodid()), String.valueOf(c.getCityid()), String.valueOf(p.getProvinceid()), OPERATION2, PRICE2, DESCRIPTION2, PROPERTYTYPE2, BEDROOMS2, BATHROOMS2, FLOORSIZE2, PARKING2, COVEREDFLOORSIZE2, BALCONIES2,
				AMENITIES2, STORAGE2, EXPENSES2,  pub.getPublicationid());
		
		Query query2 = em.createQuery("SELECT COUNT(*) FROM Publication WHERE title = :title");
		query2.setParameter("title", TITLE2);
		
		assertEquals(new Long(0), query.getSingleResult());
		assertEquals(new Long(1), query2.getSingleResult());
			
	}
	
	@Rollback
	@Test
	public void testLockUnlockPublication() {
        
		final Publication pub = publicationDao.create(TITLE, ADDRESS, String.valueOf(n.getNeighborhoodid()), String.valueOf(c.getCityid()), String.valueOf(p.getProvinceid()), OPERATION,
				PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, COVEREDFLOORSIZE, 
				BALCONIES, AMENITIES, STORAGE, EXPENSES, user_id);
		em.persist(pub);
		
		publicationDao.updateLockUserPublications(true, pub.getPublicationid(), user_id);
		
		Query query = em.createQuery("SELECT COUNT(*) FROM Publication WHERE locked = :locked");
		query.setParameter("locked", true);
		
		assertEquals(new Long(1), query.getSingleResult());
		
	}
	
	@Rollback
	@Test
	public void testDelete() {
		
		final Publication pub = publicationDao.create(TITLE, ADDRESS, String.valueOf(n.getNeighborhoodid()), String.valueOf(c.getCityid()), String.valueOf(p.getProvinceid()), OPERATION,
				PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, COVEREDFLOORSIZE, 
				BALCONIES, AMENITIES, STORAGE, EXPENSES, user_id);
		em.persist(pub);
		
		Query query = em.createQuery("SELECT COUNT(*) FROM Publication WHERE userid = :userid");
		query.setParameter("userid", user_id);
		assertEquals(new Long(1), query.getSingleResult());
		
		publicationDao.deletePublication(pub.getPublicationid());
		
		Query query2 = em.createQuery("SELECT COUNT(*) FROM Publication WHERE userid = :userid");
		query2.setParameter("userid", user_id);
		assertEquals(new Long(0), query2.getSingleResult());
		
	}
	
	@Rollback
	@Test
	public void testDeleteNonExistentPublication() {
		
		boolean testing = publicationDao.deletePublication(NONEXISTENTPUBLICATIONID);
		assertFalse(testing);
		
		Publication pub = publicationDao.findById(NONEXISTENTPUBLICATIONID);
		assertNull(pub);
	}
}