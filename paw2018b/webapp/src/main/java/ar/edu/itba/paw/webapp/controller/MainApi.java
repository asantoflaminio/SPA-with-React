package ar.edu.itba.paw.webapp.controller;

import java.util.Base64;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.models.dto.PublicationsDTO;
import ar.edu.itba.paw.services.ImageServiceImpl;

@Path("home")
@Component
public class MainApi {
	
	@Autowired
	private ImageServiceImpl is;
	
	@Autowired
	private PublicationService ps;
	
	/*
    @GET
    @Path("/img")
    @Produces("image/png")
    public Response getImg () {
    	System.out.println("Called img!");
    	byte[] data = is.findFirstById(1).getData();
        return Response.ok(data).build();
    }
	*/
	
    @GET
    @Path("/img")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getImg () {
    	System.out.println("Called img!");
    	byte[] data = is.findFirstById(1).getData();
    	byte[] dataBase64 = Base64.getEncoder().encode(data);
        return Response.ok(dataBase64).build();
    }
    
    @GET
    @Path("/getSalePublications")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getSalePublications () {
    	PublicationsDTO publications = new PublicationsDTO(ps.findNewest("FSale"));
    	return Response.ok().entity(publications).build();
    }
    
    @GET
    @Path("/getRentPublications")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getRentPublications () {
    	PublicationsDTO publications = new PublicationsDTO(ps.findNewest("FRent"));
    	return Response.ok().entity(publications).build();
    }
}
