package ar.edu.itba.paw.webapp.auth;


import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class RestAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setStatus(401);
        String json = "{\"message\": " + "\"" + exception.getMessage() + "\"}"; //Supuestamente este mensaje lo customizamos y lo manda al front x lo q entendi
        out.println(json);

    }
}
