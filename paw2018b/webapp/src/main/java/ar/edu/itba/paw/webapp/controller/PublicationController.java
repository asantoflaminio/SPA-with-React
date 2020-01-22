package ar.edu.itba.paw.webapp.controller;


import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.Filter;
import ar.edu.itba.paw.models.UploadFile;
import ar.edu.itba.paw.models.dto.FiltersDTO;
import ar.edu.itba.paw.models.dto.PublicationDTO;
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
	private FavPublicationsServiceImpl fps;
	
	@Autowired
	private TokenAuthenticationService tas;
	
	@Autowired
	private ValidateServiceImpl vs;
	
	@Autowired
	private RequestServiceImpl rs;
	
    @GET
    @Path("/publications")
    @Produces(value = { PublicationDTO.MediaType })
    public Response getPublications (@Context HttpServletRequest request, @Context HttpServletResponse response, 
    									@DefaultValue("0") @QueryParam("page") Integer page, @DefaultValue("8") @QueryParam("limit") Integer limit,
    									@QueryParam("operation") String operation, @QueryParam("propertyType") String propertyType, @QueryParam("address") String address,
    									@QueryParam("minPrice") Integer minPrice, @QueryParam("maxPrice") Integer maxPrice, @QueryParam("minFloorSize") Integer minFloorSize,
    									@QueryParam("maxFloorSize") Integer maxFloorSize, @QueryParam("bedrooms") Integer bedrooms, @QueryParam("bathrooms") Integer bathrooms,
    									@QueryParam("parking") Integer parking, @DefaultValue("false") @QueryParam("locked") Boolean locked, 
    									@DefaultValue("No order") @QueryParam("order") String order) {
    	if(!vs.validatePagination(page,limit))
    		return rs.badRequest();
    	List<Filter> filters = ps.generateFilters(operation, propertyType, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking, locked);
    	List<PublicationDTO> publications = ps.getPublications(address,filters,page,limit,order);
    	response.setHeader(Constants.COUNT_HEADER, Integer.toString(ps.getCountPublications(address,filters)));
    	final Long userid = tas.getUserIdAuthentication(request);
    	if(userid != null)
    		publications = fps.checkFavourites(publications, userid);
    	return rs.ok(publications);
    }
    
    @GET
    @Path("/publications/filters")
    @Produces(value = { FiltersDTO.MediaType })
    public Response getFilters (@QueryParam("operation") String operation, @QueryParam("propertyType") String propertyType, @QueryParam("address") String address,
								@QueryParam("minPrice") Integer minPrice, @QueryParam("maxPrice") Integer maxPrice, @QueryParam("minFloorSize") Integer minFloorSize,
								@QueryParam("maxFloorSize") Integer maxFloorSize, @QueryParam("bedrooms") Integer bedrooms, @QueryParam("bathrooms") Integer bathrooms,
								@QueryParam("parking") Integer parking, @DefaultValue("false") @QueryParam("locked") Boolean locked) {
    	FiltersDTO filtersDTO = new FiltersDTO();
    	List<Filter> filters = ps.generateFilters(operation, propertyType, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking, locked);
    	
    	
    	filtersDTO.setLocations(ps.getLocationFilter(filters, address));
    	filtersDTO.setBedrooms(ps.getSimpleFilter(filters, address, Constants.DataBaseFilterName.BEDROOMS.getDataBaseFilterName()));
    	filtersDTO.setBathrooms(ps.getSimpleFilter(filters, address, Constants.DataBaseFilterName.BATHROOMS.getDataBaseFilterName()));
    	filtersDTO.setParking(ps.getSimpleFilter(filters, address, Constants.DataBaseFilterName.PARKING.getDataBaseFilterName()));
    	
    	return rs.ok(filtersDTO);
    }
    
    @GET
    @Path("/publications/{publicationid}")
    @Produces(value = { PublicationDTO.MediaType })
    public Response getPublicationById (@Context HttpServletRequest request, @PathParam("publicationid") long publicationid) {
    	if(! vs.validateID(publicationid))
    		rs.badRequest();
    	
    	PublicationDTO publicationDTO = ps.findById(publicationid);
    	if(publicationDTO == null)
    		return rs.notFound();
    	final Long userid = tas.getUserIdAuthentication(request);
    	if(userid != null)
    		publicationDTO = fps.checkFavourite(publicationDTO, userid);
    	return rs.ok(publicationDTO);
    }
    
    @GET
    @Path("/publications/{publicationid}/images")
    @Produces(value = { MediaType.APPLICATION_OCTET_STREAM })
    public Response getImg (@PathParam("publicationid") long publicationid, @DefaultValue("0") @QueryParam("index") Integer index) {
    	if(! vs.validateID(publicationid) || ! vs.validateIndex(index))
    		rs.badRequest();
    	UploadFile uploadFile = is.findByIndexAndId(publicationid,index);
    	if(uploadFile == null)
    		return rs.notFound();
    	byte[] data = uploadFile.getData();
    	byte[] dataBase64 = Base64.getEncoder().encode(data);
        return rs.ok(dataBase64);
    }
    
    @POST
    @Path("/publications/{publicationid}/images")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadImageFile(@PathParam("publicationid") long publicationid,
			@FormDataParam("files") List<FormDataBodyPart> bodyParts,
			@FormDataParam("files") FormDataContentDisposition fileDispositions) throws IOException {
    	if(!vs.validateID(publicationid))
    		return rs.badRequest();
    	if(bodyParts != null && bodyParts.size() > 0)
    		is.create(bodyParts, publicationid);
        return rs.create();
    }
    
    
    @DELETE
    @Path("/publications/{publicationID}")
    public Response deletePublication(@PathParam("publicationID") long publicationID){
    	if(! vs.validateID(publicationID))
    		return rs.badRequest();
    	if(! ps.deletePublication(publicationID))
    		return rs.notFound();
    	
    	return rs.noContent();
    }
    
    //SOLO DEVELOP, ESTA FUNCION SE DEBE BORRAR EN PRODUCCION!!!!!!!
    @POST
    @Path("/publications/random")
    @Produces(value = { PublicationDTO.MediaType })
    public Response createRandom() {
    	Random random = new Random();
    	PublicationDTO publicationDTO = new PublicationDTO();
    	publicationDTO.setTitle("adwada");
    	publicationDTO.setProvinceid("14");
    	publicationDTO.setCityid("22");
    	publicationDTO.setNeighborhoodid("13");
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
    	ps.create(publicationDTO.getTitle(), publicationDTO.getAddress(), publicationDTO.getNeighborhoodid(), 
    			publicationDTO.getCityid(), publicationDTO.getProvinceid(), publicationDTO.getOperation(), 
    			publicationDTO.getPrice(), publicationDTO.getDescription(), publicationDTO.getPropertyType(), 
    			publicationDTO.getBedrooms(), publicationDTO.getBathrooms(), publicationDTO.getDimention(), 
    			publicationDTO.getParking(),
    			publicationDTO.getCoveredFloorSize(), publicationDTO.getBalconies(),
    			publicationDTO.getAmenities(), publicationDTO.getStorage(), publicationDTO.getExpenses(), 62);
    	return rs.ok(publicationDTO);
    }
}
