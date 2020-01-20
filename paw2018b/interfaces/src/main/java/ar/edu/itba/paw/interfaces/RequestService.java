package ar.edu.itba.paw.interfaces;

import java.util.Locale;

import javax.ws.rs.core.Response;

public interface RequestService {
	
	public Locale getLocale(String languaje);
	
	public Response ok();
	
	public Response ok(Object objectDTO);
	
	public Response create();
	
	public Response create(Object objectDTO);
	
	public Response badRequest();
	
	public Response notFound();
	
	public Response conflict();

	public Response noContent();

	public Response forbidden();

	public Response badGateway();

	public Response unauthorized();
	


}
