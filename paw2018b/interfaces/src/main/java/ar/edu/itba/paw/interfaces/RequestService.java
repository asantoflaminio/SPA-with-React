package ar.edu.itba.paw.interfaces;

import java.util.Locale;

import javax.ws.rs.core.Response;

public interface RequestService {
	
	public Locale getLocale(String languaje);
	
	public Response ok();
	
	public Response ok(Object objectDTO);
	
	public Response create();
	
	public Response create(Object objectDTO);
	
	public Response noContent();
	
	public Response badRequest(String details);
	
	public Response unauthorized(String details);
	
	public Response forbidden(String details);
	
	public Response notFound();
	
	public Response notFound(String details);
	
	public Response conflict(String details);

	public Response badGateway(String details);

}
