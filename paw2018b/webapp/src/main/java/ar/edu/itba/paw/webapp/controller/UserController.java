package ar.edu.itba.paw.webapp.controller;

import java.util.List;
import java.util.Optional;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.HEAD;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.interfaces.FavPublicationsService;
import ar.edu.itba.paw.interfaces.PATCH;
import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.ResetPassword;
import ar.edu.itba.paw.models.User;
import ar.edu.itba.paw.models.dto.FavPublicationDTO;
import ar.edu.itba.paw.models.dto.MessageDTO;
import ar.edu.itba.paw.models.dto.PublicationDTO;
import ar.edu.itba.paw.models.dto.ResetPasswordDTO;
import ar.edu.itba.paw.models.dto.UserDTO;
import ar.edu.itba.paw.services.MailServiceImpl;
import ar.edu.itba.paw.services.RequestServiceImpl;
import ar.edu.itba.paw.services.ResetPasswordServiceImpl;
import ar.edu.itba.paw.services.ValidateServiceImpl;
import ar.edu.itba.paw.webapp.auth.TokenAuthenticationService;


@Path("users-management")
@Component
public class UserController {
	
	@Autowired
	private UserService us;
	
	@Autowired
	private ValidateServiceImpl vs;
	
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
	private ResetPasswordServiceImpl rps;
	
	
    @GET
    @Path("/users")
    @Produces(value = { UserDTO.MediaType })
    public Response getUsers (@Context HttpServletResponse response, @NotNull @QueryParam("page") int page, @NotNull @QueryParam("limit") int limit) {
    	if(!vs.validatePagination(page,limit))
    		return rs.badRequest();
    	List<UserDTO> users = us.findAllUsers(page,limit);
    	response.setHeader(Constants.COUNT_HEADER, Integer.toString(us.getAllUsersCount()));
    	return rs.ok(users);
    }
	
    @POST
    @Path("/users")
    @Consumes(value = { UserDTO.MediaType })
    public Response createUser (@Context HttpServletRequest request, final UserDTO userDTO) {
    	if(! vs.validateUser(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), 
    			userDTO.getPassword(), userDTO.getPhoneNumber()))
    		rs.badRequest();
    	if(us.findByUsername(userDTO.getEmail()) != null) 
    		return rs.conflict();
    	
