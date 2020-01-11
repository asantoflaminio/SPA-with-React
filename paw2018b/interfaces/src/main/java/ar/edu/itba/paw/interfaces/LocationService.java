package ar.edu.itba.paw.interfaces;

import java.util.List;

import ar.edu.itba.paw.models.City;
import ar.edu.itba.paw.models.Neighborhood;
import ar.edu.itba.paw.models.Province;
import ar.edu.itba.paw.models.dto.CityDTO;
import ar.edu.itba.paw.models.dto.NeighborhoodDTO;
import ar.edu.itba.paw.models.dto.ProvinceDTO;

public interface LocationService {
	
	public Province createProvince(String province);
	
	public City createCity(String city, long provinceid);
	
	public Neighborhood createNeighborhood(String neighborhood, long cityid);
	
	public List<ProvinceDTO> getProvinces();
	
	public List<CityDTO> getCities(long provinceID);
	
	public List<NeighborhoodDTO> getNeighborhoods(long cityID);
	
	public Province findByProvinceName(String province);
	
	public City findByCityName(long provinceid, String city);
	
	public Neighborhood findByNeighborhoodName(long cityid, String neighborhood);

}
