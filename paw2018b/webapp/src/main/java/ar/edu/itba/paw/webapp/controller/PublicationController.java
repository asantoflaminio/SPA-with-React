package ar.edu.itba.paw.webapp.controller;


import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.interfaces.PublicationService;
import ar.edu.itba.paw.models.UploadFile;
import ar.edu.itba.paw.models.dto.BooleanResponseDTO;
import ar.edu.itba.paw.models.dto.FiltersDTO;
import ar.edu.itba.paw.models.dto.IDResponseDTO;
import ar.edu.itba.paw.models.dto.ImageDTO;
import ar.edu.itba.paw.models.dto.PageDTO;
import ar.edu.itba.paw.models.dto.PaginationDTO;
import ar.edu.itba.paw.models.dto.PublicationDTO;
import ar.edu.itba.paw.models.dto.PublicationsDTO;
import ar.edu.itba.paw.models.dto.QueryDTO;
import ar.edu.itba.paw.services.FavPublicationsServiceImpl;
import ar.edu.itba.paw.services.ImageServiceImpl;
import ar.edu.itba.paw.webapp.auth.TokenAuthenticationService;


@Path("publications")
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
	
    @POST
    @Path("/getAllPublications")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getAllPublications (final PageDTO pageDTO) {
    	PublicationsDTO publications = new PublicationsDTO(ps.findAllPublications(pageDTO.getPage()));
    	return Response.ok().entity(publications).build();
    }
    
    @GET
    @Path("/getAllPublicationsCount")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getAllPublicationsCount () {
    	PaginationDTO quantity = new PaginationDTO(ps.getCountAllPublications(), ps.getMaxResultList());
    	return Response.ok().entity(quantity).build();
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
    @Path("/isFavourite")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response isFavourite(@Context HttpServletRequest request, final IDResponseDTO iDResponseDTO)
    {
    	return Response.ok().entity(new BooleanResponseDTO(fs.isFavourite(tas.getUserIdAuthentication(request), iDResponseDTO.getId()))).build();
    }
}
