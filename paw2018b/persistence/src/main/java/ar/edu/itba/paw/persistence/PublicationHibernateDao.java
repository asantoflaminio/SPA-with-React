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
import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.models.Filter;
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
	private UserDao userDao;
	
	@Autowired
	private FavPublicationsDao favPublicationsDao;
	
	private static Integer MAX_RESULTS_PROFILE = 3;
	private static Integer MAX_RESULTS_LIST = 3;
	
	
	private static String SELECT_STATEMENT_SEARCH = "select distinct pub from Publication as pub "
										   + "left join fetch pub.province "
										   + "left join fetch pub.city "
										   + "left join fetch pub.neighborhood ";
	
	private static String SELECT_STATEMENT_COUNT = "select COUNT(pub) from Publication as pub ";
	
	private static String SELECT_STATEMENT_FILTER = "from Publication as pub ";
	
	private static String SEARCH_STATEMENT = " (UPPER(pub.address) LIKE UPPER(:address) OR UPPER(pub.province.province) LIKE UPPER(:address) "
				  									+ "OR UPPER(pub.city.city) LIKE UPPER(:address) OR UPPER(pub.neighborhood.neighborhood) LIKE UPPER(:address)) ";
	
	@Override
	@Transactional
	public Publication create(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, 
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses, long userid) {
		final Publication pub = new Publication(title, address, operation, Integer.valueOf(price),
				   description, propertyType, Integer.valueOf(bedrooms),
				   Integer.valueOf(bathrooms), Integer.valueOf(floorSize), Integer.valueOf(parking), new Date(),
				   Integer.valueOf(coveredFloorSize), Integer.valueOf(balconies), amenities, storage, Integer.valueOf(expenses));

		User user = userDao.findById(userid);
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
	public Publication findById(long id) {
		String queryString = SELECT_STATEMENT_SEARCH + "where pub.publicationid = :publicationid";
		final TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		query.setParameter("publicationid", id);
		return query.getResultList().get(0);
	}

	@Override
	@Transactional
	public List<Publication> findByUserId(long userid, Integer page, Integer limit) {
		final String queryString = SELECT_STATEMENT_SEARCH + "where pub.user.userid = :userid";
		final TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		query.setParameter("userid", userid);
		query.setFirstResult(page * limit);
		query.setMaxResults(limit);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public List<Publication> getPublications(String address, List<Filter> filters, Integer page, Integer limit, String order) {
		String queryString = SELECT_STATEMENT_SEARCH;
		queryString = addFiltersStatement(queryString,filters,address);
		queryString = setOrderFilter(queryString,order);
		TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		addFiltersValues(query,filters,address);
		System.out.println(queryString);
		//System.out.println(page+ " " + limit);
		setPagination(query,page,limit);
		//System.out.println(query.getResultList().size());
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
	public int getCountPublications(String address, List<Filter> filters) {
		String queryString = SELECT_STATEMENT_COUNT;
		queryString = addFiltersStatement(queryString,filters,address);
		TypedQuery<Long> query = em.createQuery(queryString, Long.class);
		addFiltersValues(query,filters,address);
		return query.getResultList().get(0).intValue();
	}
	
	@Override
	@Transactional
	public boolean editData(String title, String address,String neighborhood, String city, String province, String operation, String price,
			   String description, String propertyType, String bedrooms,
			   String bathrooms, String floorSize, String parking, long publicationid,
			   String coveredFloorSize, String balconies, String amenities, String storage, String expenses) {
		final Query query =  em.createQuery("update Publication as pub set pub.title = :title, "
													 + "pub.address = :address, "
													 + "pub.operation = :operation, pub.price = :price, "
													 + "pub.description = :description, pub.propertyType = :propertyType, "
													 + "pub.bedrooms = :bedrooms, pub.bathrooms = :bathrooms, pub.floorSize = :floorSize, "
													 + "pub.parking = :parking "
													 + "pub.coveredfloorsize = :coveredFloorSize "
													 + "pub.balconies = :balconies "
													 + "pub.amenities = :amenities "
													 + "pub.storage = :storage "
													 + "pub.expenses = :expenses "
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
		query.setParameter("coveredFloorSize", Integer.parseInt(coveredFloorSize));
		query.setParameter("balconies", Integer.parseInt(balconies));
		query.setParameter("amenities", amenities);
		query.setParameter("storage", storage);
		query.setParameter("expenses", Integer.parseInt(expenses));
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
	public boolean deletePublication(long publicationid) {
		Publication publication = em.find(Publication.class, publicationid);
		if(publication == null)
			return false;
		em.remove(publication);
		favPublicationsDao.removeFavouriteByPublication(publicationid); //ver q onda esto en deploy
		return true;
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
	
	public Integer getMaxResultProfile() {
		return MAX_RESULTS_PROFILE;
	}
	
	public Integer getMaxResultList() {
		return MAX_RESULTS_LIST;
	}
	
	@Override
	@Transactional
	public HashMap<Integer, Long> getSimpleFilter(List<Filter> filters, String address, String filterName){
		String whereStatement = "";
		final String countClause;
		final String groupByClause;
		final String hqlString;
		final TypedQuery<FilterCountQuery> queryCount;
		countClause = "select new ar.edu.itba.paw.models.FilterCountQuery(COUNT(pub." + filterName + "), pub." + filterName + ") " + SELECT_STATEMENT_FILTER;
		whereStatement = addFiltersStatement(whereStatement,filters,address);
		groupByClause = "GROUP BY pub."+ filterName + " ORDER BY pub." + filterName + " ASC";
		hqlString = countClause + whereStatement + groupByClause;
		queryCount = em.createQuery(hqlString, FilterCountQuery.class);
		System.out.println(hqlString);
		addFiltersValues(queryCount,filters,address);
		List<FilterCountQuery> list = queryCount.getResultList();
		HashMap<Integer,Long> hash = new HashMap<Integer,Long>();
		for (FilterCountQuery row : list){
			hash.put(row.getFilter(), row.getCount());
		}
		return hash;
	}
	
	@Override
	public HashMap<String, Long> getLocationFilter(List<Filter> filters, String address) {
		HashMap<String, Long> hashMap = new HashMap<String, Long>();
		addLocationFilter(filters,address,hashMap,"province");
		addLocationFilter(filters,address,hashMap,"city");
		addLocationFilter(filters,address,hashMap,"neighborhood");
		return hashMap;
	}
	
	@Override
	public void addLocationFilter(List<Filter> filters, String address, HashMap<String,Long> locationMap, String location) {
		String whereStatement = "";
		final String countClause;
		final String groupByClause;
		final String hqlString;
		final TypedQuery<FilterCountQuery> queryCount;
		countClause = "select new ar.edu.itba.paw.models.FilterCountQuery(COUNT(pub." + location + "), pub."+ location + "." + location + ") " + SELECT_STATEMENT_FILTER;
		whereStatement = addFiltersStatement(whereStatement,filters,address);
		groupByClause = "GROUP BY pub." + location + ",pub."+ location + "." + location + " ORDER BY pub." + location + " ASC";
		hqlString = countClause + whereStatement + groupByClause;
		queryCount = em.createQuery(hqlString, FilterCountQuery.class);
		addFiltersValues(queryCount,filters,address);
		List<FilterCountQuery> list = queryCount.getResultList();
		for (FilterCountQuery row : list){
			locationMap.put(row.getFilterString(), row.getCount());
		}
		
	}
	
	@Override
	public String addFiltersStatement(String query, List<Filter> filters, String address) {
		Filter current;

		if(address != null || filters.size() != 0)
			query += "where";
		
		if(address != null) {
			query += SEARCH_STATEMENT;
			if(filters.size() != 0)
				query += " AND ";
		}
			
		
		for(int i = 0; i < filters.size(); i++) {
			current = filters.get(i);
			if(i == 0)
				query += " pub." + current.getDataBaseNameValue().getDataBaseFilterName() + " " +  current.getOperator().getQueryOperator() + " :" + current.getNameValue().getQueryFilterName() + " ";
			else
				query += " AND pub." + current.getDataBaseNameValue().getDataBaseFilterName() + " " +  current.getOperator().getQueryOperator()  + " :" + current.getNameValue().getQueryFilterName() + " ";
		}
		
		return query;
	}
	
	@Override
	public String setOrderFilter(String query, String order) {
		if(order.equals(Constants.QueryOrder.NO_ORDER.getQueryOrder()))
			return query;
		if(order.equals(Constants.QueryOrder.ASCENDANT_ORDER.getQueryOrder()))
			query += " ORDER BY pub.price ASC";
		else if(order.equals(Constants.QueryOrder.DESCENDANT_ORDER.getQueryOrder()))
			query += " ORDER BY pub.price DESC";
		else if(order.equals(Constants.QueryOrder.OLDEST_PUBLICATION.getQueryOrder()))
			query += " ORDER BY pub.publicationDate ASC";
		else if(order.equals(Constants.QueryOrder.NEWEST_PUBLICATION.getQueryOrder()))
			query += " ORDER BY pub.publicationDate DESC";
		return query;
	}
	
	@Override
	public void addFiltersValues(TypedQuery<?> query, List<Filter> filters, String address) {
		if(address != null) {
			String queryAddress =  "%" + address + "%";
			query.setParameter("address", queryAddress);
		}
		
		for(Filter filter: filters) {
			if(filter.getIntValue() != null)
				query.setParameter(filter.getNameValue().getQueryFilterName(), filter.getIntValue());
			else if(filter.getStringValue() != null)
				query.setParameter(filter.getNameValue().getQueryFilterName(), filter.getStringValue());
			else
				query.setParameter(filter.getNameValue().getQueryFilterName(), filter.getBooleanValue());
		}
		
	}
	

	
	@Override
	public void setPagination(TypedQuery<?> query, Integer page, Integer limit) {
		if(page != null && limit != null) {
			query.setFirstResult(page * limit);
			query.setMaxResults(limit);
		}

	}
}
