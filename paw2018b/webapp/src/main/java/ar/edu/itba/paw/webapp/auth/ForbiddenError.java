package ar.edu.itba.paw.webapp.auth;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ForbiddenError implements AccessDeniedHandler {

	@Override
	public void handle(final HttpServletRequest request, final HttpServletResponse response,
			final AccessDeniedException accessDeniedException) throws IOException, ServletException {

		response.sendError(HttpServletResponse.SC_FORBIDDEN);
	}
}
