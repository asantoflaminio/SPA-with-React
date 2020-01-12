package ar.edu.itba.paw.interfaces;

import java.util.Optional;

import ar.edu.itba.paw.models.ChangePassword;
import ar.edu.itba.paw.models.User;

public interface ChangePasswordService {
	
	ChangePassword createRequest(User user, String date);

    Optional<User> getUser(String token);

    boolean checkToken(String token);

    void deleteRequest(Integer id);

    String encrypt(String pure);

    Optional<ChangePassword> getRequest(String token);
    
}
