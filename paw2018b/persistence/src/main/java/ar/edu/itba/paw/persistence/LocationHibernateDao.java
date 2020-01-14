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
	public List<City> getCities(long provinceid) {
		String queryString = "select distinct c from City as c left join fetch c.neighborhoods where c.province.provinceid = :provinceid order by c.city ASC";
		final TypedQuery<City> query = em.createQuery(queryString, City.class);
		query.setParameter("provinceid", provinceid);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public List<Neighborhood> getNeighborhoods(long provinceid, long cityid) {
		String queryString = "select neigh from Neighborhood as neigh where neigh.city.province.provinceid = :provinceid AND neigh.city.cityid = :cityid order by neigh.neighborhood ASC";
		final TypedQuery<Neighborhood> query = em.createQuery(queryString, Neighborhood.class);
		query.setParameter("provinceid", provinceid);
		query.setParameter("cityid", cityid);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public Province findByProvinceName(String province) {
		String queryString = "select distinct prov from Province as prov where upper(prov.province) = upper(:province)";
		final TypedQuery<Province> query = em.createQuery(queryString, Province.class);
		query.setParameter("province", province);
		final List<Province> list = query.getResultList();
		return list.isEmpty() ? null : list.get(0);
	}
	
	@Override
	@Transactional
	public City findByCityName(long provinceid, String city) {
		String queryString = "select distinct c from City as c where c.province.provinceid = :provinceid AND upper(c.city) = upper(:city)";
		final TypedQuery<City> query = em.createQuery(queryString, City.class);
		query.setParameter("provinceid", provinceid);
		query.setParameter("city", city);
		final List<City> list = query.getResultList();
		return list.isEmpty() ? null : list.get(0);
	}
	
	@Override
	@Transactional
	public Neighborhood findByNeighborhoodName(long provinceid, long cityid, String neighborhood) {
		String queryString = "select distinct neigh from Neighborhood as neigh where neigh.city.province.provinceid = :provinceid "
							+ "AND neigh.city.cityid = :cityid AND upper(neigh.neighborhood) = upper(:neighborhood)";
		final TypedQuery<Neighborhood> query = em.createQuery(queryString, Neighborhood.class);
		query.setParameter("provinceid", provinceid);
		query.setParameter("cityid", cityid);
		query.setParameter("neighborhood", neighborhood);
		final List<Neighborhood> list = query.getResultList();
		return list.isEmpty() ? null : list.get(0);
	}
	


}
