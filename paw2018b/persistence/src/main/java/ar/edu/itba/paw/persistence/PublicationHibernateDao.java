package ar.edu.itba.paw.persistence;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.interfaces.FavPublicationsDao;
import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.interfaces.UserDao;
import ar.edu.itba.paw.models.City;
import ar.edu.itba.paw.models.FilterCountQuery;
import ar.edu.itba.paw.models.Neighborhood;
import ar.edu.itba.paw.models.Province;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.User;

@Repository
public class PublicationHibernateDao implements PublicationDao{
	
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private UserDao userDaoInt;
	
	@Autowired
	private FavPublicationsDao favPublicationsDao;
	
	private static Integer MAX_RESULTS_HOME = 9;
	private static Integer MAX_RESULTS_PROFILE = 3;
	private static Integer MAX_RESULTS_LIST = 1;
	
	private static String NO_ORDER = "No order";
	private static String ASCENDANT_ORDER = "Ascending order";
	private static String DESCENDANT_ORDER = "Descending order";
	private static String OLDEST_PUBLICATION = "Oldest publications";
	private static String NEWSEST_PUBLICATION = "Newest publications";
	
	private static String SELECT_STATEMENT_SEARCH = "select distinct pub from Publication as pub "
										   + "left join fetch pub.province "
										   + "left join fetch pub.city "
										   + "left join fetch pub.neighborhood "
										   + "left join fetch pub.user "
										   + "left join fetch pub.images ";
	
	private static String SELECT_STATEMENT_COUNT = "select COUNT(pub) from Publication as pub ";
	
	private static String SELECT_STATEMENT_FILTER = "from Publication as pub ";
	
	private static String GENERIC_WHERE_STATEMENT = "where pub.operation = :operation AND pub.propertyType = :propertyType "
		   	   									  + "AND (UPPER(pub.address) LIKE UPPER(:address) OR UPPER(pub.province.province) LIKE UPPER(:address) "  
		   	   									  + "OR UPPER(pub.city.city) LIKE UPPER(:address) OR UPPER(pub.neighborhood.neighborhood) LIKE UPPER(:address)) "
		   	   									  + "AND pub.locked != true ";
	

	@Override
	@Transactional
	public Publication findById(long id) {
		String queryString = SELECT_STATEMENT_SEARCH + "where pub.publicationid = :publicationid";
		final TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		query.setParameter("publicationid", id);
		return query.getResultList().get(0);
	}

	@Override
	@Transactional
	public Publication create(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long userid) {
		final Publication pub = new Publication(title, address, operation, Integer.valueOf(price),
				   description, propertyType, Integer.valueOf(bedrooms),
				   Integer.valueOf(bathrooms), Integer.valueOf(floorSize), Integer.valueOf(parking), new Date());
		User user = userDaoInt.findById(userid);
		pub.setUser(user);
		Neighborhood n = em.find(Neighborhood.class, Long.parseLong(neighborhood));
		City c = em.find(City.class, Long.parseLong(city));
		Province p = em.find(Province.class, Long.parseLong(province));
		pub.setNeighborhood(n);
		pub.setCity(c);
		pub.setProvince(p);
		em.persist(pub);
		return pub;
	}
	
