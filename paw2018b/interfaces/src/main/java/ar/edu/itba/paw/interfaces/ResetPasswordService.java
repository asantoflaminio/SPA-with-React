package ar.edu.itba.paw.interfaces;

import java.util.Optional;

import ar.edu.itba.paw.models.ResetPassword;
import ar.edu.itba.paw.models.User;

public interface ResetPasswordService {
	
	public ResetPassword createRequest(User user);

    public Optional<User> getUser(String token);

    public boolean checkToken(String token);

    public void deleteRequest(Integer id);
    
    public void deleteOldRequests(User user);

    public String encrypt(String pure);

    public Optional<ResetPassword> getRequest(String token);

	public boolean isTokenExpired(Integer token, Optional<ResetPassword> resetPassword);
    
    
    
}
