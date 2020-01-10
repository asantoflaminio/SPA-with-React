package ar.edu.itba.paw.interfaces;

import java.util.Locale;

import javax.ws.rs.core.Response;

public interface RequestService {
	
	public Locale getLocale(String languaje);
	
	public Response okRequest();
	
	public Response createRequest();
	
	public Response createRequest(Object objectDTO);
	
	public Response badRequest();
	
	public Response conflictRequest();
	


}
