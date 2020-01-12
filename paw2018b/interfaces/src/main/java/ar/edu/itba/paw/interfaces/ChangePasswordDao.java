package ar.edu.itba.paw.interfaces;

import java.util.Date;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.models.ChangePassword;
import ar.edu.itba.paw.models.User;

@Service
public interface ChangePasswordDao {

	 	ChangePassword createRequest(String token, long userId, String date);

	    Optional<User> getUser(String token);
	    
	    Optional<ChangePassword> getRequest(String token);

	    boolean checkToken(String token);

	    void deleteRequest(Integer id);
	    
}
