package ar.edu.itba.paw.webapp.controller;

import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/")
@Component
public class ApiController {

    @GET
    @Produces(value = { MediaType.TEXT_HTML })
    public String api() {
        return "<html> " + "<title>" + "MeinHaus Api" + "</title>"
                + "<body><h1>" + "MeinHaus Api Rest 1.0" + "</body></h1>" + "</html> ";
    }
}