    	us.create(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getPhoneNumber(),
    			request.getHeader("Accept-Language").substring(0, Constants.MAX_LANGUAJE), Constants.Role.USER.getRole());
        return rs.create();
    }
    
    @HEAD
    @Path("/users/admin")
    @Consumes(value = { UserDTO.MediaType })
    public Response checkAdmin (@Context HttpServletRequest request) {
    	return rs.ok();
    }
    
    @GET
    @Path("/users/{userid}")
    @Produces(value = { UserDTO.MediaType })
    public Response retrievePersonalInformation (@Context HttpServletRequest request, @PathParam("userid") long userid) {
    	if(! vs.validateID(userid))
    		return rs.badRequest();
    	if(tas.getUserIdAuthentication(request) != userid)
    		return rs.forbidden();
    	User user = us.findById(userid);
    	if(user == null)
    		return rs.notFound();
    	UserDTO userDTO = new UserDTO(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhoneNumber());
    	return Response.ok().entity(userDTO).build();
    }
    
    @PATCH
    @Path("/users/{userid}")
    @Consumes(value = { UserDTO.MediaType, })
    public Response updateInformation (@Context HttpServletRequest request, @PathParam("userid") long userid, final UserDTO userDTO) {
    	if(! vs.validateID(userid))
    		return rs.badRequest();
    	if(tas.getUserIdAuthentication(request) != userid)
    		return rs.forbidden();
    	User user = us.findById(userid);
    	if(user == null)
    		return rs.notFound();
    	
    	if(userDTO.getPassword() != null) {
    		if(! vs.validateUserPassword(userDTO.getPassword()))
    			return rs.badGateway();
    		us.editPassword(userDTO.getPassword(), userid);
    		return rs.ok();
    	}else {
    		if(! vs.validateUserData(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getPhoneNumber()))
    			return rs.badGateway();
        	us.editData(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getPhoneNumber(),
        			user.getEmail(),userid);
        	return tas.refreshToken(userDTO.getEmail());
    	}
    }
    
    @PATCH
    @Path("/users/{userid}/lock")
    public Response lockUser (@PathParam("userid") long userid, @NotNull @QueryParam("lock") boolean lock) {
    	if(!vs.validateID(userid))
    		return rs.badRequest();
    	if(us.findById(userid) == null)
    		return rs.notFound();
    	us.lock(lock, userid);
    	return rs.ok();
    }
    
    @HEAD
    @Path("/users/{email}")
    public Response checkEmail (@PathParam("email") String email) {
    	if(us.findByUsername(email) == null)
    		return rs.notFound();
    	else
    		return rs.ok();
    	
    }
    
    @POST
    @Path("/users/{email}/password-reset")
    public Response passwordReset(@PathParam("email") String email) {
    	User user = us.findByUsername(email);
    	if(user == null) 
    		return rs.notFound();
    	rps.deleteOldRequests(user);
    	rps.createRequest(user);
        return rs.create();
    }
    
    @PATCH
    @Path("/users/password-reset")
    @Consumes(value = { ResetPasswordDTO.MediaType })
    public Response changePassword (ResetPasswordDTO resetPasswordDTO) {
    	if(! vs.validateUserPassword(resetPasswordDTO.getNewPassword()))
    		return rs.badRequest();
    	
    	Integer token = resetPasswordDTO.getToken().hashCode();
    	Optional<ResetPassword> resetPassword =  rps.getRequest(token.toString());
    	
    	if(rps.isTokenExpired(token,resetPassword))
    		return rs.unauthorized();

            	
        User userRequesting = resetPassword.get().getUserRequesting();
        us.setPassword(resetPasswordDTO.getNewPassword(), userRequesting.getEmail());
        rps.deleteRequest(resetPassword.get().getRequestId());
                
        return rs.ok();  		

    }
    
    @POST
    @Path("/users/{userid}/publications")
    @Consumes(value = { PublicationDTO.MediaType })
    @Produces(value = { PublicationDTO.MediaType })
    public Response createPublication (@Context HttpServletRequest request, @PathParam("userid") long userid, final PublicationDTO publicationDTO) {
    	if(!vs.validateID(userid))
    		return rs.badRequest();
    	if(tas.getUserIdAuthentication(request) != userid)
    		return rs.forbidden();
    	
    	Publication pub = ps.create(publicationDTO.getTitle(), publicationDTO.getAddress(), publicationDTO.getNeighborhoodid(), 
    			publicationDTO.getCityid(), publicationDTO.getProvinceid(), publicationDTO.getOperation(), 
    			publicationDTO.getPrice(), publicationDTO.getDescription(), publicationDTO.getPropertyType(), 
    			publicationDTO.getBedrooms(), publicationDTO.getBathrooms(), publicationDTO.getDimention(), 
    			publicationDTO.getParking(),
    			publicationDTO.getCoveredFloorSize(), publicationDTO.getBalconies(),
    			publicationDTO.getAmenities(), publicationDTO.getStorage(), publicationDTO.getExpenses(), tas.getUserIdAuthentication(request));
    	
    	
    	if(pub != null) {
    		publicationDTO.setPublicationid(pub.getPublicationid());
    		return rs.create(publicationDTO);
    	}
    	else 
    		return rs.badRequest();

    	
    }
    
    @POST
    @Path("/messages")
    @Consumes(value = { MessageDTO.MediaType })
    public Response sendMessage (MessageDTO messageDTO) {
    	if(! vs.validateEmailMessage(messageDTO.getName(), messageDTO.getEmail(), 
    			messageDTO.getMessage(), messageDTO.getOwnerEmail(), messageDTO.getTitle()))
    		return rs.badRequest();
    	
    	MimeMessage email = ms.sendEmail(messageDTO.getName() ,messageDTO.getOwnerEmail(), messageDTO.getEmail(), messageDTO.getMessage(), messageDTO.getTitle());
    	if(email == null)
    		return rs.badGateway();
    	
        return rs.create();
    }
    
    @GET
    @Path("/users/{userid}/publications")
    @Produces(value = { PublicationDTO.MediaType })
    public Response getUserPublications (@Context HttpServletResponse response, @Context HttpServletRequest request, @PathParam("userid") long userid,
    									@DefaultValue("0") @QueryParam("page") Integer page, @DefaultValue("10") @QueryParam("limit") Integer limit) {
    	if(!vs.validatePagination(page,limit) || !vs.validateID(userid))
    		return rs.badRequest();
    	if(tas.getUserIdAuthentication(request) != userid)
    		return rs.forbidden();
    	
    	List<PublicationDTO> publications = ps.findByUserId(userid, page, limit);
    	response.setHeader(Constants.COUNT_HEADER, Integer.toString(ps.getCountPublicationsOfUser(userid)));
    	return Response.ok().entity(publications).build();
    }
    
    @GET
    @Path("/users/{userid}/favourite-publications")
    @Produces(value = { PublicationDTO.MediaType })
    public Response getUserFavoutirePublications (@Context HttpServletResponse response, @Context HttpServletRequest request, @PathParam("userid") long userid,
    									@DefaultValue("0") @QueryParam("page") Integer page, @DefaultValue("10") @QueryParam("limit") Integer limit) {
    	if(!vs.validatePagination(page,limit) || !vs.validateID(userid))
    		return rs.badRequest();
    	if(tas.getUserIdAuthentication(request) != userid)
    		return rs.forbidden();
    	
    	List<PublicationDTO> publications = fps.getUserFavourites(userid, page, limit);
    	response.setHeader(Constants.COUNT_HEADER, Integer.toString(fps.getCountUserFavourites(userid)));
    	return Response.ok().entity(publications).build();
    }
    
    @POST
    @Path("/users/{userid}/favourite-publications")
    @Consumes(value = { FavPublicationDTO.MediaType })
    public Response addFavouritePublication (@Context HttpServletRequest request, @PathParam("userid") long userid, final FavPublicationDTO favPublicationDTO) {
    	if(! vs.validateID(userid) || ! vs.validateID(favPublicationDTO.getPublicationid()))
    		return rs.badRequest();
    	if(tas.getUserIdAuthentication(request) != userid)
    		return rs.forbidden();
    	
    	fps.addFavourite(userid, favPublicationDTO.getPublicationid());
    	return rs.create();
    }
    
    @DELETE
    @Path("/users/{userid}/favourite-publications/{publicationid}")
    public Response removeFavouritePublication (@Context HttpServletRequest request, @PathParam("userid") long userid, @PathParam("publicationid") long publicationid) {
    	if(! vs.validateID(userid) || ! vs.validateID(publicationid))
    		return rs.badRequest();
    	if(tas.getUserIdAuthentication(request) != userid)
    		return rs.forbidden();
    	if(! fps.removeFavourite(userid, publicationid))
    		return rs.notFound();
    	return rs.noContent();
    }
    

    


}
