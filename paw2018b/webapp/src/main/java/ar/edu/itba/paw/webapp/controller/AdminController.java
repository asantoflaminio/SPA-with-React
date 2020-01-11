package ar.edu.itba.paw.webapp.controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.models.dto.CityDTO;
import ar.edu.itba.paw.models.dto.UserDTO;
import ar.edu.itba.paw.services.LocationServiceImpl;
import ar.edu.itba.paw.services.RequestServiceImpl;
import ar.edu.itba.paw.services.UserServiceImpl;
import ar.edu.itba.paw.services.ValidateServiceImpl;
import ar.edu.itba.paw.models.dto.NeighborhoodDTO;
import ar.edu.itba.paw.models.dto.PageDTO;
import ar.edu.itba.paw.models.dto.PaginationDTO;
import ar.edu.itba.paw.models.dto.ProvinceDTO;

@Path("admin")
@Component
public class AdminController {
	
	@Autowired
	private LocationServiceImpl ls;
	
	@Autowired
	private UserServiceImpl us;
	
	@Autowired
	private ValidateServiceImpl vs;
	
	@Autowired
	private RequestServiceImpl rs;
	
    @POST
    @Path("/province")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createProvince (final ProvinceDTO provinceDTO) {
    	if(! vs.validateLocationAdmin(provinceDTO.getProvince(), "Province"))
    		return rs.badRequest();
    	if(ls.findByProvinceName(provinceDTO.getProvince()) != null)
    		return rs.conflictRequest();
    	
    	ls.createProvince(provinceDTO.getProvince());
        return rs.createRequest();
    }
    
    @POST
    @Path("/city")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createCity (final CityDTO cityDTO) {
		if(! vs.validateLocationAdmin(cityDTO.getCity(), "City"))
			return rs.badRequest();
    	if(ls.findByCityName(cityDTO.getProvinceID(),cityDTO.getCity()) != null)
    		return rs.conflictRequest();
    	
    	ls.createCity(cityDTO.getCity(),cityDTO.getProvinceID());
        return rs.createRequest();
    }
    
    @POST
    @Path("/neighborhood")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createNeighborhood (final NeighborhoodDTO neighborhoodDTO) {
		if(! vs.validateLocationAdmin(neighborhoodDTO.getNeighborhood(), "Neighborhood"))
			return rs.badRequest();
    	if(ls.findByNeighborhoodName(neighborhoodDTO.getCityID(),neighborhoodDTO.getNeighborhood()) != null)
    		return rs.conflictRequest();
    	
    	ls.createNeighborhood(neighborhoodDTO.getNeighborhood(),neighborhoodDTO.getCityID());
        return Response.ok().build();
    }
    
    @GET
    @Path("/allProvinces")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getProvinces () {
    	List<ProvinceDTO> provinces = ls.getProvinces();
    	return Response.ok().entity(provinces).build();
    }
    
    @GET
    @Path("/allCities/{provinceID}")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getCities (@PathParam("provinceID") long provinceID) {
    	List<CityDTO> cities = ls.getCities(provinceID);
    	return Response.ok().entity(cities).build();
    }
    
    @GET
    @Path("/allNeighborhoods/{cityID}")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getNeighborhoods (@PathParam("cityID") long cityID) {
    	List<NeighborhoodDTO> neighborhoods = ls.getNeighborhoods(cityID);
    	return Response.ok().entity(neighborhoods).build();
    }
    
    @POST
    @Path("/getUsers")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getUsers (PageDTO page) {
    	List<UserDTO> users = us.findAllUsers(page.getPage().toString());
    	return Response.ok().entity(users).build();
    }
    
    @GET
    @Path("/getUsersQuantity")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getUsersQuantity () {
    	PaginationDTO quantity = new PaginationDTO(us.getCountAllUsers(), 2); //cambiar x la constante que dice en persistance
    	return Response.ok().entity(quantity).build();
    }
    
    @POST
    @Path("/lockUser")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response lockUser (UserDTO userDTO) {
    	us.lockUnlockUser(userDTO.isLocked(), userDTO.getId());
    	return Response.ok().build();
    }
    

}
