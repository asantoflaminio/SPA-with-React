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
    
    @GET
    @Path("/getProvinces")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getProvinces () {
    	ProvincesDTO provinces = new ProvincesDTO(ls.getProvinces());
    	return Response.ok().entity(provinces).build();
    }
    
    @GET
    @Path("/getCities")
    @Produces(value = { MediaType.APPLICATION_JSON, })
    public Response getCities () {
    	CitiesDTO cities = new CitiesDTO(ls.getCities());
    	return Response.ok().entity(cities).build();
    }

}
