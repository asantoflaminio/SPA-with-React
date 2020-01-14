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

import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.dto.CityDTO;
import ar.edu.itba.paw.models.dto.NeighborhoodDTO;
import ar.edu.itba.paw.models.dto.ProvinceDTO;
import ar.edu.itba.paw.services.LocationServiceImpl;
import ar.edu.itba.paw.services.RequestServiceImpl;
import ar.edu.itba.paw.services.ValidateServiceImpl;

@Path("locations-management")
@Component
public class LocationController {
	
	@Autowired
	private LocationServiceImpl ls;
	
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
    @Path("/provinces/{provinceid}/cities")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getCities (@PathParam("provinceid") long provinceid) {
    	if(!vs.validateLocation(Long.toString(provinceid), Constants.Location.PROVINCE.toString()))
    		return rs.badRequest();
    	
    	List<CityDTO> cities = ls.getCities(provinceid);
    	return rs.okRequest(cities);
    }
    
    @GET
    @Path("provinces/{provinceid}/cities/{cityid}/neighborhoods")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getNeighborhoods (@PathParam("provinceid") long provinceid, @PathParam("cityid") long cityid) {
    	if(!vs.validateLocation(Long.toString(provinceid), Constants.Location.PROVINCE.toString()) ||
    		!vs.validateLocation(Long.toString(cityid), Constants.Location.CITY.toString()))
    		return rs.badRequest();
    	List<NeighborhoodDTO> neighborhoods = ls.getNeighborhoods(provinceid, cityid);
    	
    	return rs.okRequest(neighborhoods);
    }

}
