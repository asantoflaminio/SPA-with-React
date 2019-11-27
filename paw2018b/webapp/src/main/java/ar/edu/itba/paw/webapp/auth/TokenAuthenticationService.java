package ar.edu.itba.paw.webapp.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.HashSet;

import ar.edu.itba.paw.models.dto.UserLogginDTO;

@Component
public class TokenAuthenticationService {
    private static final String AUTH_HEADER = "Authorization"; 

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final TokenHandler tokenHandler;

    public TokenAuthenticationService() {
        this.tokenHandler = new JWTTokenHandler();
    }

    Authentication getAuthentication(final HttpServletRequest request) {
        final String token = request.getHeader(AUTH_HEADER);
        Authentication authentication = null;

        if (token != null) {
            final String username = tokenHandler.getUsername(token);

            if (username != null) {

                try {
                    final UserDetails user = userDetailsService.loadUserByUsername(username);
                    final Collection<GrantedAuthority> authorities = new HashSet<GrantedAuthority>(user.getAuthorities());

                    authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(),
                            authorities);
                } catch (UsernameNotFoundException e) {
                    return null;
                }
            }
        }

        return authentication;
    }

    void addAuthentication(final HttpServletResponse response, final UserDetails userDetails) throws IOException, ServletException {
        final String token = tokenHandler.createToken(userDetails.getUsername());

        response.setHeader(AUTH_HEADER, "Bearer " + token);
    }

    Authentication getAuthenticationForLogin(final HttpServletRequest request) throws UserNotActiveException {
        try {
            final UserLogginDTO user = new ObjectMapper().readValue(request.getInputStream(), UserLogginDTO.class); // Attempt
            final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

            if (userDetails != null) {
                if (userDetails.isEnabled() && user.getUsername().equals(userDetails.getUsername())
                        && passwordEncoder.matches(user.getPassword(), userDetails.getPassword())) {
                    return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(),
                            userDetails.getAuthorities());
                } else if (!userDetails.isEnabled()
                        && passwordEncoder.matches(user.getPassword(), userDetails.getPassword())) {
                    throw new UserNotActiveException("User is not active");
                }
            }
        } catch (final IOException e) {
            return null;
        }

        return null;
    }
}

