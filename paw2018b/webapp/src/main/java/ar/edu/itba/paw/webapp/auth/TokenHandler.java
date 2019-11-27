package ar.edu.itba.paw.webapp.auth;

interface TokenHandler {
	
    String createToken(String username);

    String getUsername(String token);
}
