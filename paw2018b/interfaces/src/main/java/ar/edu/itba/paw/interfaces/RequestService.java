package ar.edu.itba.paw.interfaces;

import java.util.Locale;

import javax.ws.rs.core.Response;

public interface RequestService {
	
	public Locale getLocale(String languaje);
	
	public Response okRequest();
	
	public Response okRequest(Object objectDTO);
	
	public Response createRequest();
	
	public Response createRequest(Object objectDTO);
	
	public Response badRequest();
	
	public Response notFound();
	
	public Response conflictRequest();

	public Response noContent();

	public Response forbidden();

	public Response badGateway();
	


}
