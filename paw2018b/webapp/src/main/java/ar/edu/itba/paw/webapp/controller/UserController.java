package ar.edu.itba.paw.webapp.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import ar.edu.itba.paw.interfaces.FavPublicationsService;
import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.dto.IDResponseDTO;
import ar.edu.itba.paw.models.dto.MessageDTO;
import ar.edu.itba.paw.models.dto.MyPublicationsDTO;
import ar.edu.itba.paw.models.dto.PaginationDTO;
import ar.edu.itba.paw.models.dto.PublicationDTO;
import ar.edu.itba.paw.models.dto.UserDTO;
import ar.edu.itba.paw.models.dto.UserLoginDTO;
import ar.edu.itba.paw.services.MailServiceImpl;
import ar.edu.itba.paw.webapp.auth.TokenAuthenticationService;

@Path("users")
@Component
public class UserController {
	
	@Autowired
	private UserService us;
	
	@Autowired
	private PublicationService ps;
	
	@Autowired
	private MailServiceImpl ms;
	
	@Autowired
	private FavPublicationsService fps;
	
	@Autowired
	private TokenAuthenticationService tas;
	

    @POST
    @Path("/signUp")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response createUser (final UserDTO userDTO) {
    	us.create(userDTO.getFirstName(), userDTO.getLastName(), 
    			userDTO.getEmail(), userDTO.getPassword(), userDTO.getPhoneNumber(), "USER");
    	UserLoginDTO loginInfo = new UserLoginDTO(userDTO.getEmail(),userDTO.getPassword());
        return Response.ok().entity(loginInfo).build();
    }
    
    @POST
    @Path("/publish")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response createPublication (@Context HttpServletRequest request, final PublicationDTO publicationDTO) {
    	Publication pub = ps.create(publicationDTO.getTitle(), publicationDTO.getAddress(), publicationDTO.getNeighborhoodID(), 
    			publicationDTO.getCityID(), publicationDTO.getProvinceID(), publicationDTO.getOperation(), 
    			publicationDTO.getPrice(), publicationDTO.getDescription(), publicationDTO.getPropertyType(), 
    			publicationDTO.getBedrooms(), publicationDTO.getBathrooms(), publicationDTO.getDimention(), 
    			publicationDTO.getParking(),
    			publicationDTO.getCoveredFloorSize(), publicationDTO.getBalconies(),
    			publicationDTO.getAmenities(), publicationDTO.getStorage(), publicationDTO.getExpenses(), tas.getUserIdAuthentication(request));
    	
    	if(pub != null)
    		return Response.ok().entity(new IDResponseDTO(pub.getPublicationid())).build();
    	else 
    		return Response.status(Response.Status.BAD_REQUEST).build();

    	
    }
    
    @POST
    @Path("/images")
    @Consumes(value = {MediaType.MULTIPART_FORM_DATA} )
    public Response uploadImages (@RequestParam CommonsMultipartFile[] filesUpload) {
    	//System.out.println(files.length);
        return Response.ok().build();
    }
    

    
    @POST
    @Path("/sendMessage")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response sendMessage (MessageDTO messageDTO) {
    	ms.sendEmail(messageDTO.getOwnerEmail(), messageDTO.getEmail(), messageDTO.getMessage(), messageDTO.getTitle());
        return Response.ok().build();
    }
    
    @POST
    @Path("/getQuantity")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getMyPublicationsQuantity (IDResponseDTO id) {   
    	int quantity = ps.getCountPublicationsOfUser(id.getId());
    	return Response.ok().entity(quantity).build();
    	
    }
    
    @POST
    @Path("/getMyFavoritesQuantity")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getMyFavoritesQuantity (IDResponseDTO id) {   	
    	int quantity = fps.getCountUserFavourites(id.getId());
    	return Response.ok().entity(quantity).build();
    	
    }
    
    @POST
    @Path("/getMyPublicationsMade")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getMyPublications (MyPublicationsDTO pub /*IDResponseDTO id*/) {
    	System.out.println("entre");
    	List<PublicationDTO> publications = ps.findByUserId(pub.getId(), pub.getPage().toString());
    	// PageDTO p = new PageDTO(1);
    	// List<PublicationDTO> publications = ps.findByUserId(id.getId(), p.getPage().toString());
    	System.out.println("aca" + publications.size());
    	return Response.ok().entity(publications).build();
    }
    
    @POST
    @Path("/getMyPublicationsCount")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getMyPublicationsCount (IDResponseDTO id) {
    	int pubs = ps.getCountPublicationsOfUser(id.getId());
    	PaginationDTO quantity = new PaginationDTO(pubs, 1); //cambiar x la constante que dice en persistance
    	return Response.ok().entity(quantity).build();
    }

}
