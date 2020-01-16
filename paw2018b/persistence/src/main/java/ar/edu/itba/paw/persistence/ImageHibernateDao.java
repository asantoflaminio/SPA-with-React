package ar.edu.itba.paw.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.interfaces.ImageDao;
import ar.edu.itba.paw.interfaces.PublicationDao;
import ar.edu.itba.paw.models.Publication;
import ar.edu.itba.paw.models.UploadFile;

@Repository
public class ImageHibernateDao implements ImageDao{
	
	@PersistenceContext
	private EntityManager em;
	
	@Autowired 
	private PublicationDao publicationDao;
	
	@Override
	@Transactional
	public UploadFile create(byte[] data, long publicationdid) {
		UploadFile uploadFile = new UploadFile(data);
		Publication pub = publicationDao.findById(publicationdid);
		uploadFile.setPublication(pub);
		em.persist(uploadFile);

		return uploadFile;
	}

	@Override
	@Transactional
	public UploadFile findByIndexAndId(long publicationid, int index) {
		String queryString = "from Publication as pub left join fetch pub.images where pub.publicationid = :publicationid";
		final TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		query.setParameter("publicationid", publicationid);
		final List<UploadFile> images = query.getResultList().get(0).getImages();
		if(images.size() != 0 && index < images.size())
			return images.get(index);
		else
			return null;
	}
	
	@Override
	@Transactional
	public int getImagesCountByPublicationId(long publicationid) {
		String queryString = "select COUNT(image) from UploadFile as image where image.publication.publicationid = :publicationid";
		final TypedQuery<Long> query = em.createQuery(queryString, Long.class);
		query.setParameter("publicationid", publicationid);
		return query.getResultList().get(0).intValue();
	}

	@Override
	@Transactional
	public UploadFile findByUploadId(long imageid) {
		String queryString = "from UploadFile as uf left join fetch uf.publication where uf.imageid = :imageid";
		final TypedQuery<UploadFile> query = em.createQuery(queryString, UploadFile.class);
		query.setParameter("imageid", imageid);
		return query.getResultList().get(0);
	}

	@Override
	@Transactional
	public List<UploadFile> findAllById(long publicationid) {
		String queryString = "from Publication as pub left join fetch pub.images where pub.publicationid = :publicationid";
		final TypedQuery<Publication> query = em.createQuery(queryString, Publication.class);
		query.setParameter("publicationid", publicationid);
		return query.getResultList().get(0).getImages();
	}



}
