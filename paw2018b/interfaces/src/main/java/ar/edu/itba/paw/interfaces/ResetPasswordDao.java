package ar.edu.itba.paw.interfaces;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.models.ResetPassword;
import ar.edu.itba.paw.models.User;

@Service
public interface ResetPasswordDao {

	ResetPassword createRequest(String token, long userId, String date);

	    Optional<User> getUser(String token);
	    
	    Optional<ResetPassword> getRequest(String token);

	    boolean checkToken(String token);

	    void deleteRequest(Integer id);
	    
}
