package ar.edu.itba.paw.interfaces;

import java.util.List;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.models.UploadFile;

@Service
public interface ImageDao {
	
	public UploadFile create(byte[] data, long publicationid);
	
	public UploadFile findByIndexAndId(long id, int index);
	
	public UploadFile findByUploadId(long id);
	
	public List<UploadFile> findAllById(long id);
	
}
