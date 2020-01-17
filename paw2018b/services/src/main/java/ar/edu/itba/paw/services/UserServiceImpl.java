package ar.edu.itba.paw.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.models.User;
import ar.edu.itba.paw.models.dto.UserDTO;

@Service
public class UserServiceImpl implements UserService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ValidateServiceImpl vs;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public User create(String firstName, String lastName,String email,
			String password, String repeatPassword, String phoneNumber, String role) {
		LOGGER.trace("Creating user with email {}", email);
		return userDao.create(firstName, lastName, email, passwordEncoder.encode(password), phoneNumber, role);
	}
	
	@Override
	public boolean editData(String firstName, String lastName, String email, String phoneNumber, String oldEmail) {
		if(! vs.validateUserData(firstName,lastName, email, phoneNumber))
			return false;
		userDao.editData(firstName, lastName, email, phoneNumber,userDao.findByUsername(oldEmail).getUserid());
		LOGGER.trace("Editing data of user with email {}", email);
		return true;
	}
	
	@Override
	public boolean editPassword(String oldPassword,String newPassword, String oldEmail) {
		User user = userDao.findByUsername(oldEmail);
		
		if(! vs.validateUserPassword(newPassword)) 
			return false;
		
		if(! passwordEncoder.matches(oldPassword, user.getPassword())) 
			return false;
		
		userDao.editPassword(passwordEncoder.encode(newPassword), user.getUserid());
		LOGGER.trace("Editing password of user with email {}", oldEmail);
		return true;
	}
	
	@Override
	public void setPassword(String newPassword, String oldEmail) {
		
		User user = userDao.findByUsername(oldEmail);
		userDao.editPassword(passwordEncoder.encode(newPassword), user.getUserid());
		LOGGER.trace("New password set for user with email {}", oldEmail);
	}
	
	@Override
	public User findById(final long userid) {
		if(userid < 0){
            LOGGER.error("Attempted to find a user with a negative id");
            throw new IllegalArgumentException("id must be positive");
        }
		
        LOGGER.trace("Looking up user with id {}", userid);
        return userDao.findById(userid);
	}
	
	@Override
	public User findByUsername(String email) {
		LOGGER.debug("Looking up user with email {}", email);
		return userDao.findByUsername(email);
	}
	
	@Override
	public List<UserDTO> findAllUsers(int page, int limit){
		LOGGER.debug("Looking for all users in DB");
		List<UserDTO> users = new ArrayList<UserDTO>();
		for(User user: userDao.findAllUsers(page,limit)) {
			users.add(new UserDTO(user.getEmail(),user.isLocked(),user.getUserid()));
		}
		return users;
	}
	
	@Override
	public int getAllUsersCount() {
		return userDao.getAllUsersCount();
	}
	
	@Override
	public void lock(boolean lock, long userid) {
		LOGGER.debug("Lock user with userid {} ", userid);
		userDao.lock(lock,userid);
	}

}
