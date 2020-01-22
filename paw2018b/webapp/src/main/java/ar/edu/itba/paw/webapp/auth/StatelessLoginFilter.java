package ar.edu.itba.paw.webapp.auth;

import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.models.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class StatelessLoginFilter extends AbstractAuthenticationProcessingFilter {

    private static final String USER_ID_HEADER = "User-Id";

    private final TokenAuthenticationService tokenAuthenticationService;
    private final UserDetailsService userDetailsService;
    private final UserService userService;

    public StatelessLoginFilter(String urlMapping, TokenAuthenticationService tokenAuthenticationService,
                                UserDetailsService userDetailsService, UserService userService, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(urlMapping));
        this.userDetailsService = userDetailsService;
        this.tokenAuthenticationService = tokenAuthenticationService;
        this.userService = userService;
        this.setAuthenticationManager(authManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        Authentication authentication;

        authentication = tokenAuthenticationService.getAuthenticationForLogin(request);

        if (authentication == null) {
            throw new UserAuthenticationException("Authentication failed");
        }

        return authentication;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authentication) throws IOException, ServletException {

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());
        final User user = userService.findByUsername(authentication.getName());

        tokenAuthenticationService.addAuthentication(response, userDetails);

        if(user != null) {
        	response.addHeader(USER_ID_HEADER, Long.toString(user.getUserid()));
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private class UserAuthenticationException extends AuthenticationException {
		private static final long serialVersionUID = 1L;

		UserAuthenticationException(String msg) {
            super(msg);
        }
    }
}

