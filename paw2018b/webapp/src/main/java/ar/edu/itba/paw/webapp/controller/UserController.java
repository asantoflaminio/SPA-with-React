package ar.edu.itba.paw.webapp.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import ar.edu.itba.paw.interfaces.FavPublicationsService;
import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.models.FavPublication;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.User;
import ar.edu.itba.paw.models.dto.EmailDTO;
import ar.edu.itba.paw.models.dto.IDResponseDTO;
import ar.edu.itba.paw.models.dto.MessageDTO;
import ar.edu.itba.paw.models.dto.PageDTO;
import ar.edu.itba.paw.models.dto.PaginationDTO;
import ar.edu.itba.paw.models.dto.PublicationDTO;
import ar.edu.itba.paw.models.dto.RecoveryMessageDTO;
import ar.edu.itba.paw.models.dto.UserDTO;
import ar.edu.itba.paw.models.dto.UserLoginDTO;
import ar.edu.itba.paw.services.ImageServiceImpl;
import ar.edu.itba.paw.services.MailServiceImpl;
import ar.edu.itba.paw.services.RequestServiceImpl;
import ar.edu.itba.paw.webapp.auth.TokenAuthenticationService;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

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
    @Path("/isAccount")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response checkForExistingMail (final EmailDTO emailDTO) {
    	if(us.findByUsername(emailDTO.getEmail()) != null)
    		return Response.ok().build();
    	else
    		return rs.notFound();
    	
    }
    
    @POST
    @Path("/forgottenPasswordEmail")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response forgottenPasswordEmail (RecoveryMessageDTO recoveryMessageDTO) {
    	ms.sendPasswordRecoveryEmail(recoveryMessageDTO.getEmail());
        return Response.ok().build();
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
    	ms.sendEmail(messageDTO.getName() ,messageDTO.getOwnerEmail(), messageDTO.getEmail(), messageDTO.getMessage(), messageDTO.getTitle());
        return Response.ok().build();
    }
    
    @GET
    @Path("/getMyPublicationsQuantity")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getMyPublicationsQuantity (@Context HttpServletRequest request) {   
    	int quantity = ps.getCountPublicationsOfUser(tas.getUserIdAuthentication(request));
    	return Response.ok().entity(quantity).build();
    	
    }
    
    @GET
    @Path("/getMyFavoritesQuantity")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getMyFavoritesQuantity (@Context HttpServletRequest request) {   	
    	int quantity = fps.getCountUserFavourites(tas.getUserIdAuthentication(request));
    	return Response.ok().entity(quantity).build();
    	
    }
    
    @POST
    @Path("/getMyPublications")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getMyPublications (@Context HttpServletRequest request, final PageDTO page) {
    	List<PublicationDTO> publications = ps.findByUserId(tas.getUserIdAuthentication(request), page.getPage().toString());
    	return Response.ok().entity(publications).build();
    }
    
    @GET
    @Path("/getMyFavoritesPublications")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getMyFavoritesPublications (@Context HttpServletRequest request) {
    	List<PublicationDTO> publications = fps.getUserFavourites(tas.getUserIdAuthentication(request));
    	return Response.ok().entity(publications).build();
    }
    
    @GET
    @Path("/getMyPublicationsCount")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getMyPublicationsCount (@Context HttpServletRequest request) {
    	int pubs = ps.getCountPublicationsOfUser(tas.getUserIdAuthentication(request));
    	PaginationDTO quantity = new PaginationDTO(pubs, ps.getMaxResultProfile());
    	return Response.ok().entity(quantity).build();
    }
    
    @GET
    @Path("/getMyFavoritesPublicationsCount")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getMyFavoritesPublicationsCount (@Context HttpServletRequest request) {
    	int pubs = fps.getCountUserFavourites(tas.getUserIdAuthentication(request));
    	PaginationDTO quantity = new PaginationDTO(pubs, ps.getMaxResultProfile());
    	return Response.ok().entity(quantity).build();
    }
    
    @POST
    @Path("/favouritePublication")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response favouritePublication (@Context HttpServletRequest request, final IDResponseDTO iDResponseDTO) {
    	FavPublication favPublication = fps.addFavourite(tas.getUserIdAuthentication(request), iDResponseDTO.getId());
    	if(favPublication == null)
    		return rs.okRequest();
    	else
    		return rs.createRequest();
    }
    
    @POST
    @Path("/unfavouritePublication")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response unfavouritePublication (@Context HttpServletRequest request, final IDResponseDTO iDResponseDTO) {
    	fps.removeFavourite(tas.getUserIdAuthentication(request), iDResponseDTO.getId());
    	return Response.ok().build();
    }
    
    @GET
    @Path("/retrievePersonalInformation")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response retrievePersonalInformation (@Context HttpServletRequest request) {
    	User user = us.findById(tas.getUserIdAuthentication(request));
    	UserDTO profileInformationDto = new UserDTO(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhoneNumber(), user.getPassword());
    	return Response.ok().entity(profileInformationDto).build();
    }
    
    @POST
    @Path("/updateInformation")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response updateInformation (@Context HttpServletRequest request, final UserDTO userDTO) {
    	Long id = tas.getUserIdAuthentication(request);
    	us.editData(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getPhoneNumber(),
    			us.findById(id).getEmail());
    	tas.refreshToken(request, userDTO.getEmail());
    	return Response.ok().build();
    }

}
