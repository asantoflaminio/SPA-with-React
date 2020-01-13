package ar.edu.itba.paw.webapp.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.dto.CityDTO;
import ar.edu.itba.paw.models.dto.UserDTO;
import ar.edu.itba.paw.services.LocationServiceImpl;
import ar.edu.itba.paw.services.RequestServiceImpl;
import ar.edu.itba.paw.services.UserServiceImpl;
import ar.edu.itba.paw.services.ValidateServiceImpl;
import ar.edu.itba.paw.models.dto.NeighborhoodDTO;
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
    @Path("/provinces")
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
    @Path("/cities")
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
    @Path("/neighborhoods")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createNeighborhood (final NeighborhoodDTO neighborhoodDTO) {
		if(! vs.validateLocationAdmin(neighborhoodDTO.getNeighborhood(), "Neighborhood"))
			return rs.badRequest();
    	if(ls.findByNeighborhoodName(neighborhoodDTO.getProvinceID() ,neighborhoodDTO.getCityID(),neighborhoodDTO.getNeighborhood()) != null)
    		return rs.conflictRequest();
    	
    	ls.createNeighborhood(neighborhoodDTO.getNeighborhood(),neighborhoodDTO.getCityID());
        return rs.createRequest();
    }
    
    @GET
    @Path("/provinces")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getProvinces () {
    	List<ProvinceDTO> provinces = ls.getProvinces();
    	return rs.okRequest(provinces);
    }
    
    
    @GET
    @Path("/provinces/{provinceID}/cities")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getCities (@PathParam("provinceID") long provinceID) {
    	if(!vs.validateLocation(Long.toString(provinceID), Constants.Location.PROVINCE.toString()))
    		return rs.badRequest();
    	
    	List<CityDTO> cities = ls.getCities(provinceID);
    	if(cities.size() == 0)
    		return rs.notFound();
    	
    	return rs.okRequest(cities);
    }
    
    @GET
    @Path("provinces/{provinceID}/cities/{cityID}/neighborhoods")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getNeighborhoods (@PathParam("provinceID") long provinceID, @PathParam("cityID") long cityID) {
    	if(!vs.validateLocation(Long.toString(provinceID), Constants.Location.PROVINCE.toString()) ||
    		!vs.validateLocation(Long.toString(cityID), Constants.Location.CITY.toString()))
    		return rs.badRequest();
    	
    	List<NeighborhoodDTO> neighborhoods = ls.getNeighborhoods(provinceID, cityID);
    	
    	if(neighborhoods.size() == 0)
    		return rs.notFound();
    	
    	return rs.okRequest(neighborhoods);
    }
    
    @GET
    @Path("/users")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getUsers (@Context HttpServletResponse response, @NotNull @QueryParam("page") int page, @NotNull @QueryParam("limit") int limit) {
    	if(!vs.validatePagination(page,limit))
    		return rs.badRequest();
    	List<UserDTO> users = us.findAllUsers(page,limit);
    	response.setHeader(Constants.COUNT_HEADER, Integer.toString(us.getAllUsersCount()));
    	return rs.okRequest(users);
    }
    
    //Esta funcion revisalar porque es mas probable que sea /users/{id} y q la api vea q hacer
    @PUT
    @Path("/lockUser")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response lockUser (UserDTO userDTO) {
    	us.lockUnlockUser(userDTO.isLocked(), userDTO.getId());
    	return rs.okRequest();
    }
    

}
