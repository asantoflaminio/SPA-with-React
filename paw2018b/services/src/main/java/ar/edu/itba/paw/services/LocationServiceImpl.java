package ar.edu.itba.paw.services;

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

@Service
public class LocationServiceImpl implements LocationService{
	
	@Autowired
	private LocationDao locationDao;
	
	@Autowired
	private ValidateServiceImpl vs;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	@Override
	public Province createProvince(String province) {
		if(! vs.validateLocationAdmin(province, "Province"))
			return null;
		
		LOGGER.debug("Creating province with name {}", province);
		return locationDao.createProvince(province);
	}

	@Override
	public City createCity(String city, long provinceid) {
		if(! vs.validateLocationAdmin(city, "City"))
			return null;
		LOGGER.debug("Creating city with name {}", city);
		return locationDao.createCity(city,provinceid);
	}

	@Override
	public Neighborhood createNeighborhood(String neighborhood, long cityid) {
		if(! vs.validateLocationAdmin(neighborhood, "Neighborhood"))
			return null;
		LOGGER.debug("Creating neighborhood with name {}", neighborhood);
		return locationDao.createNeighborhood(neighborhood,cityid);
	}

	@Override
	public List<Province> getProvinces() {
		return locationDao.getProvinces();
	}

	@Override
	public List<City> getCities() {
		return locationDao.getCities();
	}
	
	@Override
	public List<Neighborhood> getNeighborhoods() {
		return locationDao.getNeighborhoods();
	}

}
