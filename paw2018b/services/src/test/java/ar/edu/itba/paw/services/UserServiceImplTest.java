package ar.edu.itba.paw.services;

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

import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
public class UserServiceImplTest {
	/*
	
	private static final long USERID = 1;
	private static final long NONEXISTENTUSERID = 123;
	private static final String FIRSTNAME = "TestFirstName";
	private static final String LASTNAME = "TestLastName";
	private static final String EMAIL = "test1@mail.com";
	private static final String PASSWORD = "TestPassword";
	private static final String PHONENUMBER = "1522334455";
	private static final String LANGUAGE = "TestLanguage";
	private static final String ROLE = "ADMIN";
	
    @InjectMocks
    private UserServiceImpl userService;
	
    @Mock
    private UserDao userDao;
    
    private User user;
    
    @Mock
    private ValidateServiceImpl vs;
    
    @Rule
    public MockitoRule rule = MockitoJUnit.rule();
    
    @Before
    public void setUp() {
    	Mockito.reset(userDao);
    	user = Mockito.mock(User.class);
    	Mockito.when(userDao.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE)).
    	thenReturn(user);
    	Mockito.when(userDao.findById(NONEXISTENTUSERID)).thenReturn(null);
    	Mockito.when(userDao.findById(USERID)).thenReturn(new User(USERID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE));
    	Mockito.when(userDao.findByUsername(FIRSTNAME)).thenReturn(new User(USERID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE));
    }
    
	/*@Test 
	public void createUserTest() {
		User newUser = userService.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE);
		Assert.assertNotNull(newUser); 
	}
	
	@Test
	public void testFindUserByIdSuccess() {
		Assert.assertNotNull(userService.findById(USERID));
	}

	@Test
	public void testFindUserByIdFailure() {
		Assert.assertNull(userService.findById(NONEXISTENTUSERID));
	}
	
	@Test
	public void testFindUserByNameSuccess() {
		Assert.assertNotNull(userService.findByUsername(FIRSTNAME));
		
	}
	
	@Test
	public void testLockSuccess() {
		userService.lockUnlockUser(true, 1);
		Assert.assertNotNull(user.isLocked());
		
	}

	/*
	@Test
    public void testFindById(){
		Mockito.when(userDao.findById(USERID)).
		thenReturn(new User(USERID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE));
		
		User userByID = userDao.findById(USERID);
		User user = userService.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE);
        User u1 = userService.findById(user.getUserid());
        Assert.assertNotNull(u1);
        Assert.assertNotNull(userByID);
        Assert.assertEquals(userByID,u1);
    }
	
	@Test
    public void testFindByNonExistentId(){
		Mockito.when(userDao.findById(NONEXISTENTUSERID)).thenReturn(null);
		
		User userByID = userDao.findById(NONEXISTENTUSERID);
        User u1 = userService.findById(NONEXISTENTUSERID);
		Assert.assertNull(userByID);
        Assert.assertNull(u1);
        Assert.assertEquals(userByID,u1);
    }
	
	@Test
	public void testValidateInvalidFirstName() {
		User user1 = userService.create("Helloworld1234", LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE);
		User user2 = userService.create("a", LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE);
		User user3 = userService.create("Thisisaverylongnameofapproximately100characters", LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE);
		Assert.assertNull(user1);
		Assert.assertNull(user2);
		Assert.assertNull(user3);
	}*/
	
}