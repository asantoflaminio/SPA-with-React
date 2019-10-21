package ar.edu.itba.paw.webapp.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.interfaces.LocationService;
import ar.edu.itba.paw.models.dto.CitiesDTO;
import ar.edu.itba.paw.models.dto.CityDTO;
import ar.edu.itba.paw.models.dto.NeighborhoodDTO;
import ar.edu.itba.paw.models.dto.NeighborhoodsDTO;
import ar.edu.itba.paw.models.dto.ProvinceDTO;
import ar.edu.itba.paw.models.dto.ProvincesDTO;

@Path("admin")
@Component
public class AdminController {
	
	@Autowired
	private LocationService ls;
	
    @POST
    @Path("/province")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createProvince (final ProvinceDTO provinceDTO) {
    	ls.createProvince(provinceDTO.getProvince());
        return Response.ok().build();
    }
    
    @POST
    @Path("/city")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createCity (final CityDTO cityDTO) {
    	ls.createCity(cityDTO.getCity(),cityDTO.getProvinceID());
        return Response.ok().build();
    }
    
    @POST
    @Path("/neighborhood")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    public Response createNeighborhood (final NeighborhoodDTO neighborhoodDTO) {
    	ls.createNeighborhood(neighborhoodDTO.getNeighborhood(),neighborhoodDTO.getCityID());
        return Response.ok().build();
    }
    
    @GET
    @Path("/getProvinces")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getProvinces () {
    	ProvincesDTO provinces = new ProvincesDTO(ls.getProvinces());
    	return Response.ok().entity(provinces).build();
    }
    
    @POST
    @Path("/getCities")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getCities (ProvinceDTO province) {
    	CitiesDTO cities = new CitiesDTO(ls.getCities(province.getProvinceID()));
    	return Response.ok().entity(cities).build();
    }
    
    @POST
    @Path("/getNeighborhoods")
    @Consumes(value = { MediaType.APPLICATION_JSON, })
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getNeighborhoods (CityDTO city) {
    	NeighborhoodsDTO neighborhoods = new NeighborhoodsDTO(ls.getNeighborhoods(city.getCityID()));
    	return Response.ok().entity(neighborhoods).build();
    }
    

}
