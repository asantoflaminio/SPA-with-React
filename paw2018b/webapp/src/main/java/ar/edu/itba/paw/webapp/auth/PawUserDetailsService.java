package ar.edu.itba.paw.webapp.auth;

import java.util.Arrays;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Component
public class PawUserDetailsService implements UserDetailsService {

	@Autowired
	private UserService us;

	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
		final User user = us.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("No user by the name " + username);
		}
		final Collection<? extends GrantedAuthority> authorities;

		if (user.getRole().equals(Constants.Role.USER.getRole())) {
			if (user.isLocked())
				authorities = Arrays.asList(new SimpleGrantedAuthority(Constants.Authority.USER.getAuthority()),
						new SimpleGrantedAuthority(Constants.Authority.LOCKED.getAuthority()));
			else
				authorities = Arrays.asList(new SimpleGrantedAuthority(Constants.Authority.USER.getAuthority()));
		} else
			authorities = Arrays.asList(new SimpleGrantedAuthority(Constants.Authority.USER.getAuthority()),
					new SimpleGrantedAuthority(Constants.Authority.ADMIN.getAuthority()));
		return new org.springframework.security.core.userdetails.User(username, user.getPassword(), authorities);
	}

}
