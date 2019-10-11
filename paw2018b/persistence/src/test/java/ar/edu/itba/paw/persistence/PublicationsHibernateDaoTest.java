//package ar.edu.itba.paw.persistence;
//
//import org.junit.Assert;
//
//import static org.mockito.Mockito.when;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.jdbc.Sql;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//import ar.edu.itba.paw.models.Publication;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(classes = TestConfig.class)
//@Sql("classpath:publicationScript.sql")
//@Transactional
//public class PublicationsHibernateDaoTest {
//
//	private static final long USERID = 1;
//	private static final long PUBLICATIONID = 1;
//	private static final long NONEXISTENTPUBLICATIONID = -1;
//	private static final String TITLE = "TestTitle";
//	private static final String ADDRESS = "TestAddress";
//	private static final String NEIGHBORHOOD = "TestNeighborhood";
//	private static final String CITY = "TestCity";
//	private static final String PROVINCE = "TestProvince";
//	private static final String OPERATION = "TestOperation";
//	private static final String PRICE = "4242412";
//	private static final String DESCRIPTION = "TestDescription";
//	private static final String PROPERTYTYPE = "TestPropertyType";
//	private static final String BEDROOMS = "3";
//	private static final String BATHROOMS = "1";
//	private static final String FLOORSIZE = "50";
//	private static final String PARKING = "1";
//
//	private static final String TITLE2 = "TestTitle2";
//	private static final String ADDRESS2 = "TestAddress2";
//	private static final String NEIGHBORHOOD2 = "TestNeighborhood2";
//	private static final String CITY2 = "TestCity2";
//	private static final String PROVINCE2 = "TestProvince2";
//	private static final String OPERATION2 = "TestOperation2";
//	private static final String PRICE2 = "3333332";
//	private static final String DESCRIPTION2 = "TestDescription2";
//	private static final String PROPERTYTYPE2 = "TestPropertyType2";
//	private static final String BEDROOMS2 = "32";
//	private static final String BATHROOMS2 = "12";
//	private static final String FLOORSIZE2 = "502";
//	private static final String PARKING2 = "12";
//	
//	private Publication pub, p;	
//
//	
//	@Autowired
//	private PublicationHibernateDao publicationHibernateDao;	
//	
//	@Autowired
//	@Before
//	public void setUp() {
//		this.publicationHibernateDao = new PublicationHibernateDao();
//		pub = Mockito.mock(Publication.class);
//	}
//	
//	@Test
//	public void testCreate() {
//		
//		p = publicationHibernateDao.create(TITLE, ADDRESS, NEIGHBORHOOD, CITY, PROVINCE, OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, USERID);
//		Publication p2 = publicationHibernateDao.create(TITLE, ADDRESS, NEIGHBORHOOD, CITY, PROVINCE, OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, USERID);
//
//        when(pub.getTitle()).thenReturn(TITLE);
//        when(pub.getAddress()).thenReturn(ADDRESS);
//        when(pub.getNeighborhood().getNeighborhood()).thenReturn(NEIGHBORHOOD);
//        when(pub.getCity().getCity()).thenReturn(CITY);
//        when(pub.getProvince().getProvince()).thenReturn(PROVINCE);
//        when(pub.getOperation()).thenReturn(OPERATION);
//        when(pub.getPrice().toString()).thenReturn(PRICE);
//        when(pub.getDescription()).thenReturn(DESCRIPTION);
//        when(pub.getPropertyType()).thenReturn(PROPERTYTYPE);
//        when(pub.getBedrooms().toString()).thenReturn(BEDROOMS);
//        when(pub.getBathrooms().toString()).thenReturn(BATHROOMS);
//        when(pub.getFloorSize().toString()).thenReturn(FLOORSIZE);
//        when(pub.getParking().toString()).thenReturn(PARKING);
//        when(pub.getUser().getUserid()).thenReturn(USERID);
//
//		Assert.assertNotNull(p);
//		Assert.assertEquals(pub.getTitle(), p.getTitle());
//		Assert.assertEquals(pub.getAddress(), p.getAddress());
//		Assert.assertEquals(pub.getCity().getCity(), p.getCity().getCity());
//		Assert.assertEquals(pub.getNeighborhood().getNeighborhood(), p.getNeighborhood().getNeighborhood());
//		Assert.assertEquals(pub.getProvince().getProvince(), p.getProvince().getProvince());
//		Assert.assertEquals(pub.getOperation(), p.getOperation());
//		Assert.assertEquals(pub.getPrice().toString(), p.getPrice().toString());
//		Assert.assertEquals(pub.getDescription(), p.getDescription());
//		Assert.assertEquals(pub.getPropertyType(), p.getPropertyType());
//		Assert.assertEquals(pub.getBedrooms().toString(), p.getBedrooms().toString());
//		Assert.assertEquals(pub.getBathrooms().toString(), p.getBathrooms().toString());
//		Assert.assertEquals(pub.getFloorSize().toString(), p.getFloorSize().toString());
//		Assert.assertEquals(pub.getParking().toString(),p.getParking().toString());
//		Assert.assertEquals(pub.getUser().getUserid(), p.getUser().getUserid());
//		
//		Assert.assertNotEquals(p.getPublicationid(), p2.getPublicationid());
//	}
//
//	@Test
//	public void testFindById() {
//		final Publication pb = publicationHibernateDao.findById(PUBLICATIONID);
//		final Publication nonexistentpb = publicationHibernateDao.findById(NONEXISTENTPUBLICATIONID);
//		
//        when(pub.getTitle()).thenReturn(TITLE);
//		
//		Assert.assertNotNull(pb);
//		Assert.assertNull(nonexistentpb);
//		Assert.assertEquals(pub.getTitle(), pb.getTitle());
//	}
//		
//	@Test
//	public void testEditData() {
//		publicationHibernateDao.editData(TITLE2, ADDRESS2, NEIGHBORHOOD2, CITY2, PROVINCE2, OPERATION2, PRICE2, DESCRIPTION2, PROPERTYTYPE2, BEDROOMS2, BATHROOMS2, FLOORSIZE2, PARKING2, PUBLICATIONID);
//		
//        when(pub.getTitle()).thenReturn(TITLE2);
//        when(pub.getAddress()).thenReturn(ADDRESS2);
//        when(pub.getNeighborhood().getNeighborhood()).thenReturn(NEIGHBORHOOD2);
//        when(pub.getCity().getCity()).thenReturn(CITY2);
//        when(pub.getProvince().getProvince()).thenReturn(PROVINCE2);
//        when(pub.getOperation()).thenReturn(OPERATION2);
//        when(pub.getPrice().toString()).thenReturn(PRICE2);
//        when(pub.getDescription()).thenReturn(DESCRIPTION2);
//        when(pub.getPropertyType()).thenReturn(PROPERTYTYPE2);
//        when(pub.getBedrooms().toString()).thenReturn(BEDROOMS2);
//        when(pub.getBathrooms().toString()).thenReturn(BATHROOMS2);
//        when(pub.getFloorSize().toString()).thenReturn(FLOORSIZE2);
//        when(pub.getParking().toString()).thenReturn(PARKING2);
//        when(pub.getUser().getUserid()).thenReturn(USERID);
//        
//		Assert.assertNotNull(p);
//		Assert.assertEquals(pub.getTitle(), p.getTitle());
//		Assert.assertEquals(pub.getAddress(), p.getAddress());
//		Assert.assertEquals(pub.getCity().getCity(), p.getCity().getCity());
//		Assert.assertEquals(pub.getNeighborhood().getNeighborhood(), p.getNeighborhood().getNeighborhood());
//		Assert.assertEquals(pub.getProvince().getProvince(), p.getProvince().getProvince());
//		Assert.assertEquals(pub.getOperation(), p.getOperation());
//		Assert.assertEquals(pub.getPrice().toString(), p.getPrice().toString());
//		Assert.assertEquals(pub.getDescription(), p.getDescription());
//		Assert.assertEquals(pub.getPropertyType(), p.getPropertyType());
//		Assert.assertEquals(pub.getBedrooms().toString(), p.getBedrooms().toString());
//		Assert.assertEquals(pub.getBathrooms().toString(), p.getBathrooms().toString());
//		Assert.assertEquals(pub.getFloorSize().toString(), p.getFloorSize().toString());
//		Assert.assertEquals(pub.getParking().toString(),p.getParking().toString());
//		Assert.assertEquals(pub.getUser().getUserid(), p.getUser().getUserid());
//	}
//	
//	@Test
//	public void testLockUnlockPublication() {
//        publicationHibernateDao.lockUnlockPublication(false, PUBLICATIONID);
//        when(pub.isLocked()).thenReturn(true);
//        
//		Assert.assertEquals(pub.isLocked(), p.isLocked());
//		
//        publicationHibernateDao.lockUnlockPublication(true, PUBLICATIONID);
//        when(pub.isLocked()).thenReturn(false);
//        
//		Assert.assertEquals(pub.isLocked(), p.isLocked());
//	}
//	
//	@Test
//	public void testDelete() {
//		publicationHibernateDao.deleteById(PUBLICATIONID);
//		Publication pb = publicationHibernateDao.findById(PUBLICATIONID);
//		
//		Assert.assertNull(pb);
//	}
//	
//	@Test
//	public void testDeleteNonExistentPublication() {
//		int before = publicationHibernateDao.getCountAllPublications();
//		publicationHibernateDao.deleteById(NONEXISTENTPUBLICATIONID);
//		int after = publicationHibernateDao.getCountAllPublications();
//		Assert.assertEquals(before, after);
//	}
//}