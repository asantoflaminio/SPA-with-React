package ar.edu.itba.paw.webapp.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.interfaces.FavPublicationsService;
import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.dto.EmailDTO;
import ar.edu.itba.paw.models.dto.IDResponseDTO;
import ar.edu.itba.paw.models.dto.MessageDTO;
import ar.edu.itba.paw.models.dto.MyPublicationsDTO;
import ar.edu.itba.paw.models.dto.PaginationDTO;
import ar.edu.itba.paw.models.dto.PublicationDTO;
import ar.edu.itba.paw.models.dto.UserDTO;
import ar.edu.itba.paw.models.dto.UserLoginDTO;
import ar.edu.itba.paw.services.ImageServiceImpl;
import ar.edu.itba.paw.services.MailServiceImpl;
import ar.edu.itba.paw.services.RequestServiceImpl;
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
	
	@Autowired
	private RequestServiceImpl rs;
	
	@Autowired
	private ImageServiceImpl is;
	

    @POST
    @Path("/signUp")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response createUser (final UserDTO userDTO) {
    	us.create(userDTO.getFirstName(), userDTO.getLastName(), 
    			userDTO.getEmail(), userDTO.getPassword(), userDTO.getRepeatPassword(), userDTO.getPhoneNumber(), "USER");
    	UserLoginDTO loginInfo = new UserLoginDTO(userDTO.getEmail(),userDTO.getPassword());
        return Response.ok().entity(loginInfo).build();
    }
    
    @POST
    @Path("/checkEmail")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response checkEmail (final EmailDTO emailDTO) {
    	if(us.findByUsername(emailDTO.getEmail()) == null)
    		return Response.ok().build();
    	else
    		return rs.conflictRequest();
    	
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
    		return rs.badRequest();

    	
    }
    
    @POST
    @Path("/images")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadImageFile(@FormDataParam("publicationid") long publicationid,
			@FormDataParam("files") List<FormDataBodyPart> bodyParts,
			@FormDataParam("files") FormDataContentDisposition fileDispositions) throws IOException {
    	if(bodyParts != null && bodyParts.size() > 0)
    		is.create(bodyParts, publicationid);
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
    public Response getMyPublications (MyPublicationsDTO pub) {
    	List<PublicationDTO> publications = ps.findByUserId(pub.getId(), pub.getPage().toString());
    	return Response.ok().entity(publications).build();
    }
    
    @POST
    @Path("/getMyPublicationsCount")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getMyPublicationsCount (IDResponseDTO iDResponseDTO) {
    	int pubs = ps.getCountPublicationsOfUser(iDResponseDTO.getId());
    	PaginationDTO quantity = new PaginationDTO(pubs, ps.getMaxResultProfile());
    	return Response.ok().entity(quantity).build();
    }
    
    @POST
    @Path("/favouritePublication")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response favouritePublication (@Context HttpServletRequest request, final IDResponseDTO iDResponseDTO) {
    	fps.addFavourite(tas.getUserIdAuthentication(request), iDResponseDTO.getId());
    	return Response.ok().build();
    }
    
    @POST
    @Path("/unfavouritePublication")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response unfavouritePublication (@Context HttpServletRequest request, final IDResponseDTO iDResponseDTO) {
    	fps.removeFavourite(tas.getUserIdAuthentication(request), iDResponseDTO.getId());
    	return Response.ok().build();
    }

}
