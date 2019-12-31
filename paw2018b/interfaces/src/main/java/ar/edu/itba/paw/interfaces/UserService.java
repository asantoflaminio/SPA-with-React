package ar.edu.itba.paw.interfaces;

import java.util.List;

import ar.edu.itba.paw.models.User;
import ar.edu.itba.paw.models.dto.UserDTO;

public interface UserService {
	
	public User create(String firstName, String lastName,String email,
			String password, String repeatPassword, String phoneNumber, String role);
	
	public User findById(final long userid);

	public User findByUsername(String email);
	
	public boolean editData(String firstName, String lastName, String email, String phoneNumber, String oldEmail);
	
	public boolean editPassword(String oldPassword,String newPassword, String oldEmail);
	
	public List<UserDTO> findAllUsers(String pageUsers);
	
	public int getCountAllUsers();
	
	public void lockUnlockUser(boolean status, long userid);
	

}
