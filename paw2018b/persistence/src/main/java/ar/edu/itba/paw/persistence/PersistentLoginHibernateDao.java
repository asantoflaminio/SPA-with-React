package ar.edu.itba.paw.persistence;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.models.PersistentLogin;

@Repository("persistentTokenRepository")
public class PersistentLoginHibernateDao implements PersistentTokenRepository {

	@PersistenceContext
	private EntityManager em;

	@Override
	@Transactional
	public void createNewToken(PersistentRememberMeToken token) {
		PersistentLogin logins = new PersistentLogin();
		logins.setEmail(token.getUsername());
		logins.setSeries(token.getSeries());
		logins.setToken(token.getTokenValue());
		logins.setLastUsed(token.getDate());
		em.persist(logins);

	}

	@Override
	@Transactional
	public void updateToken(String series, String tokenValue, Date lastUsed) {
		final Query query = em.createQuery("update PersistentLogin as pl set pl.token = :token "
				+ "AND pl.lastUsed = :lastUsed where pl.series = :series");
		query.setParameter("token", tokenValue);
		query.setParameter("lastUsed", lastUsed);
		query.setParameter("series", series);
		query.executeUpdate();

	}

	@Override
	@Transactional
	public PersistentRememberMeToken getTokenForSeries(String seriesId) {
		final String queryString = "from PersistentLogin as pl WHERE pl.series = :series";
		final TypedQuery<PersistentLogin> query = em.createQuery(queryString, PersistentLogin.class);
		query.setParameter("series", seriesId);
		PersistentLogin logins = query.getResultList().get(0);

		if (logins != null) {
			final Collection<? extends GrantedAuthority> authorities = Arrays
					.asList(new SimpleGrantedAuthority("ROLE_USER"));
			Authentication auth = new UsernamePasswordAuthenticationToken(logins.getEmail(), null, authorities);
			SecurityContextHolder.getContext().setAuthentication(auth);
			return new PersistentRememberMeToken(logins.getEmail(), logins.getSeries(), logins.getToken(),
					logins.getLastUsed());
		}
		return null;
	}

	@Override
	@Transactional
	public void removeUserTokens(String email) {
		final Query query = em.createQuery("delete PersistentLogin as pl WHERE pl.email = :email");
		query.setParameter("email", email);
		query.executeUpdate();
	}

}
