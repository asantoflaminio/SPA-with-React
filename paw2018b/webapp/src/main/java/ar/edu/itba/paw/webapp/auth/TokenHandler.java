package ar.edu.itba.paw.webapp.auth;

interface TokenHandler {
	
    public String createToken(String username);

    public String getUsername(String token);
}
