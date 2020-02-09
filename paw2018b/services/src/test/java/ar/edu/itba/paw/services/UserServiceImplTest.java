package ar.edu.itba.paw.services;

import static org.junit.Assert.assertSame;

import java.util.Optional;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
public class UserServiceImplTest {

	private static final long USERID = 1;
	private static final long NONEXISTENTUSERID = 123;
	private static final String FIRSTNAME = "Testfirstname";
	private static final String LASTNAME = "TestLastName";
	private static final String EMAIL = "test1@mail.com";
	private static final String PASSWORD = "TestPassword";
	private static final String HASHEDPASSWORD = "$2a$10$PVqDyHloge5kJeqTCATApuF8wkxf.aD8qx.5aunMTFtw9fCViv8L6";
	private static final String PHONENUMBER = "1522334455";
	private static final String LANGUAGE = "TestLanguage";
	private static final String ROLE = "USER";
	private static final int USERSCOUNT = 5;

	@InjectMocks
	private UserServiceImpl us;

	@Mock
	private UserDao userDao;

	@Mock
	private ValidateServiceImpl vs;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Rule
	public MockitoRule rule = MockitoJUnit.rule();

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testUserCreate() {

		User u = new User(USERID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE);
		when(userDao.create(anyString(), anyString(), anyString(), anyString(), anyString(), anyString(), anyString()))
				.thenReturn(u);
		when(userDao.findByUsername(anyString())).thenReturn(null);
		when(passwordEncoder.encode(PASSWORD)).thenReturn(HASHEDPASSWORD);
		when(vs.validateUser(anyString(), anyString(), anyString(), anyString(), anyString())).thenReturn(true);
		User newUser = us.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PASSWORD, PHONENUMBER, ROLE);

		assertSame(u, newUser);
		verify(userDao).create(anyString(), anyString(), anyString(), anyString(), anyString(), anyString(),
				anyString());

	}

	@Test
	public void testFindUserByName() {

		User u = new User(USERID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE);
		when(userDao.findByUsername(anyString())).thenReturn(u);
		User newUser = us.findByUsername(EMAIL);
		assertSame(u, newUser);
		verify(userDao).findByUsername(anyString());

	}

	@Test
	public void testFindById() {

		User u = new User(USERID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE);
		when(userDao.findById(anyLong())).thenReturn(u);
		User newUser = us.findById(USERID);
		assertSame(u, newUser);
		verify(userDao).findById(anyLong());

	}

	@Test
	public void testAllUsersCount() {

		when(userDao.getAllUsersCount()).thenReturn(USERSCOUNT);
		assertSame(USERSCOUNT, us.getAllUsersCount());
		verify(userDao).getAllUsersCount();

	}

	@Test
	public void testEditPassword() {

		User u = new User(USERID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE);
		when(userDao.findByUsername(anyString())).thenReturn(u);
		when(vs.validateUserPassword(anyString())).thenReturn(true);
		when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
		when(passwordEncoder.encode(PASSWORD)).thenReturn(HASHEDPASSWORD);
		Mockito.doNothing().when(userDao).editPassword(anyString(), anyLong());
		assertSame(true, us.editPassword(PASSWORD, USERID));
		verify(userDao).editPassword(anyString(), anyLong());

	}

	@Test
	public void testEditData() {

		when(vs.validateUserData(anyString(), anyString(), anyString(), anyString())).thenReturn(true);
		User u = new User(USERID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE, LANGUAGE);
		when(userDao.findByUsername(anyString())).thenReturn(u);
		assertSame(true, us.editData(FIRSTNAME, LASTNAME, EMAIL, PHONENUMBER, EMAIL, USERID));
		verify(userDao).editData(FIRSTNAME, LASTNAME, EMAIL, PHONENUMBER, USERID);

	}

	@Test
	public void testFindByNonExistentId() {

		when(userDao.findById(NONEXISTENTUSERID)).thenReturn(null);
		User userByID = userDao.findById(NONEXISTENTUSERID);
		User u1 = us.findById(NONEXISTENTUSERID);
		Assert.assertNull(userByID);
		Assert.assertNull(u1);
		Assert.assertEquals(userByID, u1);

	}

}