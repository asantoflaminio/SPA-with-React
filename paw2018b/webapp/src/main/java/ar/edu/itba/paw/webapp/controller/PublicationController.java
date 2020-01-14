package ar.edu.itba.paw.webapp.controller;


import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.UploadFile;
import ar.edu.itba.paw.models.dto.BooleanResponseDTO;
import ar.edu.itba.paw.models.dto.FiltersDTO;
import ar.edu.itba.paw.models.dto.IDResponseDTO;
import ar.edu.itba.paw.models.dto.ImageDTO;
import ar.edu.itba.paw.models.dto.PaginationDTO;
import ar.edu.itba.paw.models.dto.PublicationDTO;
import ar.edu.itba.paw.models.dto.QueryDTO;
import ar.edu.itba.paw.services.FavPublicationsServiceImpl;
import ar.edu.itba.paw.services.ImageServiceImpl;
import ar.edu.itba.paw.services.RequestServiceImpl;
import ar.edu.itba.paw.services.ValidateServiceImpl;
import ar.edu.itba.paw.webapp.auth.TokenAuthenticationService;


@Path("publications-managment")
@Component
public class PublicationController {
	
	@Autowired
	private PublicationService ps;
	
	@Autowired
	private ImageServiceImpl is;
	
	@Autowired
	private FavPublicationsServiceImpl fs;
	
	@Autowired
	private TokenAuthenticationService tas;
	
	@Autowired
	private ValidateServiceImpl vs;
	
	@Autowired
	private RequestServiceImpl rs;
	
    @GET
    @Path("/publications")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getAllPublications (@Context HttpServletResponse response, @NotNull @QueryParam("page") int page, @NotNull @QueryParam("limit") int limit) {
    	if(!vs.validatePagination(page,limit))
    		return rs.badRequest();
    	List<PublicationDTO> publications = ps.findAllPublications(page,limit);
    	response.setHeader(Constants.COUNT_HEADER, Integer.toString(ps.getCountAllPublications()));
    	for(PublicationDTO pub: publications) {
    		System.out.println("Showing: " + pub.getPublicationID());
    	}
    	return Response.ok().entity(publications).build();
    }
    
    @GET
    @Path("/getRentPublications")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getRentPublications () {
    	List<PublicationDTO> publications = ps.findByOperation("FRent");
    	return Response.ok().entity(publications).build();
    }
    
    @POST
    @Path("/getPublicationsQuantity")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response getPublicationsQuantity (QueryDTO queryDTO) {
    	int pubs = ps.getSearchFilteringCount(queryDTO.getOperation(), queryDTO.getPropertyType(), queryDTO.getSearch(), queryDTO.getMinPrice(),
    											queryDTO.getMaxPrice(), queryDTO.getMinFloorSize(), queryDTO.getMaxFloorSize(), queryDTO.getBedrooms(),
    											queryDTO.getBathrooms(), queryDTO.getParking());
    	PaginationDTO quantity = new PaginationDTO(pubs, ps.getMaxResultList()); 
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
    public Response getPublicationById (IDResponseDTO id) {
    	PublicationDTO publicationDTO = ps.findById(id.getId());
    	return Response.ok().entity(publicationDTO).build();
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
    @Path("/isFavourite")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response isFavourite(@Context HttpServletRequest request, final IDResponseDTO iDResponseDTO){
    	return Response.ok().entity(new BooleanResponseDTO(fs.isFavourite(tas.getUserIdAuthentication(request), iDResponseDTO.getId()))).build();
    }
    
    @DELETE
    @Path("/{publicationID}")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response deletePublication(@PathParam("publicationID") long publicationID){
    	System.out.println("Delenting: " + publicationID);
    	if(! vs.validateID(publicationID))
    		return rs.badRequest();
    	if(! ps.deletePublication(publicationID))
    		return rs.notFound();
    	
    	return rs.noContent();
    }
    
    //SOLO DEVELOP, ESTA FUNCION SE DEBE BORRAR EN PRODUCCION!!!!!!!
    @POST
    @Path("/publications/random")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response createRandom() {
    	Random random = new Random();
    	PublicationDTO publicationDTO = new PublicationDTO();
    	publicationDTO.setTitle("adwada");
    	publicationDTO.setProvinceID("14");
    	publicationDTO.setCityID("22");
    	publicationDTO.setNeighborhoodID("13");
    	publicationDTO.setAddress("asdasd");
    	publicationDTO.setDescription("asdasd");
    	publicationDTO.setAmenities("SADASDA");
    	publicationDTO.setDimention(Integer.toString(random.nextInt(100 + 1 - 0) + 0));
    	publicationDTO.setOperation(Constants.Operation.FSALE.getOperation());
    	publicationDTO.setPropertyType(Constants.PropertyType.HOUSE.getPropertyType());
    	publicationDTO.setCoveredFloorSize(Integer.toString(random.nextInt(100 + 1 - 0) + 0));
    	publicationDTO.setPrice(Integer.toString(random.nextInt(500000 + 1 - 0) + 0));
    	publicationDTO.setExpenses(Integer.toString(random.nextInt(5000 + 1 - 0) + 0));
    	publicationDTO.setBedrooms(Integer.toString(random.nextInt(5 + 1 - 0) + 0));
    	publicationDTO.setBathrooms(Integer.toString(random.nextInt(5 + 1 - 0) + 0));
    	publicationDTO.setParking(Integer.toString(random.nextInt(5 + 1 - 0) + 0));
    	publicationDTO.setCoveredFloorSize(Integer.toString(random.nextInt(5 + 1 - 0) + 0));
    	publicationDTO.setBalconies(Integer.toString(random.nextInt(5 + 1 - 0) + 0));
    	publicationDTO.setStorage("notCorresponding");
    	Publication pub = ps.create(publicationDTO.getTitle(), publicationDTO.getAddress(), publicationDTO.getNeighborhoodID(), 
    			publicationDTO.getCityID(), publicationDTO.getProvinceID(), publicationDTO.getOperation(), 
    			publicationDTO.getPrice(), publicationDTO.getDescription(), publicationDTO.getPropertyType(), 
    			publicationDTO.getBedrooms(), publicationDTO.getBathrooms(), publicationDTO.getDimention(), 
    			publicationDTO.getParking(),
    			publicationDTO.getCoveredFloorSize(), publicationDTO.getBalconies(),
    			publicationDTO.getAmenities(), publicationDTO.getStorage(), publicationDTO.getExpenses(), 62);
    	return rs.okRequest(publicationDTO);
    }
}
