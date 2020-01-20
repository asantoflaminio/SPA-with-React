package ar.edu.itba.paw.services;

import static org.junit.Assert.*;
import static org.junit.Assert.assertSame;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyLong;

import java.util.Date;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import ar.edu.itba.paw.interfaces.FavPublicationsDao;
import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.models.FavPublication;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.User;
import ar.edu.itba.paw.models.dto.PublicationDTO;

public class FavPublicationsServiceImplTest {
	
	private static final long USERID = 1;
	private static final long USERID2 = 2;
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
    private FavPublicationsServiceImpl fps;
	
	@Mock
	private FavPublicationsDao favPublicationDao;
	
	@Mock
	private PublicationDao publicationDao;
	
	@Rule
    public MockitoRule rule = MockitoJUnit.rule();
    
    @Before
    public void setUp() {
    	MockitoAnnotations.initMocks(this);
    }

	@Test
	public void testAddFavourite() {
		
		Publication p = new Publication(TITLE, ADDRESS, OPERATION, Integer.parseInt(PRICE), DESCRIPTION, PROPERTYTYPE, Integer.parseInt(BEDROOMS), 
				Integer.parseInt(BATHROOMS), Integer.parseInt(FLOORSIZE), Integer.parseInt(PARKING), DATE,
				Integer.parseInt(COVEREDFLOORSIZE), Integer.parseInt(BALCONIES), AMENITIES, STORAGE, Integer.parseInt(EXPENSES));
		User u = new User(USERID2, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE);
		p.setUser(u);
		FavPublication fp = new FavPublication();
		
		when(publicationDao.findById(anyLong())).thenReturn(p);
		when(favPublicationDao.addFavourite(anyLong(), anyLong())).thenReturn(fp);
		
		assertSame(fp.getUser(), fps.addFavourite(USERID, PUBLICATIONID).getUser());
		verify(favPublicationDao).addFavourite(anyLong(), anyLong());
		
	}
	
	@Test
	public void testIsFavourite() {

		when(favPublicationDao.isFavourite(anyLong(), anyLong())).thenReturn(true);
		
		PublicationDTO pDTO = new PublicationDTO(PUBLICATIONID, TITLE, NEIGHBORHOODID, CITYID, 
				PROVINCEID, ADDRESS, OPERATION, PRICE, DESCRIPTION, PROPERTYTYPE, BEDROOMS, 
				BATHROOMS, FLOORSIZE, PARKING, DATESTRING,
				COVEREDFLOORSIZE, BALCONIES, AMENITIES, STORAGE, EXPENSES);
		assertSame(PUBLICATIONID, fps.checkFavourite(pDTO, PUBLICATIONID).getPublicationid());
		verify(favPublicationDao).isFavourite(anyLong(), anyLong());
	}
	
	@Test
	public void testGetCountUserFavourites() {
		
		when(favPublicationDao.getCountUserFavourites(anyLong())).thenReturn(5);
		assertSame(5, fps.getCountUserFavourites(USERID));
		verify(favPublicationDao).getCountUserFavourites(anyLong());
	}

}
