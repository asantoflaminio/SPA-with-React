package ar.edu.itba.paw.services;

import static org.junit.Assert.assertSame;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyLong;


import java.util.Date;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ar.edu.itba.paw.interfaces.ImageDao;
import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.City;
import ar.edu.itba.paw.models.Neighborhood;
import ar.edu.itba.paw.models.Province;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.User;
import ar.edu.itba.paw.models.dto.PublicationDTO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
public class PublicationServiceImplTest {
	
	private static final long USERID = 1;
	private static final long PUBLICATIONID = 1;
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
	private static final Date DATE = new Date();
	private static final String DATESTRING = "TestDate";
	private static final String CITYID = "1";
	private static final String NEIGHBORHOODID = "1";
	private static final String PROVINCEID = "1";
	
	private static final String FIRSTNAME = "TestFirstName";
	private static final String LASTNAME = "TestLastName";
	private static final String EMAIL = "test1@mail.com";
	private static final String PASSWORD = "TestPassword";
	private static final String PHONENUMBER = "1522334455";
	private static final String LANGUAGE = "TestLanguage";
	private static final String ROLE = "ADMIN";
	
    @InjectMocks
    private PublicationServiceImpl ps;
	
    @Mock
    private PublicationDao publicationDao;
    
    @Mock
    private UserDao userDao;
    
    @Mock
	private ImageDao imageDao;
    
    @Mock
    private ValidateServiceImpl vs;
    
    @Rule
    public MockitoRule rule = MockitoJUnit.rule();
    
    @Before
    public void setUp() {
    	MockitoAnnotations.initMocks(this);
    }
    
	@Test 
	public void testCreatePublication() {
		
		User u = new User(USERID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE);
		
		Publication p = new Publication(TITLE, ADDRESS, OPERATION, Integer.parseInt(PRICE), DESCRIPTION, PROPERTYTYPE, Integer.parseInt(BEDROOMS), 
				Integer.parseInt(BATHROOMS), Integer.parseInt(FLOORSIZE), Integer.parseInt(PARKING), DATE,
				Integer.parseInt(COVEREDFLOORSIZE), Integer.parseInt(BALCONIES), AMENITIES, STORAGE, Integer.parseInt(EXPENSES));
		
		when(publicationDao.create(anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(), 
				anyString(), anyString(), anyString(), anyLong())).thenReturn(p);
		
		when(userDao.findById(anyLong())).thenReturn(u);
		
		when(vs.validatePublication(anyString(), anyString(), anyString(), anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(), anyString(), anyString(), anyLong())).thenReturn(true);
		
		Publication newPublication = ps.create(TITLE, ADDRESS, NEIGHBORHOOD, CITY, PROVINCE, OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, 
				BATHROOMS, FLOORSIZE, PARKING, 
				COVEREDFLOORSIZE, BALCONIES, AMENITIES, STORAGE, EXPENSES, USERID);
		
		assertSame(p, newPublication);
		verify(publicationDao).create(anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(), 
				anyString(), anyString(), anyString(), anyLong());

	}
	
    
	@Test 
	public void testEditData() {
		
		when(vs.validatePublication(anyString(), anyString(), anyString(), anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(), anyString(), anyString(),
				anyString(), anyString(), anyString(), anyString(), anyString(), anyString(), anyLong())).thenReturn(true);
		
		when(publicationDao.editData(TITLE, ADDRESS, NEIGHBORHOOD, CITY, PROVINCE, OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, EXPENSES,
				COVEREDFLOORSIZE, BALCONIES, AMENITIES, STORAGE, PUBLICATIONID)).thenReturn(true);
		
		assertSame(true, ps.editData(TITLE, ADDRESS, NEIGHBORHOOD, CITY, PROVINCE, OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, BATHROOMS, FLOORSIZE, PARKING, EXPENSES, 
				COVEREDFLOORSIZE, BALCONIES, AMENITIES, STORAGE, PUBLICATIONID));
		
		verify(publicationDao).editData(anyString(), anyString(), anyString(), anyString(), anyString(), anyString(), anyString(), anyString(), anyString(), 
				anyString(), anyString(), anyString(), anyString(), anyString(), anyString(), anyString(), 
				anyString(), anyString(), anyLong());
		
	}
	
	@Test 
	public void testDeletePublication() {
		
		when(publicationDao.deletePublication(PUBLICATIONID)).thenReturn(true);
		assertSame(true, ps.deletePublication(PUBLICATIONID));
		verify(publicationDao).deletePublication(anyLong());
		
	}
	
	@Test 
	public void testCountPublicationsOfUser() {
		
		when(publicationDao.getCountPublicationsOfUser(anyLong())).thenReturn(1);

		assertSame(1, ps.getCountPublicationsOfUser(USERID));
		verify(publicationDao).getCountPublicationsOfUser(anyLong());
		
	}
	
	@Test
	public void testTransform() {
		
		Publication p = new Publication(PUBLICATIONID, TITLE, ADDRESS, OPERATION, Integer.parseInt(PRICE), DESCRIPTION, PROPERTYTYPE, Integer.parseInt(BEDROOMS), 
				Integer.parseInt(BATHROOMS), Integer.parseInt(FLOORSIZE), Integer.parseInt(PARKING), DATE,
				Integer.parseInt(COVEREDFLOORSIZE), Integer.parseInt(BALCONIES), AMENITIES, STORAGE, Integer.parseInt(EXPENSES));
			
		PublicationDTO pDTO = new PublicationDTO(PUBLICATIONID, TITLE, NEIGHBORHOODID, CITYID, 
				PROVINCEID, ADDRESS, OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, 
				BATHROOMS, FLOORSIZE, PARKING, DATESTRING,
				COVEREDFLOORSIZE, BALCONIES, AMENITIES, STORAGE, EXPENSES);
		
		when(imageDao.getImagesCountByPublicationId(anyLong())).thenReturn(0);
		
		Province prov = new Province();
		prov.setProvince("Test");
		p.setProvince(prov);
		Neighborhood neigh = new Neighborhood();
		neigh.setNeighborhood("Test");
		p.setNeighborhood(neigh);
		City city = new City();
		city.setCity("Test");
		p.setCity(city);
		
		assertSame(pDTO.getPublicationid(), ps.transform(p).getPublicationid());
		verify(imageDao).getImagesCountByPublicationId(anyLong());
	}
}