	@Override
	@Transactional
	public List<Publication> findNewest(String operation){
		String queryString = SELECT_STATEMENT_SEARCH + "where pub.operation = :operation";
		queryString = setOrder(queryString,NEWSEST_PUBLICATION);
		final TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		query.setParameter("operation", operation);
		query.setMaxResults(MAX_RESULTS_HOME);
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<Publication> findByUserId(long userid, String pagePub) {
		final String queryString = SELECT_STATEMENT_SEARCH + "where pub.user.userid = :userid";
		final TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		query.setParameter("userid", userid);
		query.setFirstResult((Integer.parseInt(pagePub) - 1) * MAX_RESULTS_PROFILE);
		query.setMaxResults(MAX_RESULTS_PROFILE);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public int getCountPublicationsOfUser(long userid) {
		final String queryString = SELECT_STATEMENT_COUNT + "where pub.user.userid = :userid";
		final TypedQuery<Long> query = em.createQuery(queryString, Long.class);
		query.setParameter("userid", userid);
		return query.getResultList().get(0).intValue();
	}

	@Override
	@Transactional
	public List<Publication> findSearchFiltering(String operation, String propertyType, String address, String minPrice, String maxPrice,
												 String minFloorSize, String maxFloorSize,
												 String bedrooms, String bathrooms, String parking, String order, String page) {
		String queryString = SELECT_STATEMENT_SEARCH + generateStringQuery(operation,propertyType, address, minPrice, maxPrice,minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		queryString = setOrder(queryString,order);
		TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		setQueryParameters(query, operation,propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		query.setFirstResult((Integer.parseInt(page) - 1) * MAX_RESULTS_LIST);
		query.setMaxResults(MAX_RESULTS_LIST);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public int getSearchFilteringCount(String operation, String propertyType, String address, String minPrice, String maxPrice,
			   String minFloorSize, String maxFloorSize,
			   String bedrooms, String bathrooms, String parking) {
		String queryString = SELECT_STATEMENT_COUNT + generateStringQuery(operation,propertyType, address, minPrice, maxPrice,minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		TypedQuery<Long> query = em.createQuery(queryString, Long.class);
		setQueryParameters(query, operation,propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		return query.getResultList().get(0).intValue();
	}
	

	@Override
	@Transactional
	public void deleteById(long publicationdid) {
		em.remove(em.find(Publication.class, publicationdid));
		favPublicationsDao.removeFavouriteByPublication(publicationdid);
	}
	
	private String setOrder(String queryString, String order) {
		if(order.equals(NO_ORDER)) 
			return queryString;
		else if(order.equals(ASCENDANT_ORDER))
			queryString += " ORDER BY pub.price ASC";
		else if(order.equals(DESCENDANT_ORDER))
			queryString += " ORDER BY pub.price DESC";
		else if(order.equals(OLDEST_PUBLICATION))
			queryString += " ORDER BY pub.publicationDate ASC";
		else
			queryString += " ORDER BY pub.publicationDate DESC";
		return queryString;
	}
	
	@Override
	@Transactional
	public boolean editData(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long publicationid) {
		final Query query =  em.createQuery("update Publication as pub set pub.title = :title, "
													 + "pub.address = :address, "
													 + "pub.operation = :operation, pub.price = :price, "
													 + "pub.description = :description, pub.propertyType = :propertyType, "
													 + "pub.bedrooms = :bedrooms, pub.bathrooms = :bathrooms, pub.floorSize = :floorSize, "
													 + "pub.parking = :parking "
													 + "where pub.publicationid = :publicationid");

		query.setParameter("title", title);
		query.setParameter("address", address);
		query.setParameter("operation", operation);
		query.setParameter("price", Integer.parseInt(price));
		query.setParameter("description", description);
		query.setParameter("propertyType", propertyType);
		query.setParameter("bedrooms", Integer.parseInt(bedrooms));
		query.setParameter("bathrooms", Integer.parseInt(bathrooms));
		query.setParameter("floorSize", Integer.parseInt(floorSize));
		query.setParameter("parking", Integer.parseInt(parking));
		query.setParameter("publicationid", publicationid);
		Publication pub = em.find(Publication.class, publicationid);
		Neighborhood n = em.find(Neighborhood.class, Long.parseLong(neighborhood));
		City c = em.find(City.class, Long.parseLong(city));
		Province p = em.find(Province.class, Long.parseLong(province));
		pub.setNeighborhood(n);
		pub.setCity(c);
		pub.setProvince(p);
		query.executeUpdate();
		return true;
		
	}
	
	@Override
	@Transactional
	public HashMap<Integer, Long> getBedroomsFilter(String operation, String propertyType, String address, String minPrice, String maxPrice, 
												   String minFloorSize, String maxFloorSize,
												   String bedrooms, String parking, String bathrooms) {
		final String queryString = generateStringQuery(operation, propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		final String countClause = "select new ar.edu.itba.paw.models.FilterCountQuery(COUNT(pub.bedrooms), pub.bedrooms) " + SELECT_STATEMENT_FILTER;
		final String groupByClause = "GROUP BY pub.bedrooms ORDER BY pub.bedrooms ASC";
		final String hqlString = countClause + queryString + groupByClause;
		final TypedQuery<FilterCountQuery> queryCount = em.createQuery(hqlString, FilterCountQuery.class);
		setQueryParameters(queryCount, operation, propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		List<FilterCountQuery> list = queryCount.getResultList();
		HashMap<Integer,Long> hash = new HashMap<Integer,Long>();
		for (FilterCountQuery row : list){
			hash.put(row.getFilter(), row.getCount());
		}
		return hash;
	}
	
	@Override
	@Transactional
	public HashMap<Integer, Long> getBathroomsFilter(String operation, String propertyType, String address, String minPrice, String maxPrice, 
												   String minFloorSize, String maxFloorSize,
												   String bedrooms, String parking, String bathrooms) {
		final String queryString = generateStringQuery(operation, propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		final String countClause = "select new ar.edu.itba.paw.models.FilterCountQuery(COUNT(pub.bathrooms), pub.bathrooms) " + SELECT_STATEMENT_FILTER;
		final String groupByClause = "GROUP BY pub.bathrooms ORDER BY pub.bathrooms ASC";
		final String hqlString = countClause + queryString + groupByClause;
		final TypedQuery<FilterCountQuery> queryCount = em.createQuery(hqlString, FilterCountQuery.class);
		setQueryParameters(queryCount, operation, propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		List<FilterCountQuery> list = queryCount.getResultList();
		HashMap<Integer,Long> hash = new HashMap<Integer,Long>();
		for (FilterCountQuery row : list){
			hash.put(row.getFilter(), row.getCount());
		}
		return hash;
	}
	
	@Override
	@Transactional
	public HashMap<Integer, Long> getParkingFilter(String operation, String propertyType, String address, String minPrice, String maxPrice, 
												   String minFloorSize, String maxFloorSize,
												   String bedrooms, String parking, String bathrooms) {
		final String queryString = generateStringQuery(operation, propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		final String countClause = "select new ar.edu.itba.paw.models.FilterCountQuery(COUNT(pub.parking), pub.parking) " + SELECT_STATEMENT_FILTER;
		final String groupByClause = "GROUP BY pub.parking ORDER BY pub.parking ASC";
		final String hqlString = countClause + queryString + groupByClause;
		final TypedQuery<FilterCountQuery> queryCount = em.createQuery(hqlString, FilterCountQuery.class);
		setQueryParameters(queryCount, operation, propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		List<FilterCountQuery> list = queryCount.getResultList();
		HashMap<Integer,Long> hash = new HashMap<Integer,Long>();
		for (FilterCountQuery row : list){
			hash.put(row.getFilter(), row.getCount());
		}
		return hash;
	}
	
	@Override
	public HashMap<String, Long> getLocationFilter(String operation, String propertyType, String address,
			String minPrice, String maxPrice, String minFloorSize, String maxFloorSize, String bedrooms, String parking,
			String bathrooms) {
		HashMap<String, Long> hash = new HashMap<String, Long>();
		addLocationFilter(operation,propertyType,address,minPrice,maxPrice,minFloorSize,maxFloorSize,bedrooms,parking,bathrooms,hash,"province");
		addLocationFilter(operation,propertyType,address,minPrice,maxPrice,minFloorSize,maxFloorSize,bedrooms,parking,bathrooms,hash,"city");
		addLocationFilter(operation,propertyType,address,minPrice,maxPrice,minFloorSize,maxFloorSize,bedrooms,parking,bathrooms,hash,"neighborhood");
		return hash;
	}
	
	@Override
	public void addLocationFilter(String operation, String propertyType, String address,
			String minPrice, String maxPrice, String minFloorSize, String maxFloorSize, String bedrooms, String parking,
			String bathrooms, HashMap<String, Long> locationMap, String location) {
		final String queryString = generateStringQuery(operation, propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		final String countClause = "select new ar.edu.itba.paw.models.FilterCountQuery(COUNT(pub." + location + "), pub."+ location + "." + location + ") " + SELECT_STATEMENT_FILTER;
		final String groupByClause = "GROUP BY pub." + location + ",pub."+ location + "." + location + " ORDER BY pub." + location + " ASC";
		final String hqlString = countClause + queryString + groupByClause;
		final TypedQuery<FilterCountQuery> queryCount = em.createQuery(hqlString, FilterCountQuery.class);
		setQueryParameters(queryCount, operation, propertyType, address, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking);
		List<FilterCountQuery> list = queryCount.getResultList();
		for (FilterCountQuery row : list){
			locationMap.put(row.getFilterString(), row.getCount());
		}
		
	}


	@Override
	public String generateStringQuery(String operation, String propertyType, String address, String minPrice, String maxPrice, 
									   String minFloorSize, String maxFloorSize,
									   String bedrooms, String bathrooms, String parking) {
		
		String queryString = GENERIC_WHERE_STATEMENT;
		
		if(! minPrice.equals("")) {
			queryString += " AND price >= :minPrice ";
		}
		
		if(! maxPrice.equals("")) {
			queryString += " AND price <= :maxPrice ";
		}
		
		if(! minFloorSize.equals("")) {
			queryString += " AND floorSize >= :minFloorSize ";
		}
		
		if(! maxFloorSize.equals("")) {
			queryString += " AND floorSize <= :maxFloorSize ";
		}
		
		if(! bedrooms.equals("")) {
			queryString += " AND bedrooms = :bedrooms ";
		}
		
		if(! bathrooms.equals("")){
			queryString += " AND bathrooms = :bathrooms ";
		}
		
		if(! parking.equals("")){
			queryString += " AND parking = :parking ";
		}
		
		return queryString;
	}
	
	@Override
	public void setQueryParameters(TypedQuery<?> query, String operation, String propertyType, String address, String minPrice, String maxPrice, 
								   String minFloorSize, String maxFloorSize,
								   String bedrooms, String bathrooms, String parking) {
		String queryAddress =  "%" + address + "%";
	
		if(! minPrice.equals("")) 
			query.setParameter("minPrice", Integer.valueOf(minPrice));	
			
		if(! maxPrice.equals("")) 
			query.setParameter("maxPrice", Integer.valueOf(maxPrice)); 

		if(! minFloorSize.equals("")) 
			query.setParameter("minFloorSize", Integer.valueOf(minFloorSize));	
			
		if(! maxFloorSize.equals("")) 
			query.setParameter("maxFloorSize", Integer.valueOf(maxFloorSize)); 
		
		if(! bedrooms.equals("")) 
			query.setParameter("bedrooms", Integer.valueOf(bedrooms));
		
		if(! bathrooms.equals("")) {
			query.setParameter("bathrooms", Integer.valueOf(bathrooms));
		}
		
		if(! parking.equals("")) {
			query.setParameter("parking", Integer.valueOf(parking));
		}
		
		query.setParameter("operation", operation);
		query.setParameter("propertyType", propertyType);
		query.setParameter("address", queryAddress);
	
	}
	
	@Override
	@Transactional
	public List<Publication> findAllPublications(String pagePub) {
		final TypedQuery<Publication> query = em.createQuery(SELECT_STATEMENT_SEARCH + "Order by pub.locked DESC", Publication.class);
		query.setFirstResult((Integer.parseInt(pagePub) - 1) * MAX_RESULTS_PROFILE);
		query.setMaxResults(MAX_RESULTS_PROFILE);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public int getCountAllPublications() {
		final TypedQuery<Long> query = em.createQuery(SELECT_STATEMENT_COUNT, Long.class);
		return query.getResultList().get(0).intValue();
	}
	
	@Override
	@Transactional
	public void lockUnlockPublication(boolean status, long publicationid) {
		final Query query =  em.createQuery("update Publication as pub set pub.locked = :locked where pub.publicationid = :publicationid");
		if(status == true)
			query.setParameter("locked", false);
		else
			query.setParameter("locked", true);
		query.setParameter("publicationid", publicationid);
		query.executeUpdate();
		
	}

}
