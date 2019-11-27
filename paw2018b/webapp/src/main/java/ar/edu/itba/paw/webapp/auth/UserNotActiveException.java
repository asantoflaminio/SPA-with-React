package ar.edu.itba.paw.webapp.auth;

public class UserNotActiveException extends Exception {

	private static final long serialVersionUID = 1L;

	public UserNotActiveException(String msg) {
        super(msg);
    }

}