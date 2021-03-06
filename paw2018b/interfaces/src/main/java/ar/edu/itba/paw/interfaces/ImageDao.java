package ar.edu.itba.paw.interfaces;

import java.util.List;

import ar.edu.itba.paw.models.UploadFile;

public interface ImageDao {

	public UploadFile create(byte[] data, long publicationid);

	public UploadFile findByIndexAndId(long id, int index);

	public UploadFile findByUploadId(long id);

	public List<UploadFile> findAllById(long id);

	public int getImagesCountByPublicationId(long publicationid);

}
