package ar.edu.itba.paw.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.interfaces.LocationDao;
import ar.edu.itba.paw.models.City;
import ar.edu.itba.paw.models.Neighborhood;
import ar.edu.itba.paw.models.Province;

@Repository
public class LocationHibernateDao implements LocationDao{
	
	@PersistenceContext
	private EntityManager em;

	@Override
	@Transactional
	public Province createProvince(String province) {
		final Province prov = new Province(province);
		em.persist(prov);
		return prov;
	}

	@Override
	@Transactional
	public City createCity(String city, long provinceid) {
		final City cityObject = new City(city);
		cityObject.setProvince(em.find(Province.class, provinceid));
		em.persist(cityObject);
		return cityObject;
	}

	@Override
	@Transactional
	public Neighborhood createNeighborhood(String neighborhood, long cityid) {
		final Neighborhood neighborhoodObject = new Neighborhood(neighborhood);
		neighborhoodObject.setCity(em.find(City.class, cityid));
		em.persist(neighborhoodObject);
		return neighborhoodObject;
	}

	@Override
	@Transactional
	public List<Province> getProvinces() {
		String queryString = "select distinct prov from Province as prov left join fetch prov.cities order by prov.province ASC";
		final TypedQuery<Province> query = em.createQuery(queryString, Province.class);
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<City> getCities() {
		String queryString = "select distinct c from City as c left join fetch c.neighborhoods order by c.city ASC";
		final TypedQuery<City> query = em.createQuery(queryString, City.class);
		return query.getResultList();
	}

	@Override
	public List<Neighborhood> getNeighborhoods() {
		String queryString = "select neigh from Neighborhood as neigh order by neigh.neighborhood ASC";
		final TypedQuery<Neighborhood> query = em.createQuery(queryString, Neighborhood.class);
		return query.getResultList();
	}

}
