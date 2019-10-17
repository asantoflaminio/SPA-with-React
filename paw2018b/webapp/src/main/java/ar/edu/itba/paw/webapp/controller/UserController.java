package ar.edu.itba.paw.webapp.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.models.dto.PublicationDTO;
import ar.edu.itba.paw.models.dto.UserDTO;

@Path("users")
@Component
public class UserController {
	
	@Autowired
	private UserService us;
	
	@Autowired
	private PublicationService ps;
	

	
    @POST
    @Path("/signUp")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createUser (final UserDTO userDTO) {
    	System.out.println("Called!");
    	us.create(userDTO.getFirstName(), userDTO.getLastName(), 
    			userDTO.getEmail(), userDTO.getPassword(), userDTO.getPhoneNumber(), "ADMIN");
    	
        return Response.ok().build();
    }
    
    @POST
    @Path("/publish")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createPublication (final PublicationDTO publicationDTO) {
    	System.out.println("Called publication!");
    	
    	ps.create(publicationDTO.getTitle(), publicationDTO.getAddress(), publicationDTO.getNeighborhood(), 
    			publicationDTO.getCity(), publicationDTO.getProvince(), publicationDTO.getOperation(), 
    			publicationDTO.getPrice(), publicationDTO.getDescription(), publicationDTO.getPropertyType(), 
    			publicationDTO.getBedrooms(), publicationDTO.getBathrooms(), publicationDTO.getDimention(), 
    			publicationDTO.getParking(), 1);
    	
        return Response.ok().build();
    }


}
