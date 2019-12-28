package ar.edu.itba.paw.services;

import java.util.Date;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
public class PublicationServiceImplTest {
	private static final long USERID = 1;
	private static final long PUBLICATIONID = 1;
	private static final long NONEXISTENTPUBLICATIONID = 123;
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
	private static final Date DATE = new Date();
	
	private static final String FIRSTNAME = "TestFirstName";
	private static final String LASTNAME = "TestLastName";
	private static final String EMAIL = "test1@mail.com";
	private static final String PASSWORD = "TestPassword";
	private static final String PHONENUMBER = "1522334455";
	private static final String LANGUAGE = "TestLanguage";
	private static final String ROLE = "ADMIN";
	
    @InjectMocks
    private PublicationServiceImpl publicationService;
	
    @Mock
    private PublicationDao publicationDao;
    
    @Mock
    private UserDao userDao;
    
    private Publication publication;
    private User user;
    
    @Mock
    private ValidateServiceImpl vs;
    
    @Rule
    public MockitoRule rule = MockitoJUnit.rule();
    
    /*
    
    @Before
    public void setUp() {
    	Mockito.reset(publicationDao);
    	user = Mockito.mock(User.class);
    	Mockito.when(userDao.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE)).
    	thenReturn(user);
    	publication = Mockito.mock(Publication.class);
    	Mockito.when(publicationDao.create(TITLE, ADDRESS, NEIGHBORHOOD, CITY, PROVINCE, 
    			OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, USERID)).
    	thenReturn(publication);
    	Mockito.when(publicationDao.findById(PUBLICATIONID)).thenReturn(new Publication(PUBLICATIONID, TITLE, ADDRESS, 
    			OPERATION, 4242412, DESCRIPTION, PROPERTYTYPE, 3, 1, 
    			50,1, DATE));
    	Mockito.when(publication.getTitle()).thenReturn(TITLE);
    }
    
	/*@Test 
	public void createPublicationTest() {
		Publication newPublication = publicationService.create(TITLE, ADDRESS, NEIGHBORHOOD, CITY, 
				PROVINCE, OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, USERID);
		Assert.assertNotNull(newPublication); 
	}*/
	
    /*
	@Test 
	public void editDataPublicationTest() {
		Assert.assertNotNull(publicationService.editData("NEW TITLE", ADDRESS, 
				NEIGHBORHOOD, CITY, PROVINCE, OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, NONEXISTENTPUBLICATIONID)); 
	}
	
	/*
	@Test 
	public void findIdPublicationTest() {
		Assert.assertNotNull(publicationService.findById(PUBLICATIONID));
		
	}
	
	@Test 
	public void findInexistentIdPublicationTest() {
		Assert.assertNull(publicationService.findById(NONEXISTENTPUBLICATIONID));
		
	}/*
	
	/*@Test 
	public void deleteIdPublicationTest() {
		publicationService.deleteById(PUBLICATIONID);
		Assert.assertNull(publicationService.findById(PUBLICATIONID));
	}*/
}


