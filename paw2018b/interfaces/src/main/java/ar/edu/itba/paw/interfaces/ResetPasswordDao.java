package ar.edu.itba.paw.interfaces;

import java.util.Optional;

import ar.edu.itba.paw.models.ResetPassword;
import ar.edu.itba.paw.models.User;

public interface ResetPasswordDao {

	public ResetPassword createRequest(String token, long userId, String date);

	public Optional<User> getUser(String token);

	public Optional<ResetPassword> getRequest(String token);

	public boolean checkToken(String token);

	public void deleteRequest(Integer id);

	public void deleteOldRequests(long userId);

}
