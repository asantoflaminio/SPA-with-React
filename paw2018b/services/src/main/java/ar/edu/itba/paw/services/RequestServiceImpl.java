package ar.edu.itba.paw.services;

import java.util.Locale;

import javax.ws.rs.core.Response;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.RequestService;
import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.dto.ErrorDTO;

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
	public Response ok() {
		return Response.ok().build();
	}
	
	@Override
	public Response ok(Object objectDTO) {
		return Response.ok().entity(objectDTO).build();
	}
	
	@Override
	public Response create() {
		return Response.status(Response.Status.CREATED).build();
	}
	
	@Override
	public Response create(Object objectDTO) {
		return Response.status(Response.Status.CREATED).entity(objectDTO).build();
	}
	
	@Override
	public Response noContent() {
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@Override
	public Response badRequest(String details) {
		ErrorDTO errorDTO = new ErrorDTO();
		errorDTO.setError(Constants.Error.BAD_REQUEST.getError());
		errorDTO.setDetails(details);
		return Response.status(Response.Status.BAD_REQUEST).entity(errorDTO).build();
	}
	
	@Override
	public Response unauthorized(String details) {
		ErrorDTO errorDTO = new ErrorDTO();
		errorDTO.setError(Constants.Error.UNAUTHORIZED.getError());
		errorDTO.setDetails(details);
		return Response.status(Response.Status.UNAUTHORIZED).entity(errorDTO).build();
	}
	
	@Override
	public Response forbidden(String details) {
		ErrorDTO errorDTO = new ErrorDTO();
		errorDTO.setError(Constants.Error.FORBIDDEN.getError());
		errorDTO.setDetails(details);
		return Response.status(Response.Status.FORBIDDEN).entity(errorDTO).build();
	}
	
	@Override
	public Response notFound() {
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	
	@Override
	public Response notFound(String details) {
		ErrorDTO errorDTO = new ErrorDTO();
		errorDTO.setError(Constants.Error.NOT_FOUND.getError());
		errorDTO.setDetails(details);
		return Response.status(Response.Status.NOT_FOUND).entity(errorDTO).build();
	}

	@Override
	public Response conflict(String details) {
		ErrorDTO errorDTO = new ErrorDTO();
		errorDTO.setError(Constants.Error.CONFLICT.getError());
		errorDTO.setDetails(details);
		return Response.status(Response.Status.CONFLICT).entity(errorDTO).build();
	}

	
	@Override
	public Response badGateway(String details) {
		ErrorDTO errorDTO = new ErrorDTO();
		errorDTO.setError(Constants.Error.CONFLICT.getError());
		errorDTO.setDetails(details);
		return Response.status(Response.Status.BAD_GATEWAY).entity(errorDTO).build();
	}



}
