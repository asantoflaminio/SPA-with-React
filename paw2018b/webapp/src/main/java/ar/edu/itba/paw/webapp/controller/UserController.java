package ar.edu.itba.paw.webapp.controller;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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
import ar.edu.itba.paw.models.UploadFile;
import ar.edu.itba.paw.models.dto.FiltersDTO;
import ar.edu.itba.paw.models.dto.IDResponseDTO;
import ar.edu.itba.paw.models.dto.ImageDTO;
import ar.edu.itba.paw.models.dto.MyPublicationsDTO;
import ar.edu.itba.paw.models.dto.PaginationDTO;
import ar.edu.itba.paw.models.dto.PublicationDTO;
import ar.edu.itba.paw.models.dto.QueryDTO;
import ar.edu.itba.paw.models.dto.UserDTO;
import ar.edu.itba.paw.services.ImageServiceImpl;
import ar.edu.itba.paw.services.MailServiceImpl;
import ar.edu.itba.paw.services.MessageDTO;

@Path("users")
@Component
public class UserController {
	
	@Autowired
	private UserService us;
	
	@Autowired
	private PublicationService ps;
	
	@Autowired
	private ImageServiceImpl is;
	
	@Autowired
	private MailServiceImpl ms;
	
	@Autowired
	private FavPublicationsService fps;
	

    @POST
    @Path("/signUp")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createUser (final UserDTO userDTO) {
    	us.create(userDTO.getFirstName(), userDTO.getLastName(), 
    			userDTO.getEmail(), userDTO.getPassword(), userDTO.getPhoneNumber(), "USER");
    	
        return Response.ok().build();
    }
    
    @POST
    @Path("/publish")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response createPublication (final PublicationDTO publicationDTO) {
    	Publication pub = ps.create(publicationDTO.getTitle(), publicationDTO.getAddress(), publicationDTO.getNeighborhoodID(), 
    			publicationDTO.getCityID(), publicationDTO.getProvinceID(), publicationDTO.getOperation(), 
    			publicationDTO.getPrice(), publicationDTO.getDescription(), publicationDTO.getPropertyType(), 
    			publicationDTO.getBedrooms(), publicationDTO.getBathrooms(), publicationDTO.getDimention(), 
    			publicationDTO.getParking(), 1);
    	
    	if(pub != null)
    		return Response.ok().entity(new IDResponseDTO(pub.getPublicationid())).build();
    	else
    		return Response.ok().entity(new IDResponseDTO(1)).build();
    }
    
    @POST
    @Path("/images")
    @Consumes(value = {MediaType.MULTIPART_FORM_DATA} )
    public Response uploadImages (@RequestParam CommonsMultipartFile[] filesUpload) {
    	//System.out.println(files.length);
        return Response.ok().build();
    }
    
    @POST
    @Path("/getPublicationsQuantity")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getPublicationsQuantity (QueryDTO queryDTO) {
    	int pubs = ps.getSearchFilteringCount(queryDTO.getOperation(), queryDTO.getPropertyType(), queryDTO.getSearch(), queryDTO.getMinPrice(),
    											queryDTO.getMaxPrice(), queryDTO.getMinFloorSize(), queryDTO.getMaxFloorSize(), queryDTO.getBedrooms(),
    											queryDTO.getBathrooms(), queryDTO.getParking());
    	PaginationDTO quantity = new PaginationDTO(pubs, 1); //cambiar x la constante que dice en persistance
    	return Response.ok().entity(quantity).build();
    }
    
    
    @POST
    @Path("/getPublications")
    @Produces(value = { MediaType.APPLICATION_JSON})
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getPublicationsFilter (QueryDTO queryDTO) {
    	List<PublicationDTO> publications = ps.findSearchFiltering(queryDTO.getOperation(), queryDTO.getPropertyType(), queryDTO.getSearch(), 
    														queryDTO.getMinPrice(), queryDTO.getMaxPrice(), queryDTO.getMinFloorSize(), queryDTO.getMaxFloorSize(), 
    														queryDTO.getBedrooms(), queryDTO.getBathrooms(), queryDTO.getParking(), queryDTO.getOrder(), queryDTO.getPage());
    	return Response.ok().entity(publications).build();
    }
    
