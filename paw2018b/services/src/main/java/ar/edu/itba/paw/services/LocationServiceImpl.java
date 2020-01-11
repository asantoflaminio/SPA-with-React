package ar.edu.itba.paw.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.LocationDao;
import ar.edu.itba.paw.interfaces.LocationService;
import ar.edu.itba.paw.models.City;
import ar.edu.itba.paw.models.Neighborhood;
import ar.edu.itba.paw.models.Province;
import ar.edu.itba.paw.models.dto.CityDTO;
import ar.edu.itba.paw.models.dto.NeighborhoodDTO;
import ar.edu.itba.paw.models.dto.ProvinceDTO;

@Service
public class LocationServiceImpl implements LocationService{
	
	@Autowired
	private LocationDao locationDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	@Override
	public Province createProvince(String province) {
		LOGGER.debug("Creating province with name {}", province);
		return locationDao.createProvince(province);
	}

	@Override
	public City createCity(String city, long provinceid) {
		LOGGER.debug("Creating city with name {}", city);
		return locationDao.createCity(city,provinceid);
	}

	@Override
	public Neighborhood createNeighborhood(String neighborhood, long cityid) {
		LOGGER.debug("Creating neighborhood with name {}", neighborhood);
		return locationDao.createNeighborhood(neighborhood,cityid);
	}

	@Override
	public List<ProvinceDTO> getProvinces() {
		List<ProvinceDTO> provinces = new ArrayList<ProvinceDTO>();
		for(Province province: locationDao.getProvinces()) {
			provinces.add(new ProvinceDTO(province.getProvince(),province.getProvinceid()));
		}
		return provinces;
	}

	@Override
	public List<CityDTO> getCities(long provinceID) {
		List<CityDTO> cities = new ArrayList<CityDTO>();
		for(City city: locationDao.getCities(provinceID)) {
			cities.add(new CityDTO(city.getCity(),city.getCityid()));
		}
		return cities;
	}
	
	@Override
	public List<NeighborhoodDTO> getNeighborhoods(long cityID) {
		List<NeighborhoodDTO> neighborhoods = new ArrayList<NeighborhoodDTO>();
		for(Neighborhood neighborhood: locationDao.getNeighborhoods(cityID)) {
			neighborhoods.add(new NeighborhoodDTO(neighborhood.getNeighborhood(),neighborhood.getNeighborhoodid()));
		}
		return neighborhoods;
	}

	@Override
	public Province findByProvinceName(String province) {
		return locationDao.findByProvinceName(province);
	}

	@Override
	public City findByCityName(long provinceid, String city) {
		return locationDao.findByCityName(provinceid, city);
	}

	@Override
	public Neighborhood findByNeighborhoodName(long cityid, String neighborhood) {
		return locationDao.findByNeighborhoodName(cityid, neighborhood);
	}

}
