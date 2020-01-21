package ar.edu.itba.paw.webapp.controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
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
    @Consumes(value = { ProvinceDTO.MediaType })
    public Response createProvince (final ProvinceDTO provinceDTO) {
    	if(! vs.validateLocationAdmin(provinceDTO.getProvince(), Constants.Location.PROVINCE.getLocation()))
    		return rs.badRequest();
    	if(ls.findByProvinceName(provinceDTO.getProvince()) != null)
    		return rs.conflict();
    	
    	ls.createProvince(provinceDTO.getProvince());
        return rs.create();
    }
    
    @POST
    @Path("/provinces/{provinceid}/cities")
    @Consumes(value = { CityDTO.MediaType })
    public Response createCity (@PathParam("provinceid") long provinceid, final CityDTO cityDTO) {
		if(! vs.validateLocationAdmin(cityDTO.getCity(), Constants.Location.CITY.getLocation()) ||
			! vs.validateID(provinceid))
			return rs.badRequest();
    	if(ls.findByCityName(provinceid,cityDTO.getCity()) != null)
    		return rs.conflict();
    	
    	ls.createCity(cityDTO.getCity(),provinceid);
        return rs.create();
    }
    
    @POST
    @Path("/cities/{cityid}/neighborhoods")
    @Consumes(value = { NeighborhoodDTO.MediaType })
    public Response createNeighborhood (@PathParam("cityid") long cityid,final NeighborhoodDTO neighborhoodDTO) {
		if(! vs.validateLocationAdmin(neighborhoodDTO.getNeighborhood(), "Neighborhood") || 
			! vs.validateID(cityid))
			return rs.badRequest();
    	if(ls.findByNeighborhoodName(cityid,neighborhoodDTO.getNeighborhood()) != null)
    		return rs.conflict();
    	
    	ls.createNeighborhood(neighborhoodDTO.getNeighborhood(),cityid);
        return rs.create();
    }
    
    @GET
    @Path("/provinces")
    @Produces(value = { ProvinceDTO.MediaType })
    public Response getProvinces () {
    	List<ProvinceDTO> provinces = ls.getProvinces();
    	return rs.ok(provinces);
    }
    
    
    @GET
    @Path("/provinces/{provinceid}/cities")
    @Produces(value = { CityDTO.MediaType })
    public Response getCities (@PathParam("provinceid") long provinceid) {
    	if(!vs.validateLocation(Long.toString(provinceid), Constants.Location.PROVINCE.toString()) || 
    		! vs.validateID(provinceid))
    		return rs.badRequest();
    	
    	List<CityDTO> cities = ls.getCities(provinceid);
    	return rs.ok(cities);
    }
    
    @GET
    @Path("/cities/{cityid}/neighborhoods")
    @Produces(value = { NeighborhoodDTO.MediaType })
    public Response getNeighborhoods (@PathParam("cityid") long cityid) {
    	if(!vs.validateLocation(Long.toString(cityid), Constants.Location.CITY.toString()) ||
    		! vs.validateID(cityid))
    		return rs.badRequest();
    	List<NeighborhoodDTO> neighborhoods = ls.getNeighborhoods(cityid);
    	
    	return rs.ok(neighborhoods);
    }

}