    @POST
    @Path("/getPublicationByID")
    @Produces(value = { MediaType.APPLICATION_JSON})
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getPublicationsFilter (IDResponseDTO id) {
    	PublicationDTO publication = ps.findById(id.getId());
    	return Response.ok().entity(publication).build();
    }
    
    @POST
    @Path("/getFilters")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getFilters (QueryDTO queryDTO) {
    	FiltersDTO filtersDTO = new FiltersDTO();
    	HashMap<String,Long> locations = ps.getLocationFilter(queryDTO.getOperation(), queryDTO.getPropertyType(), queryDTO.getSearch(), 
    														queryDTO.getMinPrice(), queryDTO.getMaxPrice(), queryDTO.getMinFloorSize(), queryDTO.getMaxFloorSize(), 
    														queryDTO.getBedrooms(), queryDTO.getParking(), queryDTO.getBathrooms());
    	
    	HashMap<Integer, Long> bedrooms = ps.getBedroomsFilter(queryDTO.getOperation(), queryDTO.getPropertyType(), queryDTO.getSearch(), 
															queryDTO.getMinPrice(), queryDTO.getMaxPrice(), queryDTO.getMinFloorSize(), queryDTO.getMaxFloorSize(), 
															queryDTO.getBedrooms(), queryDTO.getParking(), queryDTO.getBathrooms());
    	
    	HashMap<Integer, Long> bathrooms = ps.getBathroomsFilter(queryDTO.getOperation(), queryDTO.getPropertyType(), queryDTO.getSearch(), 
															queryDTO.getMinPrice(), queryDTO.getMaxPrice(), queryDTO.getMinFloorSize(), queryDTO.getMaxFloorSize(), 
															queryDTO.getBedrooms(), queryDTO.getParking(), queryDTO.getBathrooms());
    	
    	HashMap<Integer, Long> parking = ps.getParkingFilter(queryDTO.getOperation(), queryDTO.getPropertyType(), queryDTO.getSearch(), 
															queryDTO.getMinPrice(), queryDTO.getMaxPrice(), queryDTO.getMinFloorSize(), queryDTO.getMaxFloorSize(), 
															queryDTO.getBedrooms(), queryDTO.getParking(), queryDTO.getBathrooms());
    	
    	filtersDTO.setLocations(locations);
    	filtersDTO.setBedrooms(bedrooms);
    	filtersDTO.setBathrooms(bathrooms);
    	filtersDTO.setParking(parking);
    	
    	return Response.ok().entity(filtersDTO).build();
    }
    
    @POST
    @Path("/getPublicationImage")
    @Produces(value = { MediaType.APPLICATION_OCTET_STREAM })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getImg (ImageDTO imageDTO) {
    	UploadFile uploadFile = is.findByIndexAndId(imageDTO.getPublicationID(),imageDTO.getIndex());
    	if(uploadFile == null)
    		return Response.ok(null).build();
    	byte[] data = uploadFile.getData();
    	byte[] dataBase64 = Base64.getEncoder().encode(data);
    	imageDTO.setData(dataBase64);
        return Response.ok(dataBase64).build();
    }
    
    @POST
    @Path("/sendMessage")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response sendMessage (MessageDTO messageDTO) {
    	ms.sendEmail(messageDTO.getOwnerEmail(), messageDTO.getEmail(), messageDTO.getMessage(), messageDTO.getTitle());
        return Response.ok().build();
    }
    
    @POST
    @Path("/getMyPublicationsQuantity")
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
    @Path("/getMyPublications")
    @Produces(value = { MediaType.APPLICATION_JSON})
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getMyPublications (MyPublicationsDTO myPublications) {
    	List<PublicationDTO> publications = ps.findByUserId(myPublications.getUserID(), myPublications.getPage().toString());
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
