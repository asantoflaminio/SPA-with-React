//package ar.edu.itba.paw.persistence;
//
//import org.junit.Assert;
//
//
//import org.junit.Before;
//import org.junit.Test;
//import org.mockito.Mockito;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//import static org.mockito.Mockito.when;
//
//import ar.edu.itba.paw.models.User;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(classes = TestConfig.class)
//@Transactional
//public class UserHibernateDaoTest {
//	
//	private static final long USERID = 1;
//	private static final long NONEXISTENTUSERID = -1;
//	private static final String FIRSTNAME = "TestFirstName";
//	private static final String LASTNAME = "TestLastName";
//	private static final String EMAIL = "test1@mail.com";
//	private static final String PASSWORD = "TestPassword";
//	private static final String PHONENUMBER = "1522334455";
//	private static final String ROLE = "USER";
//
//	private static final long USERID2 = 2;
//	private static final String FIRSTNAME2 = "TestFirstName2";
//	private static final String LASTNAME2 = "TestLastName2";
//	private static final String EMAIL2 = "test2@mail.com";
//	private static final String EMAIL3 = "test3@mail.com";
//	private static final String PASSWORD2 = "TestPassword2";
//	private static final String PASSWORD3 = "TestPassword2TestPassword2TestPassword2TestPassword2TestPassword2TestPassword2TestPassword2TestPassword2";
//	private static final String PHONENUMBER2 = "1522334455";
//	
//	private User user, u;	
//	
//	@Autowired
//	private UserHibernateDao userHibernateDao;	
//	
//	@Autowired
//	@Before
//	public void setUp() {
//		this.userHibernateDao = new UserHibernateDao();
//		user = Mockito.mock(User.class);	
//	}
//	
//	@Test
//	public void testCreateUser() {
//		
//	    u = userHibernateDao.create(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, PHONENUMBER, ROLE);
//	    User u2 = userHibernateDao.create(FIRSTNAME2, LASTNAME2, EMAIL2, PASSWORD2, PHONENUMBER2, ROLE);
//		
//        when(user.getFirstName()).thenReturn(FIRSTNAME);
//        when(user.getLastName()).thenReturn(LASTNAME);
//        when(user.getEmail()).thenReturn(EMAIL);
//        when(user.getPassword()).thenReturn(PASSWORD);
//        when(user.getPhoneNumber()).thenReturn(PHONENUMBER);
//        when(user.getRole()).thenReturn(ROLE);
//		                
//		Assert.assertNotNull(u);
//		Assert.assertEquals(u.getFirstName(), user.getFirstName());
//		Assert.assertEquals(u.getLastName(), user.getLastName());
//		Assert.assertEquals(u.getEmail(), user.getEmail());
//		Assert.assertEquals(u.getPassword(), user.getPassword());
//		Assert.assertEquals(u.getPhoneNumber(), user.getPhoneNumber());
//		Assert.assertEquals(u.getRole(), user.getRole());
//		
//		Assert.assertNotEquals(u.getUserid(), u2.getUserid());
//
//		//Assert.assertEquals(1, JdbcTestUtils.countRowsInTable(jdbcTemplate, "users"));
//	}
//
//	@Test
//	public void testEditData() {
//		//JdbcTestUtils.deleteFromTables(jdbcTemplate, "users");
//		
//        userHibernateDao.editData(FIRSTNAME2, LASTNAME2, EMAIL3, PHONENUMBER2, USERID);
//        
//        when(user.getFirstName()).thenReturn(FIRSTNAME2);
//        when(user.getLastName()).thenReturn(LASTNAME2);
//        when(user.getEmail()).thenReturn(EMAIL3);
//        when(user.getPhoneNumber()).thenReturn(PHONENUMBER2);
//        
//		Assert.assertEquals(u.getFirstName(), user.getFirstName());
//		Assert.assertEquals(u.getLastName(), user.getLastName());
//		Assert.assertEquals(u.getEmail(), user.getEmail());
//		Assert.assertEquals(u.getPhoneNumber(), user.getPhoneNumber());
//		//Assert.assertEquals(1, JdbcTestUtils.countRowsInTable(jdbcTemplate, "users"));
//	}
//
//	@Test
//	public void testEditPassword() {
//		
//        userHibernateDao.editPassword(PASSWORD2, USERID);
//        when(user.getPassword()).thenReturn(PASSWORD2);
//        
//		Assert.assertEquals(u.getPassword(), user.getPassword());
//		
//		//password too long
//        userHibernateDao.editPassword(PASSWORD3, USERID);
//        when(user.getPassword()).thenReturn(PASSWORD2);
//        
//		Assert.assertEquals(u.getPassword(), user.getPassword());
//	}
//	
//
//	@Test
//	public void testLockUnlockUser() {
//        userHibernateDao.lockUnlockUser(false, USERID);
//        when(user.isLocked()).thenReturn(true);
//        
//		Assert.assertEquals(u.isLocked(), user.isLocked());
//		
//        userHibernateDao.lockUnlockUser(true, USERID);
//        when(user.isLocked()).thenReturn(false);
//        
//		Assert.assertEquals(u.isLocked(), user.isLocked());
//	}
//	
//	@Test
//	public void testFindByUsername() {
//		final User u = userHibernateDao.findByUsername(EMAIL2);
//		final User u2 = userHibernateDao.findByUsername(EMAIL);
//		
//        when(user.getEmail()).thenReturn(EMAIL2);
//		
//		Assert.assertNotNull(u);
//		Assert.assertNull(u2);
//		Assert.assertEquals(u.getEmail(), user.getEmail());
//	}
//	
//	@Test
//	public void testFindById() {
//		final User u = userHibernateDao.findById(USERID);
//		final User u2 = userHibernateDao.findById(USERID2);
//		final User u3 = userHibernateDao.findById(NONEXISTENTUSERID);
//		
//        when(user.getUserid()).thenReturn(USERID);
//		
//		Assert.assertNotNull(u);
//		Assert.assertNotNull(u2);
//		Assert.assertNull(u3);
//		Assert.assertNotEquals(u, u2);
//		Assert.assertEquals(u.getUserid(), user.getUserid());
//	}
//		
//}