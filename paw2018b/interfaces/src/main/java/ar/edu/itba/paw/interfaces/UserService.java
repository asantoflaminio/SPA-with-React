package ar.edu.itba.paw.interfaces;

import java.util.List;

import ar.edu.itba.paw.models.User;
import ar.edu.itba.paw.models.dto.UserDTO;

public interface UserService {

	public User create(String firstName, String lastName, String email, String password, String phoneNumber,
			String languaje, String role);

	public User findById(final long userid);

	public User findByUsername(String email);

	public boolean editData(String firstName, String lastName, String email, String phoneNumber, String oldEmail,
			long userid);

	public boolean editPassword(String newPassword, long userid);

	public void setPassword(String newPassword, String oldEmail);

	public List<UserDTO> findAllUsers(int page, int limit);

	public int getAllUsersCount();

	public void lock(boolean lock, long userid);

}
