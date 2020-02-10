package ar.edu.itba.paw.interfaces;

import java.util.List;

import ar.edu.itba.paw.models.User;

public interface UserDao {

	public User findById(final long id);

	public User create(String firstName, String lastName, String email, String password, String phoneNumber,
			String languaje, String role);

	public User findByUsername(String email);

	public void editData(String firstName, String lastName, String email, String phoneNumber, long userid);

	public void editPassword(String newPassword, long userid);

	public List<User> findAllUsers(int page, int limit);

	public int getAllUsersCount();

	public void lock(boolean lock, long userid);

}