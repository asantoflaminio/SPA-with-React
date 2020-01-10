package ar.edu.itba.paw.services;

import java.util.Locale;

import javax.ws.rs.core.Response;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.RequestService;

@Service
public class RequestServiceImpl implements RequestService{

	private static final String SPANISH = "es";
	private static final String ENGLISH = "en";
	
	@Override
    public Locale getLocale(String languaje) {
    	if(languaje.indexOf("es") == 0) {
    		return new Locale(SPANISH);
    	}else {
    		return new Locale(ENGLISH);
    	}
    }
	
	@Override
	public Response okRequest() {
		return Response.ok().build();
	}
	
	@Override
	public Response createRequest() {
		return Response.status(Response.Status.CREATED).build();
	}
	
	@Override
	public Response createRequest(Object objectDTO) {
		return Response.status(Response.Status.CREATED).entity(objectDTO).build();
	}

	@Override
	public Response badRequest() {
		return Response.status(Response.Status.BAD_REQUEST).entity("Bad request").build();
	}

	@Override
	public Response conflictRequest() {
		return Response.status(Response.Status.CONFLICT).entity("Conflict").build();
	}



}
